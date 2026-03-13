import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trails } from '@/data/trails';
import { conditionsByTrail } from '@/data/conditions';
import { Cloud, Sun, Wind, Eye, Thermometer, Droplets, Sunrise, Sunset, RefreshCw } from 'lucide-react';

const weatherIcons = [Sun, Cloud, Cloud, Sun, Cloud];

const trailsWithData = trails.filter((t) => conditionsByTrail[t.id]);

const Conditions = () => {
  const [selectedTrail, setSelectedTrail] = useState(trailsWithData[0]?.id ?? trails[0].id);
  const [refreshKey, setRefreshKey] = useState(0);
  const trail = trails.find((t) => t.id === selectedTrail) ?? trails[0];
  const conditions = conditionsByTrail[selectedTrail];

  // Trails with data, excluding currently selected one (for alternatives)
  const alternatives = trailsWithData.filter((t) => t.id !== selectedTrail).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" key={refreshKey}>
      {/* Trail Selector */}
      <div className="mb-8 animate-fade-in">
        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Select Trail</label>
        <select
          value={selectedTrail}
          onChange={(e) => setSelectedTrail(e.target.value)}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground font-serif focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
        >
          <optgroup label="Conditions available">
            {trailsWithData.map((t) => (
              <option key={t.id} value={t.id}>{t.name} — {t.region}</option>
            ))}
          </optgroup>
          <optgroup label="No data yet">
            {trails.filter((t) => !conditionsByTrail[t.id]).map((t) => (
              <option key={t.id} value={t.id}>{t.name} — {t.region}</option>
            ))}
          </optgroup>
        </select>
      </div>

      <h2 className="font-serif text-2xl text-foreground mb-6 animate-fade-in">
        Conditions for {trail.name}
      </h2>

      {!conditions ? (
        <div className="animate-fade-in">
          <div className="bg-card border border-border rounded-lg p-12 text-center mb-6">
            <div className="text-muted-foreground font-mono text-sm mb-1">No conditions data available for this trail yet.</div>
            <div className="text-muted-foreground font-mono text-xs">Check back soon — we're adding more trails regularly.</div>
          </div>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                Trails with current conditions nearby
              </p>
              <div className="space-y-2">
                {alternatives.map((alt) => {
                  const altConditions = conditionsByTrail[alt.id];
                  const temp = altConditions?.weather.temp;
                  const crowdLevel = altConditions?.trail.find((c) => c.label === 'Crowd Level')?.level;
                  return (
                    <button
                      key={alt.id}
                      onClick={() => setSelectedTrail(alt.id)}
                      className="w-full text-left bg-card border border-border rounded-lg px-4 py-3 hover:border-primary/40 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-serif text-foreground group-hover:text-primary transition-colors">{alt.name}</div>
                          <div className="text-xs font-mono text-muted-foreground">{alt.region} · {alt.jurisdiction}</div>
                        </div>
                        <div className="text-right">
                          {temp !== undefined && (
                            <div className="text-sm font-mono text-foreground">{temp}°C</div>
                          )}
                          {crowdLevel && (
                            <div className={`text-xs font-mono ${
                              crowdLevel === 'Low' ? 'text-status-open' :
                              crowdLevel === 'Moderate' ? 'text-status-soon' :
                              'text-primary'
                            }`}>{crowdLevel} crowds</div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Weather Panel */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-serif text-lg text-foreground mb-4">Weather</h3>
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
          <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-serif text-lg text-foreground mb-4">Trail Conditions</h3>
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
          <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-serif text-lg text-foreground mb-4">Trip Info</h3>
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

          {/* Footer */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span>Last updated: {new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })} — simulated data</span>
            <div className="flex items-center gap-4">
              <Link to={`/trail/${trail.id}?tab=conditions`} className="text-primary hover:underline">
                Full trail detail →
              </Link>
              <button
                className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setRefreshKey((k) => k + 1)}
              >
                <RefreshCw className="h-3 w-3" />
                Refresh
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Conditions;
