import { useState } from 'react';
import { trails } from '@/data/trails';
import { Cloud, Sun, Wind, Eye, Thermometer, Droplets, Sunrise, Sunset, RefreshCw } from 'lucide-react';

const weatherIcons = [Sun, Cloud, Cloud, Sun, Cloud];
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const mockConditions = {
  weather: {
    temp: 12,
    description: 'Partly cloudy, clearing by noon',
    wind: '15 km/h NW',
    precip: '20%',
    snowLevel: '1800m',
    visibility: '25 km',
  },
  forecast: [
    { day: 'Mon', high: 14, low: 5, icon: 0 },
    { day: 'Tue', high: 12, low: 4, icon: 1 },
    { day: 'Wed', high: 10, low: 3, icon: 2 },
    { day: 'Thu', high: 15, low: 6, icon: 3 },
    { day: 'Fri', high: 13, low: 5, icon: 4 },
  ],
  trail: [
    { label: 'Bugs', level: 'Moderate', value: 50, color: 'bg-status-soon' },
    { label: 'Snow on Trail', level: 'Patchy', value: 35, color: 'bg-trail-wa-pass' },
    { label: 'Crowd Level', level: 'Low', value: 25, color: 'bg-status-open' },
    { label: 'Trail Quality', level: 'Good', value: 80, color: 'bg-status-open' },
    { label: 'Water Crossings', level: 'Easy', value: 20, color: 'bg-status-open' },
  ],
  trip: {
    sunrise: '6:12 AM',
    sunset: '7:45 PM',
    bestStart: '6:30 AM',
    bearActivity: true,
    campfireRestrictions: false,
  },
};

const Conditions = () => {
  const [selectedTrail, setSelectedTrail] = useState(trails[0].id);
  const trail = trails.find((t) => t.id === selectedTrail)!;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Trail Selector */}
      <div className="mb-8 animate-fade-in">
        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Select Trail</label>
        <select
          value={selectedTrail}
          onChange={(e) => setSelectedTrail(e.target.value)}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground font-serif focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
        >
          {trails.map((t) => (
            <option key={t.id} value={t.id}>{t.name} — {t.region}</option>
          ))}
        </select>
      </div>

      <h2 className="font-serif text-2xl text-foreground mb-6 animate-fade-in">
        Conditions for {trail.name}
      </h2>

      {/* Weather Panel */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="font-serif text-lg text-foreground mb-4">Weather</h3>
        <div className="flex items-start gap-6 mb-6">
          <div>
            <div className="text-4xl font-mono font-semibold text-foreground">{mockConditions.weather.temp}°C</div>
            <div className="text-sm text-muted-foreground mt-1">{mockConditions.weather.description}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Wind, label: 'Wind', value: mockConditions.weather.wind },
            { icon: Droplets, label: 'Precip', value: mockConditions.weather.precip },
            { icon: Thermometer, label: 'Snow Level', value: mockConditions.weather.snowLevel },
            { icon: Eye, label: 'Visibility', value: mockConditions.weather.visibility },
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
          {mockConditions.forecast.map((day, i) => {
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
          {mockConditions.trail.map((condition) => (
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
            { icon: Sunrise, label: 'Sunrise', value: mockConditions.trip.sunrise },
            { icon: Sunset, label: 'Sunset', value: mockConditions.trip.sunset },
            { label: 'Best Start', value: mockConditions.trip.bestStart },
            { label: 'Bear Activity', value: mockConditions.trip.bearActivity ? 'Yes — carry spray' : 'Low risk' },
            { label: 'Campfire Ban', value: mockConditions.trip.campfireRestrictions ? 'In effect' : 'No restrictions' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">{item.label}</div>
              <div className="text-sm font-mono text-foreground mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <span>Last updated: Mar 6, 2026 at 8:14 AM PST</span>
        <button className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors">
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Conditions;
