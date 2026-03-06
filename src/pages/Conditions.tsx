import { useState } from 'react';
import { trails } from '@/data/trails';
import { Cloud, Sun, Wind, Eye, Thermometer, Droplets, Sunrise, Sunset, RefreshCw } from 'lucide-react';

const weatherIcons = [Sun, Cloud, Cloud, Sun, Cloud];

type TrailConditions = {
  weather: {
    temp: number;
    description: string;
    wind: string;
    precip: string;
    snowLevel: string;
    visibility: string;
  };
  forecast: { day: string; high: number; low: number; icon: number }[];
  trail: { label: string; level: string; value: number; color: string }[];
  trip: {
    sunrise: string;
    sunset: string;
    bestStart: string;
    bearActivity: boolean;
    campfireRestrictions: boolean;
  };
};

const conditionsByTrail: Record<string, TrailConditions> = {
  'garibaldi-lake': {
    weather: { temp: 10, description: 'Partly cloudy, clearing by noon', wind: '15 km/h NW', precip: '20%', snowLevel: '1800m', visibility: '25 km' },
    forecast: [
      { day: 'Mon', high: 12, low: 4, icon: 0 },
      { day: 'Tue', high: 10, low: 3, icon: 1 },
      { day: 'Wed', high: 9, low: 2, icon: 2 },
      { day: 'Thu', high: 13, low: 5, icon: 3 },
      { day: 'Fri', high: 11, low: 4, icon: 4 },
    ],
    trail: [
      { label: 'Bugs', level: 'Moderate', value: 50, color: 'bg-status-soon' },
      { label: 'Snow on Trail', level: 'Patchy', value: 35, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level', level: 'High', value: 85, color: 'bg-primary' },
      { label: 'Trail Quality', level: 'Good', value: 75, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy', value: 20, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:12 AM', sunset: '7:45 PM', bestStart: '6:00 AM', bearActivity: true, campfireRestrictions: false },
  },
  'joffre-lakes': {
    weather: { temp: 14, description: 'Clear skies all day', wind: '8 km/h S', precip: '5%', snowLevel: '2200m', visibility: '40 km' },
    forecast: [
      { day: 'Mon', high: 16, low: 6, icon: 0 },
      { day: 'Tue', high: 15, low: 5, icon: 0 },
      { day: 'Wed', high: 13, low: 4, icon: 1 },
      { day: 'Thu', high: 17, low: 7, icon: 0 },
      { day: 'Fri', high: 14, low: 5, icon: 1 },
    ],
    trail: [
      { label: 'Bugs', level: 'Low', value: 20, color: 'bg-status-open' },
      { label: 'Snow on Trail', level: 'None', value: 0, color: 'bg-status-open' },
      { label: 'Crowd Level', level: 'High', value: 90, color: 'bg-primary' },
      { label: 'Trail Quality', level: 'Excellent', value: 95, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy', value: 15, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:08 AM', sunset: '7:50 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },
  'panorama-ridge': {
    weather: { temp: 6, description: 'Cool with afternoon clouds', wind: '22 km/h NW', precip: '15%', snowLevel: '1600m', visibility: '30 km' },
    forecast: [
      { day: 'Mon', high: 8, low: 1, icon: 1 },
      { day: 'Tue', high: 7, low: 0, icon: 2 },
      { day: 'Wed', high: 9, low: 2, icon: 1 },
      { day: 'Thu', high: 11, low: 3, icon: 0 },
      { day: 'Fri', high: 8, low: 1, icon: 2 },
    ],
    trail: [
      { label: 'Bugs', level: 'Low', value: 15, color: 'bg-status-open' },
      { label: 'Snow on Trail', level: 'Significant', value: 70, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level', level: 'Low', value: 20, color: 'bg-status-open' },
      { label: 'Trail Quality', level: 'Fair', value: 50, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Moderate', value: 55, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:15 AM', sunset: '7:42 PM', bestStart: '5:30 AM', bearActivity: true, campfireRestrictions: false },
  },
  'chain-lakes': {
    weather: { temp: 11, description: 'Sunny with light breeze', wind: '10 km/h W', precip: '10%', snowLevel: '2000m', visibility: '35 km' },
    forecast: [
      { day: 'Mon', high: 13, low: 4, icon: 0 },
      { day: 'Tue', high: 14, low: 5, icon: 0 },
      { day: 'Wed', high: 11, low: 3, icon: 1 },
      { day: 'Thu', high: 15, low: 6, icon: 0 },
      { day: 'Fri', high: 12, low: 4, icon: 1 },
    ],
    trail: [
      { label: 'Bugs', level: 'Low', value: 18, color: 'bg-status-open' },
      { label: 'Snow on Trail', level: 'Minimal', value: 15, color: 'bg-status-open' },
      { label: 'Crowd Level', level: 'Moderate', value: 55, color: 'bg-status-soon' },
      { label: 'Trail Quality', level: 'Good', value: 80, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy', value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:05 AM', sunset: '7:55 PM', bestStart: '7:30 AM', bearActivity: false, campfireRestrictions: true },
  },
  'wedgemount-lake': {
    weather: { temp: 8, description: 'Variable cloud, clearing afternoon', wind: '18 km/h NE', precip: '25%', snowLevel: '1700m', visibility: '20 km' },
    forecast: [
      { day: 'Mon', high: 10, low: 2, icon: 1 },
      { day: 'Tue', high: 9, low: 1, icon: 2 },
      { day: 'Wed', high: 12, low: 3, icon: 1 },
      { day: 'Thu', high: 13, low: 4, icon: 0 },
      { day: 'Fri', high: 10, low: 2, icon: 1 },
    ],
    trail: [
      { label: 'Bugs', level: 'Moderate', value: 45, color: 'bg-status-soon' },
      { label: 'Snow on Trail', level: 'Heavy', value: 80, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level', level: 'Low', value: 25, color: 'bg-status-open' },
      { label: 'Trail Quality', level: 'Fair', value: 45, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Challenging', value: 75, color: 'bg-primary' },
    ],
    trip: { sunrise: '6:10 AM', sunset: '7:48 PM', bestStart: '6:00 AM', bearActivity: true, campfireRestrictions: false },
  },
  'maple-pass': {
    weather: { temp: 13, description: 'Clear and dry', wind: '5 km/h SW', precip: '5%', snowLevel: '2400m', visibility: '50 km' },
    forecast: [
      { day: 'Mon', high: 15, low: 5, icon: 0 },
      { day: 'Tue', high: 16, low: 6, icon: 0 },
      { day: 'Wed', high: 14, low: 4, icon: 0 },
      { day: 'Thu', high: 17, low: 7, icon: 0 },
      { day: 'Fri', high: 13, low: 5, icon: 1 },
    ],
    trail: [
      { label: 'Bugs', level: 'Low', value: 10, color: 'bg-status-open' },
      { label: 'Snow on Trail', level: 'None', value: 0, color: 'bg-status-open' },
      { label: 'Crowd Level', level: 'Moderate', value: 60, color: 'bg-status-soon' },
      { label: 'Trail Quality', level: 'Excellent', value: 92, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy', value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:02 AM', sunset: '7:58 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },
};

const Conditions = () => {
  const [selectedTrail, setSelectedTrail] = useState(trails[0].id);
  const trail = trails.find((t) => t.id === selectedTrail)!;
  const conditions = conditionsByTrail[selectedTrail];

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
            <div className="text-4xl font-mono font-semibold text-foreground">{conditions.weather.temp}°C</div>
            <div className="text-sm text-muted-foreground mt-1">{conditions.weather.description}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Wind, label: 'Wind', value: conditions.weather.wind },
            { icon: Droplets, label: 'Precip', value: conditions.weather.precip },
            { icon: Thermometer, label: 'Snow Level', value: conditions.weather.snowLevel },
            { icon: Eye, label: 'Visibility', value: conditions.weather.visibility },
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
            { icon: Sunrise, label: 'Sunrise', value: conditions.trip.sunrise },
            { icon: Sunset, label: 'Sunset', value: conditions.trip.sunset },
            { label: 'Best Start', value: conditions.trip.bestStart },
            { label: 'Bear Activity', value: conditions.trip.bearActivity ? 'Yes — carry spray' : 'Low risk' },
            { label: 'Campfire Ban', value: conditions.trip.campfireRestrictions ? 'In effect' : 'No restrictions' },
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
        <span>Last updated: {new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })} — simulated data</span>
        <button
          className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
          onClick={() => setSelectedTrail(selectedTrail)}
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Conditions;
