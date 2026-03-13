export type TrailConditions = {
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

export const conditionsByTrail: Record<string, TrailConditions> = {

  // ── BC TRAILS ─────────────────────────────────────────────────────────────

  'garibaldi-lake': {
    weather: { temp: 10, description: 'Partly cloudy, clearing by noon', wind: '15 km/h NW', precip: '20%', snowLevel: '1800m', visibility: '25 km' },
    forecast: [
      { day: 'Mon', high: 12, low: 4, icon: 0 },
      { day: 'Tue', high: 10, low: 3, icon: 1 },
      { day: 'Wed', high: 9,  low: 2, icon: 2 },
      { day: 'Thu', high: 13, low: 5, icon: 3 },
      { day: 'Fri', high: 11, low: 4, icon: 4 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate',    value: 50, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Patchy',      value: 35, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'High',        value: 85, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Good',        value: 75, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',        value: 20, color: 'bg-status-open' },
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
      { label: 'Bugs',            level: 'Low',       value: 20, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',      value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'High',      value: 90, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Excellent', value: 95, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 15, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:08 AM', sunset: '7:50 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'panorama-ridge': {
    weather: { temp: 6, description: 'Cool with afternoon clouds', wind: '22 km/h NW', precip: '15%', snowLevel: '1600m', visibility: '30 km' },
    forecast: [
      { day: 'Mon', high: 8,  low: 1, icon: 1 },
      { day: 'Tue', high: 7,  low: 0, icon: 2 },
      { day: 'Wed', high: 9,  low: 2, icon: 1 },
      { day: 'Thu', high: 11, low: 3, icon: 0 },
      { day: 'Fri', high: 8,  low: 1, icon: 2 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',         value: 15, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Significant', value: 70, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',         value: 20, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',        value: 50, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Moderate',    value: 55, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:15 AM', sunset: '7:42 PM', bestStart: '5:30 AM', bearActivity: true, campfireRestrictions: false },
  },

  'wedgemount-lake': {
    weather: { temp: 8, description: 'Variable cloud, clearing afternoon', wind: '18 km/h NE', precip: '25%', snowLevel: '1700m', visibility: '20 km' },
    forecast: [
      { day: 'Mon', high: 10, low: 2, icon: 1 },
      { day: 'Tue', high: 9,  low: 1, icon: 2 },
      { day: 'Wed', high: 12, low: 3, icon: 1 },
      { day: 'Thu', high: 13, low: 4, icon: 0 },
      { day: 'Fri', high: 10, low: 2, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate',    value: 45, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Heavy',       value: 80, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',         value: 25, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',        value: 45, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Challenging', value: 75, color: 'bg-primary' },
    ],
    trip: { sunrise: '6:10 AM', sunset: '7:48 PM', bestStart: '6:00 AM', bearActivity: true, campfireRestrictions: false },
  },

  'stawamus-chief': {
    weather: { temp: 13, description: 'Mostly sunny, light cloud', wind: '10 km/h W', precip: '10%', snowLevel: '1400m', visibility: '35 km' },
    forecast: [
      { day: 'Mon', high: 14, low: 6, icon: 0 },
      { day: 'Tue', high: 13, low: 5, icon: 0 },
      { day: 'Wed', high: 11, low: 4, icon: 1 },
      { day: 'Thu', high: 15, low: 7, icon: 0 },
      { day: 'Fri', high: 12, low: 5, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 15, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',      value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'High',      value: 88, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Good',      value: 80, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:18 AM', sunset: '7:40 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'grouse-grind': {
    weather: { temp: 11, description: 'Clear with morning mist', wind: '8 km/h SW', precip: '5%', snowLevel: '1200m', visibility: '30 km' },
    forecast: [
      { day: 'Mon', high: 12, low: 5, icon: 0 },
      { day: 'Tue', high: 11, low: 4, icon: 0 },
      { day: 'Wed', high: 10, low: 4, icon: 1 },
      { day: 'Thu', high: 13, low: 6, icon: 0 },
      { day: 'Fri', high: 11, low: 5, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 10, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Patchy',    value: 20, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'High',      value: 95, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Excellent', value: 90, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 5,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:20 AM', sunset: '7:38 PM', bestStart: '6:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'st-marks-summit': {
    weather: { temp: 10, description: 'Partly cloudy, mild', wind: '12 km/h NW', precip: '15%', snowLevel: '1300m', visibility: '28 km' },
    forecast: [
      { day: 'Mon', high: 11, low: 4, icon: 1 },
      { day: 'Tue', high: 12, low: 5, icon: 0 },
      { day: 'Wed', high: 10, low: 3, icon: 1 },
      { day: 'Thu', high: 13, low: 5, icon: 0 },
      { day: 'Fri', high: 11, low: 4, icon: 2 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',    value: 12, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Patchy', value: 25, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Moderate', value: 55, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',   value: 78, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',   value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:19 AM', sunset: '7:39 PM', bestStart: '7:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'golden-ears': {
    weather: { temp: 7, description: 'Overcast, chance of showers', wind: '20 km/h NE', precip: '35%', snowLevel: '1500m', visibility: '18 km' },
    forecast: [
      { day: 'Mon', high: 9,  low: 2, icon: 2 },
      { day: 'Tue', high: 8,  low: 1, icon: 2 },
      { day: 'Wed', high: 10, low: 3, icon: 1 },
      { day: 'Thu', high: 11, low: 4, icon: 1 },
      { day: 'Fri', high: 9,  low: 2, icon: 2 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate',    value: 40, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Significant', value: 65, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',         value: 22, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',        value: 52, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Moderate',    value: 60, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:14 AM', sunset: '7:43 PM', bestStart: '5:45 AM', bearActivity: true, campfireRestrictions: false },
  },

  'elk-mountain': {
    weather: { temp: 12, description: 'Sunny with scattered clouds', wind: '14 km/h W', precip: '10%', snowLevel: '1600m', visibility: '32 km' },
    forecast: [
      { day: 'Mon', high: 13, low: 4, icon: 0 },
      { day: 'Tue', high: 14, low: 5, icon: 0 },
      { day: 'Wed', high: 11, low: 3, icon: 1 },
      { day: 'Thu', high: 15, low: 6, icon: 0 },
      { day: 'Fri', high: 12, low: 4, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 42, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Minimal',  value: 15, color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate', value: 50, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',     value: 72, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 18, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:11 AM', sunset: '7:46 PM', bestStart: '7:00 AM', bearActivity: true, campfireRestrictions: false },
  },

  'cheam-peak': {
    weather: { temp: 11, description: 'Clear and crisp', wind: '9 km/h NW', precip: '5%', snowLevel: '1700m', visibility: '45 km' },
    forecast: [
      { day: 'Mon', high: 13, low: 3, icon: 0 },
      { day: 'Tue', high: 12, low: 3, icon: 0 },
      { day: 'Wed', high: 10, low: 2, icon: 1 },
      { day: 'Thu', high: 14, low: 4, icon: 0 },
      { day: 'Fri', high: 11, low: 3, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',     value: 8,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Minimal', value: 12, color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Low',     value: 18, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Good',    value: 76, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',    value: 8,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:10 AM', sunset: '7:47 PM', bestStart: '6:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'watersprite-lake': {
    weather: { temp: 9, description: 'Mostly cloudy, light showers possible', wind: '16 km/h NW', precip: '30%', snowLevel: '1500m', visibility: '22 km' },
    forecast: [
      { day: 'Mon', high: 10, low: 3, icon: 2 },
      { day: 'Tue', high: 11, low: 4, icon: 1 },
      { day: 'Wed', high: 9,  low: 2, icon: 2 },
      { day: 'Thu', high: 12, low: 4, icon: 1 },
      { day: 'Fri', high: 10, low: 3, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 38, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 30, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Moderate', value: 48, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',     value: 70, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 20, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:16 AM', sunset: '7:41 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'black-tusk': {
    weather: { temp: 4, description: 'Cold, mixed cloud and sun', wind: '25 km/h N', precip: '20%', snowLevel: '1400m', visibility: '28 km' },
    forecast: [
      { day: 'Mon', high: 6,  low: -1, icon: 1 },
      { day: 'Tue', high: 5,  low: -2, icon: 2 },
      { day: 'Wed', high: 7,  low: 0,  icon: 1 },
      { day: 'Thu', high: 9,  low: 1,  icon: 0 },
      { day: 'Fri', high: 6,  low: -1, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 5,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Heavy',     value: 90, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',       value: 15, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',      value: 40, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Moderate',  value: 50, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:13 AM', sunset: '7:44 PM', bestStart: '5:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'lynn-peak': {
    weather: { temp: 12, description: 'Partly sunny, mild', wind: '7 km/h SW', precip: '10%', snowLevel: '1300m', visibility: '30 km' },
    forecast: [
      { day: 'Mon', high: 13, low: 5, icon: 0 },
      { day: 'Tue', high: 12, low: 5, icon: 1 },
      { day: 'Wed', high: 11, low: 4, icon: 1 },
      { day: 'Thu', high: 14, low: 6, icon: 0 },
      { day: 'Fri', high: 12, low: 5, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 35, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 22, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Moderate', value: 52, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',     value: 74, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 12, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:21 AM', sunset: '7:37 PM', bestStart: '7:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'coliseum-mountain': {
    weather: { temp: 9, description: 'Overcast, brightening by afternoon', wind: '13 km/h NW', precip: '20%', snowLevel: '1400m', visibility: '24 km' },
    forecast: [
      { day: 'Mon', high: 10, low: 3, icon: 1 },
      { day: 'Tue', high: 11, low: 4, icon: 1 },
      { day: 'Wed', high: 9,  low: 2, icon: 2 },
      { day: 'Thu', high: 12, low: 4, icon: 0 },
      { day: 'Fri', high: 10, low: 3, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 40, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 28, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',      value: 20, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Good',     value: 68, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 15, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:20 AM', sunset: '7:38 PM', bestStart: '6:45 AM', bearActivity: false, campfireRestrictions: false },
  },

  'hanes-valley': {
    weather: { temp: 7, description: 'Cool and partly cloudy', wind: '18 km/h N', precip: '25%', snowLevel: '1500m', visibility: '22 km' },
    forecast: [
      { day: 'Mon', high: 8,  low: 1, icon: 1 },
      { day: 'Tue', high: 7,  low: 0, icon: 2 },
      { day: 'Wed', high: 9,  low: 2, icon: 1 },
      { day: 'Thu', high: 11, low: 3, icon: 0 },
      { day: 'Fri', high: 8,  low: 1, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate',    value: 38, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Significant', value: 62, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',         value: 18, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',        value: 48, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Challenging', value: 70, color: 'bg-primary' },
    ],
    trip: { sunrise: '6:20 AM', sunset: '7:38 PM', bestStart: '5:45 AM', bearActivity: true, campfireRestrictions: false },
  },

  'tunnel-bluffs': {
    weather: { temp: 14, description: 'Sunny and warm for the season', wind: '9 km/h W', precip: '5%', snowLevel: '1800m', visibility: '40 km' },
    forecast: [
      { day: 'Mon', high: 15, low: 6, icon: 0 },
      { day: 'Tue', high: 14, low: 6, icon: 0 },
      { day: 'Wed', high: 12, low: 4, icon: 1 },
      { day: 'Thu', high: 16, low: 7, icon: 0 },
      { day: 'Fri', high: 14, low: 6, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 14, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',      value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'High',      value: 82, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Excellent', value: 88, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 8,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:17 AM', sunset: '7:41 PM', bestStart: '8:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'sea-to-summit': {
    weather: { temp: 12, description: 'Mostly clear, hazy horizon', wind: '11 km/h SW', precip: '10%', snowLevel: '1600m', visibility: '28 km' },
    forecast: [
      { day: 'Mon', high: 13, low: 5, icon: 0 },
      { day: 'Tue', high: 12, low: 4, icon: 1 },
      { day: 'Wed', high: 11, low: 4, icon: 1 },
      { day: 'Thu', high: 14, low: 6, icon: 0 },
      { day: 'Fri', high: 12, low: 5, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',      value: 16, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',     value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate', value: 55, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',     value: 82, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 5,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:18 AM', sunset: '7:40 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'brandywine-meadows': {
    weather: { temp: 10, description: 'Partly cloudy with sunny breaks', wind: '12 km/h NW', precip: '15%', snowLevel: '1700m', visibility: '30 km' },
    forecast: [
      { day: 'Mon', high: 11, low: 3, icon: 1 },
      { day: 'Tue', high: 12, low: 4, icon: 0 },
      { day: 'Wed', high: 10, low: 2, icon: 1 },
      { day: 'Thu', high: 13, low: 5, icon: 0 },
      { day: 'Fri', high: 11, low: 3, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 42, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 30, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',      value: 25, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Good',     value: 72, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 18, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:14 AM', sunset: '7:43 PM', bestStart: '7:30 AM', bearActivity: true, campfireRestrictions: false },
  },

  'high-note-trail': {
    weather: { temp: 5, description: 'Cool and clear, winds picking up mid-day', wind: '28 km/h NW', precip: '10%', snowLevel: '1500m', visibility: '50 km' },
    forecast: [
      { day: 'Mon', high: 7,  low: 0,  icon: 0 },
      { day: 'Tue', high: 6,  low: -1, icon: 1 },
      { day: 'Wed', high: 8,  low: 1,  icon: 0 },
      { day: 'Thu', high: 10, low: 2,  icon: 0 },
      { day: 'Fri', high: 7,  low: 0,  icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',         value: 8,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Significant', value: 68, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'High',        value: 80, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Good',        value: 65, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',        value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:13 AM', sunset: '7:44 PM', bestStart: '8:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'russet-lake': {
    weather: { temp: 4, description: 'Partly cloudy, alpine chill', wind: '22 km/h NW', precip: '20%', snowLevel: '1400m', visibility: '25 km' },
    forecast: [
      { day: 'Mon', high: 5,  low: -2, icon: 1 },
      { day: 'Tue', high: 4,  low: -3, icon: 2 },
      { day: 'Wed', high: 6,  low: -1, icon: 1 },
      { day: 'Thu', high: 8,  low: 0,  icon: 0 },
      { day: 'Fri', high: 5,  low: -2, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 5,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Heavy',     value: 85, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',       value: 12, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',      value: 42, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Moderate',  value: 55, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:13 AM', sunset: '7:44 PM', bestStart: '5:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'elfin-lakes': {
    weather: { temp: 8, description: 'Sunny with high cloud', wind: '14 km/h NW', precip: '10%', snowLevel: '1600m', visibility: '35 km' },
    forecast: [
      { day: 'Mon', high: 9,  low: 2, icon: 0 },
      { day: 'Tue', high: 8,  low: 1, icon: 1 },
      { day: 'Wed', high: 10, low: 3, icon: 0 },
      { day: 'Thu', high: 11, low: 3, icon: 0 },
      { day: 'Fri', high: 9,  low: 2, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 10, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Patchy',    value: 35, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Moderate',  value: 50, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',      value: 70, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 15, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:16 AM', sunset: '7:41 PM', bestStart: '6:30 AM', bearActivity: true, campfireRestrictions: false },
  },

  'mount-seymour': {
    weather: { temp: 9, description: 'Partly cloudy, snow above 1100m', wind: '15 km/h NW', precip: '15%', snowLevel: '1100m', visibility: '26 km' },
    forecast: [
      { day: 'Mon', high: 10, low: 3, icon: 1 },
      { day: 'Tue', high: 9,  low: 2, icon: 1 },
      { day: 'Wed', high: 8,  low: 1, icon: 2 },
      { day: 'Thu', high: 11, low: 4, icon: 0 },
      { day: 'Fri', high: 9,  low: 3, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',      value: 12, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 30, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Moderate', value: 58, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',     value: 72, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:20 AM', sunset: '7:38 PM', bestStart: '7:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'diez-vistas': {
    weather: { temp: 13, description: 'Clear and mild, great views', wind: '6 km/h SW', precip: '5%', snowLevel: '1500m', visibility: '42 km' },
    forecast: [
      { day: 'Mon', high: 14, low: 6, icon: 0 },
      { day: 'Tue', high: 13, low: 5, icon: 0 },
      { day: 'Wed', high: 11, low: 4, icon: 1 },
      { day: 'Thu', high: 15, low: 6, icon: 0 },
      { day: 'Fri', high: 13, low: 5, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 44, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'None',     value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate', value: 55, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',     value: 78, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 5,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:18 AM', sunset: '7:40 PM', bestStart: '8:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'widgeon-falls': {
    weather: { temp: 15, description: 'Warm and humid, overcast', wind: '5 km/h S', precip: '20%', snowLevel: '2000m', visibility: '20 km' },
    forecast: [
      { day: 'Mon', high: 16, low: 8, icon: 1 },
      { day: 'Tue', high: 15, low: 7, icon: 1 },
      { day: 'Wed', high: 13, low: 6, icon: 2 },
      { day: 'Thu', high: 17, low: 9, icon: 1 },
      { day: 'Fri', high: 15, low: 8, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'High',    value: 80, color: 'bg-primary' },
      { label: 'Snow on Trail',   level: 'None',    value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate', value: 50, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',    value: 65, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',    value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:15 AM', sunset: '7:42 PM', bestStart: '7:30 AM', bearActivity: true, campfireRestrictions: false },
  },

  'lindeman-lake': {
    weather: { temp: 12, description: 'Sunny with light cloud', wind: '8 km/h W', precip: '10%', snowLevel: '1600m', visibility: '36 km' },
    forecast: [
      { day: 'Mon', high: 13, low: 4, icon: 0 },
      { day: 'Tue', high: 14, low: 5, icon: 0 },
      { day: 'Wed', high: 11, low: 3, icon: 1 },
      { day: 'Thu', high: 15, low: 5, icon: 0 },
      { day: 'Fri', high: 12, low: 4, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 45, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'None',     value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'High',     value: 78, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Good',     value: 74, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 12, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:10 AM', sunset: '7:47 PM', bestStart: '8:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'mount-fromme': {
    weather: { temp: 11, description: 'Mostly clear, mild', wind: '8 km/h SW', precip: '8%', snowLevel: '1300m', visibility: '32 km' },
    forecast: [
      { day: 'Mon', high: 12, low: 4, icon: 0 },
      { day: 'Tue', high: 11, low: 4, icon: 0 },
      { day: 'Wed', high: 10, low: 3, icon: 1 },
      { day: 'Thu', high: 13, low: 5, icon: 0 },
      { day: 'Fri', high: 11, low: 4, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 36, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 18, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',      value: 22, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Good',     value: 76, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 8,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:20 AM', sunset: '7:38 PM', bestStart: '7:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'skookumchuck-narrows': {
    weather: { temp: 14, description: 'Sunny, mild coastal weather', wind: '12 km/h SE', precip: '5%', snowLevel: '2500m', visibility: '45 km' },
    forecast: [
      { day: 'Mon', high: 15, low: 7, icon: 0 },
      { day: 'Tue', high: 14, low: 6, icon: 0 },
      { day: 'Wed', high: 12, low: 5, icon: 1 },
      { day: 'Thu', high: 16, low: 7, icon: 0 },
      { day: 'Fri', high: 14, low: 7, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 18, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',      value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate',  value: 48, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Excellent', value: 92, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 5,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:22 AM', sunset: '7:36 PM', bestStart: '9:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'brew-lake': {
    weather: { temp: 9, description: 'Cloudy with sunny periods', wind: '16 km/h NW', precip: '20%', snowLevel: '1500m', visibility: '24 km' },
    forecast: [
      { day: 'Mon', high: 10, low: 3, icon: 1 },
      { day: 'Tue', high: 9,  low: 2, icon: 2 },
      { day: 'Wed', high: 11, low: 3, icon: 1 },
      { day: 'Thu', high: 12, low: 4, icon: 0 },
      { day: 'Fri', high: 10, low: 3, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Moderate', value: 40, color: 'bg-status-soon' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 32, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',      value: 20, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Good',     value: 68, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Moderate', value: 42, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:14 AM', sunset: '7:43 PM', bestStart: '6:30 AM', bearActivity: true, campfireRestrictions: false },
  },

  // ── WA TRAILS ─────────────────────────────────────────────────────────────

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
      { label: 'Bugs',            level: 'Low',      value: 18, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Minimal',  value: 15, color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate', value: 55, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Good',     value: 80, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:05 AM', sunset: '7:55 PM', bestStart: '7:30 AM', bearActivity: false, campfireRestrictions: true },
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
      { label: 'Bugs',            level: 'Low',       value: 10, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',      value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate',  value: 60, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Excellent', value: 92, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:02 AM', sunset: '7:58 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'lake-22': {
    weather: { temp: 10, description: 'Partly cloudy, breezy', wind: '18 km/h W', precip: '20%', snowLevel: '1600m', visibility: '26 km' },
    forecast: [
      { day: 'Mon', high: 11, low: 4, icon: 1 },
      { day: 'Tue', high: 12, low: 5, icon: 0 },
      { day: 'Wed', high: 10, low: 3, icon: 1 },
      { day: 'Thu', high: 13, low: 5, icon: 0 },
      { day: 'Fri', high: 11, low: 4, icon: 2 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',      value: 14, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 28, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'High',     value: 82, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Good',     value: 75, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',     value: 15, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:08 AM', sunset: '7:50 PM', bestStart: '7:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'heather-maple-pass': {
    weather: { temp: 9, description: 'Mostly clear, cool alpine air', wind: '14 km/h NW', precip: '10%', snowLevel: '1800m', visibility: '40 km' },
    forecast: [
      { day: 'Mon', high: 10, low: 2, icon: 0 },
      { day: 'Tue', high: 11, low: 3, icon: 0 },
      { day: 'Wed', high: 9,  low: 2, icon: 1 },
      { day: 'Thu', high: 12, low: 4, icon: 0 },
      { day: 'Fri', high: 10, low: 3, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 8,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Patchy',    value: 25, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'High',      value: 85, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Excellent', value: 90, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 8,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:03 AM', sunset: '7:57 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'lake-serene': {
    weather: { temp: 10, description: 'Clear with light cloud', wind: '10 km/h SW', precip: '10%', snowLevel: '1700m', visibility: '38 km' },
    forecast: [
      { day: 'Mon', high: 12, low: 4, icon: 0 },
      { day: 'Tue', high: 11, low: 3, icon: 1 },
      { day: 'Wed', high: 10, low: 3, icon: 1 },
      { day: 'Thu', high: 13, low: 5, icon: 0 },
      { day: 'Fri', high: 11, low: 4, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',      value: 12, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Patchy',   value: 30, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'High',     value: 88, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Good',     value: 80, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Moderate', value: 40, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:09 AM', sunset: '7:49 PM', bestStart: '6:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'oyster-dome': {
    weather: { temp: 13, description: 'Sunny, outstanding views', wind: '8 km/h W', precip: '5%', snowLevel: '1800m', visibility: '50 km' },
    forecast: [
      { day: 'Mon', high: 14, low: 5, icon: 0 },
      { day: 'Tue', high: 15, low: 6, icon: 0 },
      { day: 'Wed', high: 12, low: 4, icon: 1 },
      { day: 'Thu', high: 16, low: 6, icon: 0 },
      { day: 'Fri', high: 13, low: 5, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 10, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',      value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate',  value: 52, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Excellent', value: 88, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 5,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:07 AM', sunset: '7:51 PM', bestStart: '8:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'rattlesnake-ledge': {
    weather: { temp: 14, description: 'Clear and warm, busy day expected', wind: '6 km/h SW', precip: '5%', snowLevel: '2000m', visibility: '38 km' },
    forecast: [
      { day: 'Mon', high: 15, low: 6, icon: 0 },
      { day: 'Tue', high: 14, low: 6, icon: 0 },
      { day: 'Wed', high: 12, low: 5, icon: 1 },
      { day: 'Thu', high: 16, low: 7, icon: 0 },
      { day: 'Fri', high: 14, low: 6, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 10, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',      value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'High',      value: 95, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Excellent', value: 92, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 5,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:12 AM', sunset: '7:46 PM', bestStart: '7:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'snow-lake': {
    weather: { temp: 8, description: 'Partly cloudy, remnant snow at trailhead', wind: '12 km/h NW', precip: '15%', snowLevel: '1500m', visibility: '28 km' },
    forecast: [
      { day: 'Mon', high: 9,  low: 2, icon: 1 },
      { day: 'Tue', high: 10, low: 3, icon: 0 },
      { day: 'Wed', high: 8,  low: 1, icon: 2 },
      { day: 'Thu', high: 11, low: 3, icon: 0 },
      { day: 'Fri', high: 9,  low: 2, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 8,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Significant', value: 60, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'High',      value: 85, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Fair',      value: 55, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Moderate',  value: 50, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:11 AM', sunset: '7:47 PM', bestStart: '6:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'mt-pilchuck': {
    weather: { temp: 5, description: 'Cool and partly cloudy, snow above 1400m', wind: '20 km/h NW', precip: '20%', snowLevel: '1400m', visibility: '30 km' },
    forecast: [
      { day: 'Mon', high: 7,  low: 0,  icon: 1 },
      { day: 'Tue', high: 6,  low: -1, icon: 2 },
      { day: 'Wed', high: 8,  low: 1,  icon: 1 },
      { day: 'Thu', high: 10, low: 2,  icon: 0 },
      { day: 'Fri', high: 7,  low: 0,  icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',         value: 5,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Heavy',       value: 82, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Moderate',    value: 48, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Fair',        value: 45, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Easy',        value: 12, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:09 AM', sunset: '7:49 PM', bestStart: '6:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'yellow-aster-butte': {
    weather: { temp: 4, description: 'Clear and cold at elevation', wind: '26 km/h N', precip: '10%', snowLevel: '1300m', visibility: '50 km' },
    forecast: [
      { day: 'Mon', high: 6,  low: -1, icon: 0 },
      { day: 'Tue', high: 5,  low: -2, icon: 1 },
      { day: 'Wed', high: 7,  low: 0,  icon: 0 },
      { day: 'Thu', high: 9,  low: 1,  icon: 0 },
      { day: 'Fri', high: 6,  low: -1, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 5,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Heavy',     value: 88, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',       value: 15, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',      value: 44, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Moderate',  value: 45, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:04 AM', sunset: '7:56 PM', bestStart: '5:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'winchester-mountain': {
    weather: { temp: 3, description: 'Cold and clear, spectacular views', wind: '22 km/h N', precip: '5%', snowLevel: '1200m', visibility: '60 km' },
    forecast: [
      { day: 'Mon', high: 5,  low: -2, icon: 0 },
      { day: 'Tue', high: 4,  low: -3, icon: 0 },
      { day: 'Wed', high: 6,  low: -1, icon: 1 },
      { day: 'Thu', high: 8,  low: 0,  icon: 0 },
      { day: 'Fri', high: 5,  low: -2, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 3,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Heavy',     value: 90, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',       value: 12, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',      value: 40, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Easy',      value: 10, color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:03 AM', sunset: '7:57 PM', bestStart: '5:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'artist-point': {
    weather: { temp: 2, description: 'Cold and mostly clear, very windy', wind: '35 km/h NW', precip: '10%', snowLevel: '1000m', visibility: '40 km' },
    forecast: [
      { day: 'Mon', high: 4,  low: -3, icon: 0 },
      { day: 'Tue', high: 3,  low: -4, icon: 1 },
      { day: 'Wed', high: 5,  low: -2, icon: 0 },
      { day: 'Thu', high: 7,  low: -1, icon: 0 },
      { day: 'Fri', high: 4,  low: -3, icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 2,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Heavy',     value: 95, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'High',      value: 72, color: 'bg-primary' },
      { label: 'Trail Quality',   level: 'Fair',      value: 50, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Easy',      value: 5,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:04 AM', sunset: '7:56 PM', bestStart: '9:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'fragrance-lake': {
    weather: { temp: 13, description: 'Mild coastal sunshine', wind: '9 km/h SE', precip: '5%', snowLevel: '2200m', visibility: '40 km' },
    forecast: [
      { day: 'Mon', high: 14, low: 6, icon: 0 },
      { day: 'Tue', high: 13, low: 5, icon: 0 },
      { day: 'Wed', high: 11, low: 4, icon: 1 },
      { day: 'Thu', high: 15, low: 6, icon: 0 },
      { day: 'Fri', high: 13, low: 6, icon: 0 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 12, color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'None',      value: 0,  color: 'bg-status-open' },
      { label: 'Crowd Level',     level: 'Moderate',  value: 55, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Excellent', value: 88, color: 'bg-status-open' },
      { label: 'Water Crossings', level: 'Easy',      value: 5,  color: 'bg-status-open' },
    ],
    trip: { sunrise: '6:06 AM', sunset: '7:52 PM', bestStart: '8:30 AM', bearActivity: false, campfireRestrictions: false },
  },

  'lake-ann': {
    weather: { temp: 5, description: 'Partly cloudy, cold at lake elevation', wind: '18 km/h NW', precip: '15%', snowLevel: '1500m', visibility: '32 km' },
    forecast: [
      { day: 'Mon', high: 7,  low: 0,  icon: 1 },
      { day: 'Tue', high: 6,  low: -1, icon: 1 },
      { day: 'Wed', high: 8,  low: 1,  icon: 0 },
      { day: 'Thu', high: 10, low: 2,  icon: 0 },
      { day: 'Fri', high: 7,  low: 0,  icon: 1 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',       value: 6,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Heavy',     value: 85, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Moderate',  value: 52, color: 'bg-status-soon' },
      { label: 'Trail Quality',   level: 'Fair',      value: 48, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Moderate',  value: 45, color: 'bg-status-soon' },
    ],
    trip: { sunrise: '6:04 AM', sunset: '7:56 PM', bestStart: '6:00 AM', bearActivity: false, campfireRestrictions: false },
  },

  'gothic-basin': {
    weather: { temp: 4, description: 'Variable cloud, cool alpine conditions', wind: '20 km/h NW', precip: '25%', snowLevel: '1300m', visibility: '22 km' },
    forecast: [
      { day: 'Mon', high: 6,  low: -1, icon: 1 },
      { day: 'Tue', high: 5,  low: -2, icon: 2 },
      { day: 'Wed', high: 7,  low: 0,  icon: 1 },
      { day: 'Thu', high: 9,  low: 1,  icon: 0 },
      { day: 'Fri', high: 6,  low: -1, icon: 2 },
    ],
    trail: [
      { label: 'Bugs',            level: 'Low',         value: 5,  color: 'bg-status-open' },
      { label: 'Snow on Trail',   level: 'Significant', value: 72, color: 'bg-trail-wa-pass' },
      { label: 'Crowd Level',     level: 'Low',         value: 18, color: 'bg-status-open' },
      { label: 'Trail Quality',   level: 'Fair',        value: 45, color: 'bg-status-soon' },
      { label: 'Water Crossings', level: 'Challenging', value: 65, color: 'bg-primary' },
    ],
    trip: { sunrise: '6:10 AM', sunset: '7:48 PM', bestStart: '5:30 AM', bearActivity: false, campfireRestrictions: false },
  },
};

export const trailsWithConditions = new Set(Object.keys(conditionsByTrail));
