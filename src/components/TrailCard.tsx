import { Link } from 'react-router-dom';
import type { Trail } from '@/data/trails';

const ElevationProfile = ({ data, gradientId }: { data: number[]; gradientId: string }) => {
  if (data.length <= 1) return null;
  const max = Math.max(...data);
  const width = 200;
  const height = 40;
  const padding = 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (val / max) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
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

const permitBadgeStyles: Record<string, string> = {
  'Permit Required': 'bg-trail-permit/15 text-trail-permit border-trail-permit/30',
  'No Permit': 'bg-trail-no-permit/15 text-trail-no-permit border-trail-no-permit/30',
  'WA Discover Pass': 'bg-trail-wa-pass/15 text-trail-wa-pass border-trail-wa-pass/30',
  'Northwest Forest Pass': 'bg-trail-wa-pass/15 text-trail-wa-pass border-trail-wa-pass/30',
};

const bugsColor: Record<string, string> = {
  Low: 'text-status-open',
  Moderate: 'text-status-soon',
  High: 'text-primary',
};

const TrailCard = ({ trail, index }: TrailCardProps) => {
  return (
    <Link
      to={`/trail/${trail.id}`}
      id={`trail-${trail.id}`}
      className="animate-fade-in bg-card border border-border rounded-lg p-5 hover-lift relative overflow-hidden block"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Permit Badge */}
      <div className={`absolute top-3 right-3 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${permitBadgeStyles[trail.permitType]}`}>
        {trail.permitType}
      </div>

      {/* Trail Name */}
      <h3 className="font-serif text-lg text-foreground pr-24 leading-tight mb-1">
        {trail.name}
      </h3>
      <p className="text-xs text-muted-foreground font-mono mb-4">
        {trail.region} · {trail.jurisdiction}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Distance', value: `${trail.distanceKm} km` },
          { label: 'Elevation', value: `${trail.elevationGainM} m` },
          { label: 'Drive', value: trail.driveTime },
          { label: 'Bugs', value: trail.bugsLevel, colorClass: bugsColor[trail.bugsLevel] },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{stat.label}</div>
            <div className={`text-sm font-mono font-medium ${stat.colorClass || 'text-foreground'}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Elevation Profile */}
      <div className="mb-3">
        <ElevationProfile data={trail.elevationProfile} gradientId={`elev-grad-${trail.id}`} />
      </div>

      {/* Sources */}
      <div className="flex flex-wrap gap-1.5">
        {trail.sources.map((source) => (
          <span key={source} className="text-[10px] font-mono text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
            {source}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default TrailCard;
