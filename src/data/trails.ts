export interface Trail {
  id: string;
  name: string;
  region: string;
  jurisdiction: string;
  distanceKm: number;
  elevationGainM: number;
  driveTime: string;
  permitType: 'Permit Required' | 'No Permit' | 'WA Discover Pass' | 'Northwest Forest Pass';
  bugsLevel: 'Low' | 'Moderate' | 'High';
  dogFriendly: boolean;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  sources: string[];
  elevationProfile: number[];
}

export const trails: Trail[] = [
  {
    id: 'garibaldi-lake',
    name: 'Garibaldi Lake via Taylor Meadows',
    region: 'Garibaldi Provincial Park',
    jurisdiction: 'BC',
    distanceKm: 18.4,
    elevationGainM: 820,
    driveTime: '1h 20m',
    permitType: 'Permit Required',
    bugsLevel: 'Moderate',
    dogFriendly: false,
    crowdLevel: 'High',
    sources: ['AllTrails', 'r/britishcolumbia', 'BC Parks'],
    elevationProfile: [0, 15, 30, 55, 70, 80, 85, 82, 78, 75, 80, 85, 90, 88, 82, 70, 50, 30, 10, 0],
  },
  {
    id: 'joffre-lakes',
    name: 'Joffre Lakes',
    region: 'Joffre Lakes Provincial Park',
    jurisdiction: 'BC',
    distanceKm: 11,
    elevationGainM: 370,
    driveTime: '2h 05m',
    permitType: 'No Permit',
    bugsLevel: 'Low',
    dogFriendly: true,
    crowdLevel: 'High',
    sources: ['AllTrails', 'BC Parks', 'r/vancouverhiking'],
    elevationProfile: [0, 10, 25, 35, 40, 45, 50, 55, 60, 58, 52, 45, 35, 20, 10, 0],
  },
  {
    id: 'panorama-ridge',
    name: 'Panorama Ridge',
    region: 'Garibaldi Provincial Park',
    jurisdiction: 'BC',
    distanceKm: 30,
    elevationGainM: 1525,
    driveTime: '1h 20m',
    permitType: 'Permit Required',
    bugsLevel: 'Low',
    dogFriendly: false,
    crowdLevel: 'Low',
    sources: ['AllTrails', 'r/britishcolumbia', 'BC Parks'],
    elevationProfile: [0, 10, 25, 40, 55, 65, 72, 78, 85, 90, 95, 100, 95, 88, 80, 70, 55, 40, 25, 10, 0],
  },
  {
    id: 'chain-lakes',
    name: 'Chain Lakes Loop',
    region: 'Mt. Baker',
    jurisdiction: 'WA',
    distanceKm: 13,
    elevationGainM: 550,
    driveTime: '1h 50m',
    permitType: 'WA Discover Pass',
    bugsLevel: 'Low',
    dogFriendly: true,
    crowdLevel: 'Moderate',
    sources: ['AllTrails', 'WTA', 'r/PNWhiking'],
    elevationProfile: [0, 20, 35, 50, 60, 65, 60, 55, 50, 55, 60, 55, 40, 25, 10, 0],
  },
  {
    id: 'wedgemount-lake',
    name: 'Wedgemount Lake',
    region: 'Garibaldi Provincial Park',
    jurisdiction: 'BC',
    distanceKm: 14,
    elevationGainM: 1150,
    driveTime: '1h 30m',
    permitType: 'No Permit',
    bugsLevel: 'Moderate',
    dogFriendly: false,
    crowdLevel: 'Low',
    sources: ['AllTrails', 'r/vancouverhiking', 'BC Parks'],
    elevationProfile: [0, 8, 20, 38, 55, 70, 82, 90, 95, 100, 98, 90, 75, 55, 35, 15, 0],
  },
  {
    id: 'maple-pass',
    name: 'Maple Pass Loop',
    region: 'Okanogan National Forest',
    jurisdiction: 'WA',
    distanceKm: 21,
    elevationGainM: 600,
    driveTime: '2h 10m',
    permitType: 'Northwest Forest Pass',
    bugsLevel: 'Low',
    dogFriendly: true,
    crowdLevel: 'Moderate',
    sources: ['AllTrails', 'WTA', 'r/PNWhiking'],
    elevationProfile: [0, 12, 28, 42, 55, 65, 72, 78, 80, 75, 68, 60, 50, 38, 25, 12, 0],
  },
];
