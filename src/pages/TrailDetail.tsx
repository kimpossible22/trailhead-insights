import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, TrendingUp, Bug, Dog, Users } from 'lucide-react';
import { trails } from '@/data/trails';
import { permits } from '@/data/permits';

const ElevationProfile = ({ data, gradientId }: { data: number[]; gradientId: string }) => {
  if (data.length <= 1) return null;
  const max = Math.max(...data);
  const width = 600;
  const height = 80;
  const padding = 4;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (val / max) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

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

const crowdColor: Record<string, string> = {
  Low: 'text-status-open',
  Moderate: 'text-status-soon',
  High: 'text-primary',
};

const TrailDetail = () => {
  const { id } = useParams<{ id: string }>();
  const trail = trails.find((t) => t.id === id);

  if (!trail) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground font-mono">Trail not found.</p>
        <Link to="/" className="text-primary hover:underline font-mono text-sm mt-4 inline-block">
          ← Back to Discover
        </Link>
      </div>
    );
  }

  const relatedPermits = permits.filter((p) => p.jurisdiction === trail.jurisdiction);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Discover
      </Link>

      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="font-serif text-3xl text-foreground leading-tight">{trail.name}</h1>
          <span className={`text-[10px] font-mono font-medium px-2 py-1 rounded-full border flex-shrink-0 mt-1 ${permitBadgeStyles[trail.permitType]}`}>
            {trail.permitType}
          </span>
        </div>
        <p className="text-sm text-muted-foreground font-mono flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {trail.region} · {trail.jurisdiction}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.05s' }}>
        {[
          { icon: TrendingUp, label: 'Distance', value: `${trail.distanceKm} km` },
          { icon: TrendingUp, label: 'Elevation Gain', value: `${trail.elevationGainM} m` },
          { icon: Clock, label: 'Drive Time', value: trail.driveTime },
          { icon: Bug, label: 'Bugs', value: trail.bugsLevel, colorClass: bugsColor[trail.bugsLevel] },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1">{stat.label}</div>
            <div className={`text-lg font-mono font-semibold ${stat.colorClass || 'text-foreground'}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick tags */}
      <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border bg-secondary border-border ${trail.dogFriendly ? 'text-status-open' : 'text-muted-foreground'}`}>
          <Dog className="h-3 w-3" />
          {trail.dogFriendly ? 'Dog Friendly' : 'No Dogs'}
        </span>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border bg-secondary border-border ${crowdColor[trail.crowdLevel]}`}>
          <Users className="h-3 w-3" />
          {trail.crowdLevel} Crowds
        </span>
      </div>

      {/* Elevation Profile */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <h2 className="font-serif text-lg text-foreground mb-4">Elevation Profile</h2>
        <ElevationProfile data={trail.elevationProfile} gradientId={`detail-elev-${trail.id}`} />
        <div className="flex justify-between mt-2 text-[10px] font-mono text-muted-foreground">
          <span>Trailhead</span>
          <span>+{trail.elevationGainM} m gain</span>
          <span>Summit / Turn</span>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="font-serif text-lg text-foreground mb-3">Data Sources</h2>
        <div className="flex flex-wrap gap-2">
          {trail.sources.map((source) => (
            <span key={source} className="text-xs font-mono text-muted-foreground bg-secondary rounded-full px-3 py-1">
              {source}
            </span>
          ))}
        </div>
      </div>

      {/* Related Permits */}
      {relatedPermits.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6 animate-fade-in" style={{ animationDelay: '0.25s' }}>
          <h2 className="font-serif text-lg text-foreground mb-4">
            Permits for {trail.jurisdiction === 'BC' ? 'BC Parks' : 'Washington'}
          </h2>
          <div className="space-y-3">
            {relatedPermits.map((permit) => (
              <div key={permit.id} className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-serif text-foreground">{permit.name}</div>
                  <div className="text-xs font-mono text-muted-foreground">{permit.keyDate}</div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  permit.status === 'open' ? 'bg-status-open/15 text-status-open' :
                  permit.status === 'soon' ? 'bg-status-soon/15 text-status-soon' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {permit.status === 'open' ? 'Open' : permit.status === 'soon' ? 'Soon' : 'Closed'}
                </span>
              </div>
            ))}
          </div>
          <Link to="/permits" className="text-xs font-mono text-primary hover:underline mt-4 inline-block">
            View all permits →
          </Link>
        </div>
      )}
    </div>
  );
};

export default TrailDetail;
