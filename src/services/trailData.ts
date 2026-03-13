/**
 * Live trail data from multiple free APIs:
 *  - Overpass (OpenStreetMap) — unlimited, global
 *  - Hiking Project (REI/onX) — free tier, US/Canada
 *  - TrailAPI — free tier (limited), US/Canada
 *
 * API keys for Hiking Project and TrailAPI are read from env vars:
 *   VITE_HIKING_PROJECT_KEY
 *   VITE_TRAIL_API_KEY
 */

import type { Trail } from '@/data/trails';

// ─── Overpass / OpenStreetMap ──────────────────────────────────────────────

export interface OsmTrailData {
  source: 'osm';
  name?: string;
  lengthKm?: number;
  surface?: string;
  access?: string;
  operator?: string;
  network?: string;
  tags: Record<string, string>;
}

/**
 * Query Overpass for a hiking route or way near the given coordinates.
 * Returns the best-matching result or null if nothing found.
 */
export async function fetchOsmTrailData(trail: Trail): Promise<OsmTrailData | null> {
  // Search for hiking routes and paths within 8km of the trailhead
  const query = `
[out:json][timeout:15];
(
  relation["route"~"hiking|foot"]["name"](around:8000,${trail.lat},${trail.lng});
  way["highway"~"path|track|footway"]["name"](around:3000,${trail.lat},${trail.lng});
);
out body;`;

  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });
    if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
    const data = await res.json();

    const elements: Array<{ type: string; tags?: Record<string, string>; members?: unknown[] }> =
      data.elements ?? [];

    if (elements.length === 0) return null;

    // Prefer route relations over plain ways, and pick the closest match by name
    const trailNameLower = trail.name.toLowerCase();
    const scored = elements.map((el) => {
      const tags = el.tags ?? {};
      const osmName = (tags.name ?? '').toLowerCase();
      // Simple similarity: count matching words
      const trailWords = trailNameLower.split(/\s+/);
      const matchScore = trailWords.filter((w) => osmName.includes(w)).length;
      const typeBonus = el.type === 'relation' ? 1 : 0;
      return { el, tags, score: matchScore + typeBonus };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];
    if (best.score === 0) return null; // No useful match

    const tags = best.tags;

    // Estimate length from distance tag or way geometry (rough)
    let lengthKm: number | undefined;
    if (tags.distance) {
      const raw = parseFloat(tags.distance);
      if (!isNaN(raw)) lengthKm = raw < 50 ? raw : raw / 1000; // handle metres vs km
    }

    return {
      source: 'osm',
      name: tags.name,
      lengthKm,
      surface: tags.surface ?? tags.tracktype,
      access: tags.access ?? tags['access:foot'],
      operator: tags.operator,
      network: tags.network,
      tags,
    };
  } catch {
    return null;
  }
}

// ─── Hiking Project (REI / onX) ────────────────────────────────────────────

export interface HikingProjectTrail {
  source: 'hiking-project';
  id: number;
  name: string;
  type: string;
  summary: string;
  difficulty: string;
  stars: number;
  starVotes: number;
  location: string;
  url: string;
  imgSqSmall: string;
  length: number;       // miles
  ascent: number;       // feet
  descent: number;      // feet
  high: number;         // feet
  low: number;          // feet
  conditionStatus: string;
  conditionDetails: string;
  conditionDate: string;
}

/**
 * Fetch nearby trails from Hiking Project API.
 * Requires VITE_HIKING_PROJECT_KEY env var.
 * API docs: https://www.hikingproject.com/data
 */
export async function fetchHikingProjectTrails(trail: Trail): Promise<HikingProjectTrail | null> {
  const key = import.meta.env.VITE_HIKING_PROJECT_KEY as string | undefined;
  if (!key) return null;

  const params = new URLSearchParams({
    lat: trail.lat.toString(),
    lon: trail.lng.toString(),
    maxDistance: '10',   // miles
    maxResults: '5',
    key,
  });

  try {
    const res = await fetch(`https://www.hikingproject.com/data/get-trails?${params}`);
    if (!res.ok) throw new Error(`Hiking Project HTTP ${res.status}`);
    const data = await res.json();

    const trails: HikingProjectTrail[] = data.trails ?? [];
    if (trails.length === 0) return null;

    // Pick the closest match by name
    const trailNameLower = trail.name.toLowerCase();
    const match = trails.find((t) =>
      t.name.toLowerCase().includes(trailNameLower.split(' ')[0])
    ) ?? trails[0];

    return { ...match, source: 'hiking-project' };
  } catch {
    return null;
  }
}

// ─── TrailAPI ───────────────────────────────────────────────────────────────

export interface TrailApiResult {
  source: 'trail-api';
  name: string;
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  difficulty: string;
  length: number;
  description: string;
  directions: string;
  activities: Array<{ activity_type_name: string; description: string }>;
}

/**
 * Fetch trails from TrailAPI.
 * Requires VITE_TRAIL_API_KEY env var.
 * API docs: https://www.trailapi.com
 */
export async function fetchTrailApiData(trail: Trail): Promise<TrailApiResult | null> {
  const key = import.meta.env.VITE_TRAIL_API_KEY as string | undefined;
  if (!key) return null;

  const params = new URLSearchParams({
    lat: trail.lat.toString(),
    lng: trail.lng.toString(),
    radius: '15',
    key,
  });

  try {
    const res = await fetch(`https://trailapi.com/api/trails?${params}`);
    if (!res.ok) throw new Error(`TrailAPI HTTP ${res.status}`);
    const data = await res.json();

    const results: TrailApiResult[] = Array.isArray(data) ? data : (data.data ?? []);
    if (results.length === 0) return null;

    const trailNameLower = trail.name.toLowerCase();
    const match = results.find((t) =>
      t.name?.toLowerCase().includes(trailNameLower.split(' ')[0])
    ) ?? results[0];

    return { ...match, source: 'trail-api' };
  } catch {
    return null;
  }
}

// ─── Combined live trail data ───────────────────────────────────────────────

export interface LiveTrailData {
  osm: OsmTrailData | null;
  hikingProject: HikingProjectTrail | null;
  trailApi: TrailApiResult | null;
  fetchedAt: Date;
}

/**
 * Fetch live trail data from all available sources in parallel.
 * OSM is always attempted; Hiking Project and TrailAPI require env var keys.
 */
export async function fetchAllLiveTrailData(trail: Trail): Promise<LiveTrailData> {
  const [osm, hikingProject, trailApi] = await Promise.all([
    fetchOsmTrailData(trail),
    fetchHikingProjectTrails(trail),
    fetchTrailApiData(trail),
  ]);

  return { osm, hikingProject, trailApi, fetchedAt: new Date() };
}
