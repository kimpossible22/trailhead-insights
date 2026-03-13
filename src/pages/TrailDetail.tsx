import { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Clock, TrendingUp, Bug, Dog, Users,
  Cloud, Sun, Wind, Eye, Thermometer, Droplets, Sunrise, Sunset,
  Bell, ExternalLink, RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { trails } from '@/data/trails';
import { permits } from '@/data/permits';
import { conditionsByTrail } from '@/data/conditions';

const weatherIcons = [Sun, Cloud, Cloud, Sun, Cloud];

// ── Elevation Profile ──────────────────────────────────────────────────────

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

// ── Style maps ─────────────────────────────────────────────────────────────

const permitBadgeStyles: Record<string, string> = {
  'Permit Required':      'bg-trail-permit/15 text-trail-permit border-trail-permit/30',
  'No Permit':            'bg-trail-no-permit/15 text-trail-no-permit border-trail-no-permit/30',
  'WA Discover Pass':     'bg-trail-wa-pass/15 text-trail-wa-pass border-trail-wa-pass/30',
  'Northwest Forest Pass':'bg-trail-wa-pass/15 text-trail-wa-pass border-trail-wa-pass/30',
};

const bugsColor: Record<string, string> = {
  Low: 'text-status-open', Moderate: 'text-status-soon', High: 'text-primary',
};

const crowdColor: Record<string, string> = {
  Low: 'text-status-open', Moderate: 'text-status-soon', High: 'text-primary',
};

type Tab = 'overview' | 'conditions' | 'permit';

// ── Page ───────────────────────────────────────────────────────────────────

const TrailDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  // Permit alert state
  const [alertEmail, setAlertEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const trail = trails.find((t) => t.id === id);
  const activeTab = (searchParams.get('tab') as Tab) ?? 'overview';

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

  const conditions = conditionsByTrail[trail.id];
  const relatedPermits = permits.filter((p) => p.jurisdiction === trail.jurisdiction);

  const setTab = (tab: Tab) => {
    setSearchParams((prev) => {
      if (tab === 'overview') prev.delete('tab'); else prev.set('tab', tab);
      return prev;
    }, { replace: true });
  };

  const handlePermitAlert = () => {
    if (!alertEmail.trim()) { toast.error('Please enter your email address.'); return; }
    const names = relatedPermits.map((p) => p.name).join(', ');
    toast.success('Alert set!', { description: `We'll notify ${alertEmail} for: ${names}` });
    setAlertEmail('');
    setAlertOpen(false);
  };

  const tabs: { key: Tab; label: string; disabled?: boolean }[] = [
    { key: 'overview',   label: 'Overview' },
    { key: 'conditions', label: 'Conditions', disabled: !conditions },
    { key: 'permit',     label: 'Permit' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      {/* Header */}
      <div className="mb-6 animate-fade-in">
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

      {/* Tabs */}
      <div className="flex gap-0.5 mb-6 bg-secondary rounded-lg p-1 w-fit animate-fade-in" style={{ animationDelay: '0.05s' }}>
        {tabs.map(({ key, label, disabled }) => (
          <button
            key={key}
            onClick={() => !disabled && setTab(key)}
            disabled={disabled}
            className={`px-4 py-2 rounded-md text-sm font-mono transition-colors ${
              activeTab === key
                ? 'bg-card text-foreground shadow-sm'
                : disabled
                ? 'text-muted-foreground/40 cursor-not-allowed'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
            {key === 'conditions' && !conditions && (
              <span className="ml-1.5 text-[9px] font-mono opacity-60">N/A</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Overview Tab ──────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-fade-in">
            {[
              { icon: TrendingUp, label: 'Distance',       value: `${trail.distanceKm} km` },
              { icon: TrendingUp, label: 'Elevation Gain', value: `${trail.elevationGainM} m` },
              { icon: Clock,      label: 'Drive Time',     value: trail.driveTime },
              { icon: Bug,        label: 'Bugs',           value: trail.bugsLevel, colorClass: bugsColor[trail.bugsLevel] },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1">{stat.label}</div>
                <div className={`text-lg font-mono font-semibold ${stat.colorClass || 'text-foreground'}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.05s' }}>
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
          <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="font-serif text-lg text-foreground mb-4">Elevation Profile</h2>
            <ElevationProfile data={trail.elevationProfile} gradientId={`detail-elev-${trail.id}`} />
            <div className="flex justify-between mt-2 text-[10px] font-mono text-muted-foreground">
              <span>Trailhead</span>
              <span>+{trail.elevationGainM} m gain</span>
              <span>Summit / Turn</span>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-card border border-border rounded-lg p-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <h2 className="font-serif text-lg text-foreground mb-3">Data Sources</h2>
            <div className="flex flex-wrap gap-2">
              {trail.sources.map((source) => (
                <span key={source} className="text-xs font-mono text-muted-foreground bg-secondary rounded-full px-3 py-1">
                  {source}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Conditions Tab ────────────────────────────────────────── */}
      {activeTab === 'conditions' && conditions && (
        <div key={refreshKey}>
          {/* Weather */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in">
            <h2 className="font-serif text-lg text-foreground mb-4">Weather</h2>
            <div className="flex items-start gap-6 mb-6">
              <div>
                <div className="text-4xl font-mono font-semibold text-foreground">{conditions.weather.temp}°C</div>
                <div className="text-sm text-muted-foreground mt-1">{conditions.weather.description}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Wind,        label: 'Wind',       value: conditions.weather.wind },
                { icon: Droplets,    label: 'Precip',     value: conditions.weather.precip },
                { icon: Thermometer, label: 'Snow Level', value: conditions.weather.snowLevel },
                { icon: Eye,         label: 'Visibility', value: conditions.weather.visibility },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">{item.label}</div>
                    <div className="text-sm font-mono text-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 5-day Forecast */}
            <div className="grid grid-cols-5 gap-2">
              {conditions.forecast.map((day) => {
                const Icon = weatherIcons[day.icon];
                return (
                  <div key={day.day} className="text-center bg-secondary/50 rounded-md py-3">
                    <div className="text-xs font-mono text-muted-foreground mb-1">{day.day}</div>
                    <Icon className="h-5 w-5 mx-auto text-foreground mb-1" />
                    <div className="text-xs font-mono">
                      <span className="text-foreground">{day.high}°</span>
                      <span className="text-muted-foreground"> / {day.low}°</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trail Conditions */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="font-serif text-lg text-foreground mb-4">Trail Conditions</h2>
            <div className="space-y-4">
              {conditions.trail.map((condition) => (
                <div key={condition.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{condition.label}</span>
                    <span className="text-xs font-mono text-foreground">{condition.level}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${condition.color} transition-all`} style={{ width: `${condition.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Info */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-serif text-lg text-foreground mb-4">Trip Info</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: Sunrise, label: 'Sunrise',       value: conditions.trip.sunrise },
                { icon: Sunset,  label: 'Sunset',        value: conditions.trip.sunset },
                { icon: null,    label: 'Best Start',    value: conditions.trip.bestStart },
                { icon: null,    label: 'Bear Activity', value: conditions.trip.bearActivity ? 'Yes — carry spray' : 'Low risk' },
                { icon: null,    label: 'Campfire Ban',  value: conditions.trip.campfireRestrictions ? 'In effect' : 'No restrictions' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">{item.label}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {item.icon && <item.icon className="h-3.5 w-3.5 text-muted-foreground" />}
                    <span className="text-sm font-mono text-foreground">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <span>Last updated: {new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })} — simulated data</span>
            <button
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
              onClick={() => setRefreshKey((k) => k + 1)}
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* ── Permit Tab ────────────────────────────────────────────── */}
      {activeTab === 'permit' && (
        <>
          <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in">
            <h2 className="font-serif text-lg text-foreground mb-1">
              Permits for {trail.jurisdiction === 'BC' ? 'BC Parks' : 'Washington'}
            </h2>
            <p className="text-xs font-mono text-muted-foreground mb-5">
              2026 season · {relatedPermits.filter((p) => p.status === 'open').length} open now
            </p>

            {relatedPermits.length === 0 ? (
              <p className="text-sm font-mono text-muted-foreground">No permit requirements found for this region.</p>
            ) : (
              <div className="space-y-4">
                {relatedPermits.map((permit) => (
                  <div key={permit.id} className="flex items-center justify-between gap-3 py-3 border-b border-border last:border-0">
                    <div className="flex items-start gap-3">
                      <span className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                        permit.status === 'open' ? 'bg-status-open' :
                        permit.status === 'soon' ? 'bg-status-soon' :
                        'bg-status-closed'
                      }`} />
                      <div>
                        <div className="text-sm font-serif text-foreground">{permit.name}</div>
                        <div className="text-xs font-mono text-muted-foreground">{permit.agency}</div>
                        <div className="text-xs font-mono text-muted-foreground mt-0.5">{permit.keyDate}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        permit.status === 'open' ? 'bg-status-open/15 text-status-open' :
                        permit.status === 'soon' ? 'bg-status-soon/15 text-status-soon' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {permit.status === 'open' ? 'Open' : permit.status === 'soon' ? 'Soon' : 'Closed'}
                      </span>
                      {permit.status === 'open' && (
                        <a
                          href={permit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[10px] font-mono text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Book Now
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inline permit alert */}
          <div className="bg-card border border-border rounded-lg p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-4 w-4 text-primary" />
              <h2 className="font-serif text-lg text-foreground">Get notified when windows open</h2>
            </div>
            <p className="text-xs font-mono text-muted-foreground mb-4">
              We'll email you when any {trail.jurisdiction === 'BC' ? 'BC Parks' : 'Washington'} permit becomes available.
            </p>

            {!alertOpen ? (
              <button
                onClick={() => setAlertOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-md text-sm font-mono text-foreground hover:bg-muted transition-colors"
              >
                <Bell className="h-3.5 w-3.5 text-primary" />
                Set permit alert
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePermitAlert()}
                  className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  autoFocus
                />
                <button
                  onClick={handlePermitAlert}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-mono font-medium hover:bg-primary/90 transition-colors"
                >
                  Alert me
                </button>
                <button
                  onClick={() => { setAlertOpen(false); setAlertEmail(''); }}
                  className="px-3 py-2 bg-secondary border border-border rounded-md text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            <p className="text-xs font-mono text-muted-foreground mt-3">
              Want to manage all alerts?{' '}
              <Link to="/permits" className="text-primary hover:underline">View all permits →</Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default TrailDetail;
