import { describe, it, expect } from 'vitest';
import { trails } from '@/data/trails';

describe('trails data', () => {
  it('every trail has required fields', () => {
    for (const trail of trails) {
      expect(trail.id).toBeTruthy();
      expect(trail.name).toBeTruthy();
      expect(trail.region).toBeTruthy();
      expect(trail.distanceKm).toBeGreaterThan(0);
      expect(trail.elevationGainM).toBeGreaterThan(0);
      expect(trail.elevationProfile.length).toBeGreaterThan(1);
      expect(typeof trail.dogFriendly).toBe('boolean');
      expect(['Low', 'Moderate', 'High']).toContain(trail.crowdLevel);
      expect(['Low', 'Moderate', 'High']).toContain(trail.bugsLevel);
      expect(['Permit Required', 'No Permit', 'WA Discover Pass', 'Northwest Forest Pass']).toContain(trail.permitType);
    }
  });

  it('trail IDs are unique', () => {
    const ids = trails.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('filter: Under 15km', () => {
  const filtered = trails.filter((t) => t.distanceKm < 15);

  it('returns only trails shorter than 15 km', () => {
    for (const trail of filtered) {
      expect(trail.distanceKm).toBeLessThan(15);
    }
  });

  it('excludes trails 15 km or longer', () => {
    const excluded = trails.filter((t) => t.distanceKm >= 15);
    for (const trail of excluded) {
      expect(filtered).not.toContain(trail);
    }
  });
});

describe('filter: No Permit', () => {
  const filtered = trails.filter((t) => t.permitType === 'No Permit');

  it('returns only no-permit trails', () => {
    for (const trail of filtered) {
      expect(trail.permitType).toBe('No Permit');
    }
  });
});

describe('filter: Low Elevation', () => {
  const filtered = trails.filter((t) => t.elevationGainM < 700);

  it('returns only trails with elevation gain under 700 m', () => {
    for (const trail of filtered) {
      expect(trail.elevationGainM).toBeLessThan(700);
    }
  });
});

describe('filter: Dog Friendly', () => {
  const filtered = trails.filter((t) => t.dogFriendly);

  it('returns only dog-friendly trails', () => {
    for (const trail of filtered) {
      expect(trail.dogFriendly).toBe(true);
    }
  });

  it('at least one trail is dog-friendly', () => {
    expect(filtered.length).toBeGreaterThan(0);
  });
});

describe('filter: Less Crowded', () => {
  const filtered = trails.filter((t) => t.crowdLevel === 'Low');

  it('returns only low-crowd trails', () => {
    for (const trail of filtered) {
      expect(trail.crowdLevel).toBe('Low');
    }
  });

  it('at least one trail has low crowds', () => {
    expect(filtered.length).toBeGreaterThan(0);
  });
});

describe('search filter', () => {
  it('matches by trail name (case-insensitive)', () => {
    const query = 'joffre';
    const filtered = trails.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.region.toLowerCase().includes(query)
    );
    expect(filtered.some((t) => t.id === 'joffre-lakes')).toBe(true);
  });

  it('matches by region', () => {
    const query = 'garibaldi';
    const filtered = trails.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.region.toLowerCase().includes(query)
    );
    expect(filtered.length).toBeGreaterThan(1);
  });

  it('returns empty for no match', () => {
    const query = 'zzznomatch';
    const filtered = trails.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.region.toLowerCase().includes(query)
    );
    expect(filtered).toHaveLength(0);
  });
});
