import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight, Dog, Users,
  Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning,
  Wind, Thermometer,
} from 'lucide-react';
import type { Trail } from '@/data/trails';
import { permits } from '@/data/permits';
import { fetchTrailWeather, type LiveWeather } from '@/services/weather';

const WEATHER_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning,
};

const ElevationProfile = ({ data, gradientId }: { data: number[]; gradientId: string }) => {
  if (data.length <= 1) return null;
  const max = Math.max(...data);
  const width = 200;
  const height = 36;
  const padding = 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (val / max) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-9" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

interface TrailCardProps {
  trail: Trail;
  index: number;
  highlighted?: boolean;
}

const permitAccent: Record<string, string> = {
  'Permit Required':      'bg-trail-permit',
  'No Permit':            'bg-trail-no-permit',
  'WA Discover Pass':     'bg-trail-wa-pass',
  'Northwest Forest Pass':'bg-trail-wa-pass',
};

const permitBadge: Record<string, string> = {
  'Permit Required':      'bg-trail-permit/10 text-trail-permit border-trail-permit/25',
  'No Permit':            'bg-trail-no-permit/10 text-trail-no-permit border-trail-no-permit/25',
  'WA Discover Pass':     'bg-trail-wa-pass/10 text-trail-wa-pass border-trail-wa-pass/25',
  'Northwest Forest Pass':'bg-trail-wa-pass/10 text-trail-wa-pass border-trail-wa-pass/25',
};

const crowdColor: Record<string, string> = {
  Low:      'text-status-open',
  Moderate: 'text-status-soon',
  High:     'text-primary',
};

const getPermitAvailability = (trail: Trail): { dot: string; label: string } => {
  if (trail.permitType === 'No Permit') {
    return { dot: 'bg-status-open', label: 'No permit needed' };
  }
  if (trail.permitType === 'WA Discover Pass' || trail.permitType === 'Northwest Forest Pass') {
    return { dot: 'bg-trail-wa-pass', label: 'Pass required' };
  }
  const relevant = permits.filter((p) => p.jurisdiction === trail.jurisdiction);
  if (relevant.some((p) => p.status === 'open')) return { dot: 'bg-status-open', label: 'Permit: open' };
  if (relevant.some((p) => p.status === 'soon')) return { dot: 'bg-status-soon', label: 'Permit: opening soon' };
  return { dot: 'bg-status-closed', label: 'Permit: closed' };
};

// Inline weather strip shown on each card
const WeatherStrip = ({ weather, loading }: { weather: LiveWeather | null; loading: boolean }) => {
  if (loading) {
    return (
      <div className="flex items-center gap-2 py-2 px-3 rounded-md bg-muted/40 mb-3 animate-pulse">
        <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        <div className="h-2.5 w-20 rounded bg-muted-foreground/20" />
        <div className="ml-auto h-2.5 w-12 rounded bg-muted-foreground/20" />
      </div>
    );
  }
  if (!weather) return null;

  const IconComp = WEATHER_ICONS[weather.icon] ?? CloudSun;

  return (
    <div
      className="flex items-center gap-2 py-2 px-3 rounded-md bg-muted/40 mb-3 text-[11px] font-mono"
      onClick={(e) => e.stopPropagation()}
      title="Live weather conditions"
    >
      <IconComp className="h-3.5 w-3.5 text-primary flex-shrink-0" />
      <span className="text-foreground">{weather.description}</span>
      <span className="ml-auto flex items-center gap-2 text-muted-foreground">
        <span className="flex items-center gap-0.5">
          <Thermometer className="h-3 w-3" />
          {weather.tempC}°C
        </span>
        <span className="flex items-center gap-0.5">
          <Wind className="h-3 w-3" />
          {weather.windKph} km/h
        </span>
      </span>
    </div>
  );
};

const TrailCard = ({ trail, index, highlighted }: TrailCardProps) => {
  const navigate = useNavigate();
  const availability = getPermitAvailability(trail);
  const [weather, setWeather] = useState<LiveWeather | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // Stagger fetches slightly so we don't hammer the API all at once
    const delay = index * 80;
    const timer = setTimeout(async () => {
      try {
        const data = await fetchTrailWeather(trail.lat, trail.lng);
        if (!cancelled) setWeather(data);
      } catch {
        // silently fail — strip is hidden if no data
      } finally {
        if (!cancelled) setWeatherLoading(false);
      }
    }, delay);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [trail.lat, trail.lng, index]);

  return (
    <div
      id={`trail-${trail.id}`}
      onClick={() => navigate(`/trail/${trail.id}`)}
      className={`animate-fade-in bg-card border rounded-lg overflow-hidden hover-lift cursor-pointer group transition-all ${
        highlighted
          ? 'border-primary ring-2 ring-primary/30'
          : 'border-border'
      }`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Permit accent bar */}
      <div className={`h-[3px] w-full ${permitAccent[trail.permitType]}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-[1.05rem] leading-snug text-foreground">
            {trail.name}
          </h3>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
        </div>
        <p className="text-[11px] text-muted-foreground font-mono mb-4">
          {trail.region} · {trail.jurisdiction}
        </p>

        {/* Key stats */}
        <div className="flex items-center gap-3 mb-4 font-mono">
          <div className="text-sm">
            <span className="text-foreground font-medium">{trail.distanceKm}</span>
            <span className="text-muted-foreground text-xs"> km</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="text-sm">
            <span className="text-foreground font-medium">{trail.elevationGainM}</span>
            <span className="text-muted-foreground text-xs"> m↑</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <span className="text-muted-foreground text-xs">{trail.driveTime}</span>
        </div>

        {/* Elevation profile */}
        <div className="mb-4 -mx-1">
          <ElevationProfile data={trail.elevationProfile} gradientId={`elev-grad-${trail.id}`} />
        </div>

        {/* Live weather strip */}
        <WeatherStrip weather={weather} loading={weatherLoading} />

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2">
          {/* Permit badge + status dot */}
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full flex-shrink-0 ${availability.dot}`}
              title={availability.label}
            />
            <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${permitBadge[trail.permitType]}`}>
              {trail.permitType}
            </span>
          </div>

          {/* Quick tags */}
          <div className="flex items-center gap-2">
            {trail.dogFriendly && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-status-open">
                <Dog className="h-3 w-3" />
                Dogs OK
              </span>
            )}
            <span className={`flex items-center gap-1 text-[10px] font-mono ${crowdColor[trail.crowdLevel]}`}>
              <Users className="h-3 w-3" />
              {trail.crowdLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailCard;
