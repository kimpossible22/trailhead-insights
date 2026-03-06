export interface Permit {
  id: string;
  name: string;
  agency: string;
  jurisdiction: 'BC' | 'WA';
  status: 'open' | 'soon' | 'closed';
  keyDate: string;
  actionLabel: 'Book Now' | 'Set Alert' | 'Watch';
  url: string;
}

export const permits: Permit[] = [
  {
    id: 'garibaldi-camping',
    name: 'Garibaldi Park Camping',
    agency: 'BC Parks',
    jurisdiction: 'BC',
    status: 'soon',
    keyDate: 'Opens ~Mar 12',
    actionLabel: 'Set Alert',
    url: 'https://bcparks.ca',
  },
  {
    id: 'joffre-day-pass',
    name: 'Joffre Lakes Day Pass',
    agency: 'BC Parks',
    jurisdiction: 'BC',
    status: 'open',
    keyDate: 'Open Now',
    actionLabel: 'Book Now',
    url: 'https://bcparks.ca',
  },
  {
    id: 'stein-valley',
    name: "Stein Valley Nlaka'pamux",
    agency: 'BC Parks',
    jurisdiction: 'BC',
    status: 'soon',
    keyDate: 'Opens ~Apr 1',
    actionLabel: 'Set Alert',
    url: 'https://bcparks.ca',
  },
  {
    id: 'frosty-mountain',
    name: 'Frosty Mountain / Manning Park',
    agency: 'BC Parks',
    jurisdiction: 'BC',
    status: 'open',
    keyDate: 'Opens 3 months before trip',
    actionLabel: 'Book Now',
    url: 'https://bcparks.ca',
  },
  {
    id: 'enchantments',
    name: 'Enchantments Lottery',
    agency: 'USFS / Recreation.gov',
    jurisdiction: 'WA',
    status: 'open',
    keyDate: 'Lottery closed, general sale open',
    actionLabel: 'Book Now',
    url: 'https://recreation.gov',
  },
  {
    id: 'rainier-wilderness',
    name: 'Mt. Rainier Wilderness',
    agency: 'NPS / Recreation.gov',
    jurisdiction: 'WA',
    status: 'open',
    keyDate: 'Peak season reservations available',
    actionLabel: 'Book Now',
    url: 'https://recreation.gov',
  },
  {
    id: 'north-cascades',
    name: 'North Cascades Backcountry',
    agency: 'NPS / Recreation.gov',
    jurisdiction: 'WA',
    status: 'soon',
    keyDate: 'Early access lottery Mar 3–14',
    actionLabel: 'Set Alert',
    url: 'https://recreation.gov',
  },
  {
    id: 'chain-lakes-pass',
    name: 'Chain Lakes / Mt. Baker',
    agency: 'Northwest Forest Pass required',
    jurisdiction: 'WA',
    status: 'open',
    keyDate: 'Open year-round',
    actionLabel: 'Book Now',
    url: 'https://recreation.gov',
  },
];
