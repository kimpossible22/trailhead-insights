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

export const trailsWithConditions = new Set(Object.keys(conditionsByTrail));
