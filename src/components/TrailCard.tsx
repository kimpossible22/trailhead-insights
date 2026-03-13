import { Link } from 'react-router-dom';
import { ChevronRight, Dog, Users } from 'lucide-react';
import type { Trail } from '@/data/trails';

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
}

// Top accent bar colour per permit type
const permitAccent: Record<string, string> = {
  'Permit Required':     'bg-trail-permit',
  'No Permit':           'bg-trail-no-permit',
  'WA Discover Pass':    'bg-trail-wa-pass',
  'Northwest Forest Pass':'bg-trail-wa-pass',
};

// Small badge styles
const permitBadge: Record<string, string> = {
  'Permit Required':     'bg-trail-permit/10 text-trail-permit border-trail-permit/25',
  'No Permit':           'bg-trail-no-permit/10 text-trail-no-permit border-trail-no-permit/25',
  'WA Discover Pass':    'bg-trail-wa-pass/10 text-trail-wa-pass border-trail-wa-pass/25',
  'Northwest Forest Pass':'bg-trail-wa-pass/10 text-trail-wa-pass border-trail-wa-pass/25',
};

const crowdColor: Record<string, string> = {
  Low:      'text-status-open',
  Moderate: 'text-status-soon',
  High:     'text-primary',
};

const TrailCard = ({ trail, index }: TrailCardProps) => {
  return (
    <Link
      to={`/trail/${trail.id}`}
      id={`trail-${trail.id}`}
      className="animate-fade-in bg-card border border-border rounded-lg overflow-hidden hover-lift block group"
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
          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-[11px] text-muted-foreground font-mono mb-4">
          {trail.region} · {trail.jurisdiction}
        </p>

        {/* Key stats — horizontal row */}
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

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2">
          {/* Permit badge */}
          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${permitBadge[trail.permitType]}`}>
            {trail.permitType}
          </span>

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
    </Link>
  );
};

export default TrailCard;
