import type { Trail } from '@/data/trails';
import type { TrailConditions } from '@/data/conditions';

// WMO weather interpretation codes → human-readable description
const WMO_DESCRIPTIONS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Icy fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Heavy drizzle',
  61: 'Light rain',    63: 'Moderate rain',    65: 'Heavy rain',
  71: 'Light snow',   73: 'Moderate snow',    75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers', 81: 'Moderate showers', 82: 'Heavy showers',
  85: 'Snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Map WMO code to icon index used in weatherIcons array in TrailDetail (0=Sun, 1=Cloud, 2=Rain/Cloud, 3=Sun, 4=Cloud)
function wmoToIcon(code: number): number {
  if (code <= 1) return 0;       // clear
  if (code <= 3) return 1;       // partly cloudy / overcast
  if (code >= 51 && code <= 67) return 2;  // drizzle / rain
  if (code >= 71 && code <= 86) return 2;  // snow
  if (code >= 80 && code <= 82) return 4;  // showers
  if (code >= 95) return 2;      // thunderstorm
  return 1;
}

function estimateSnowLine(elevationGainM: number, tempC: number, month: number): string {
  // Rough snow line estimation: 0°C isotherm ≈ 125m per °C above freezing
  if (tempC <= 0) return `${Math.round(elevationGainM * 0.3 / 100) * 100}m (at trailhead)`;
  const snowLineM = Math.round((tempC * 125) / 100) * 100;
  if (snowLineM > elevationGainM + 1200) return 'None forecast';
  // Winter months: more conservative
  if (month <= 2 || month >= 10) return `~${snowLineM}m`;
  return snowLineM < 800 ? `~${snowLineM}m` : 'None forecast';
}

function estimateSunriseSunset(lat: number, month: number): { sunrise: string; sunset: string } {
  // Approximate sunrise/sunset for Vancouver/NW area by month
  const summer = month >= 4 && month <= 8;
  const spring = month === 3 || month === 9;
  if (lat >= 49) {
    if (summer) return { sunrise: '5:30 AM', sunset: '9:00 PM' };
    if (spring) return { sunrise: '6:30 AM', sunset: '7:45 PM' };
    return { sunrise: '7:45 AM', sunset: '4:45 PM' };
  }
  if (summer) return { sunrise: '5:45 AM', sunset: '8:45 PM' };
  if (spring) return { sunrise: '6:45 AM', sunset: '7:30 PM' };
  return { sunrise: '7:30 AM', sunset: '4:45 PM' };
}

export type WeatherFetchResult =
  | { ok: true; data: TrailConditions }
  | { ok: false; error: string };

export async function fetchLiveConditions(trail: Trail): Promise<WeatherFetchResult> {
  try {
    const params = new URLSearchParams({
      latitude: trail.lat.toString(),
      longitude: trail.lng.toString(),
      current: 'temperature_2m,weather_code,windspeed_10m,winddirection_10m,precipitation_probability,snowfall,visibility',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      wind_speed_unit: 'kmh',
      timezone: 'auto',
      forecast_days: '5',
    });

    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const cur = json.current;
    const daily = json.daily;
    const month = new Date().getMonth();

    const temp = Math.round(cur.temperature_2m);
    const windKmh = Math.round(cur.windspeed_10m);
    const windDir = windDirectionLabel(cur.winddirection_10m);
    const precipPct = Math.round(cur.precipitation_probability ?? 0);
    const visKm = cur.visibility != null ? `${Math.round(cur.visibility / 1000)} km` : '20+ km';
    const description = WMO_DESCRIPTIONS[cur.weather_code as number] ?? 'Variable conditions';
    const snowLevel = estimateSnowLine(trail.elevationGainM, temp, month);

    const forecast = (daily.time as string[]).slice(0, 5).map((dateStr, i) => {
      const d = new Date(dateStr + 'T12:00:00');
      return {
        day: DAYS[d.getDay()],
        high: Math.round(daily.temperature_2m_max[i]),
        low: Math.round(daily.temperature_2m_min[i]),
        icon: wmoToIcon(daily.weather_code[i]),
      };
    });

    // Snow on trail: estimate based on season, elevation, and current temp
    const isWinter = month <= 2 || month >= 10;
    const isHighElev = trail.elevationGainM > 900;
    const snowOnTrailValue = isWinter && isHighElev ? 65
      : isWinter ? 30
      : isHighElev && temp < 5 ? 40
      : 5;
    const snowOnTrailLabel = snowOnTrailValue > 55 ? 'Significant'
      : snowOnTrailValue > 30 ? 'Patchy'
      : snowOnTrailValue > 15 ? 'Light'
      : 'Clear';

    const crowdValue = trail.crowdLevel === 'High' ? 85 : trail.crowdLevel === 'Moderate' ? 55 : 25;
    const bugValue = trail.bugsLevel === 'High' ? 80 : trail.bugsLevel === 'Moderate' ? 50 : 20;

    const trailQuality = precipPct < 20 ? { level: 'Good', value: 78 }
      : precipPct < 50 ? { level: 'Fair', value: 50 }
      : { level: 'Poor', value: 25 };

    const { sunrise, sunset } = estimateSunriseSunset(trail.lat, month);

    const conditions: TrailConditions = {
      weather: {
        temp,
        description,
        wind: `${windKmh} km/h ${windDir}`,
        precip: `${precipPct}%`,
        snowLevel,
        visibility: visKm,
      },
      forecast,
      trail: [
        { label: 'Bugs',            level: trail.bugsLevel,       value: bugValue,            color: 'bg-status-soon' },
        { label: 'Snow on Trail',   level: snowOnTrailLabel,      value: snowOnTrailValue,    color: 'bg-trail-wa-pass' },
        { label: 'Crowd Level',     level: trail.crowdLevel,      value: crowdValue,          color: 'bg-primary' },
        { label: 'Trail Quality',   level: trailQuality.level,    value: trailQuality.value,  color: 'bg-status-open' },
        { label: 'Water Crossings', level: 'Easy',                value: 20,                  color: 'bg-status-open' },
      ],
      trip: {
        sunrise,
        sunset,
        bestStart: recommendBestStart(sunrise, trail.distanceKm),
        bearActivity: trail.jurisdiction === 'BC' && (month >= 4 && month <= 10),
        campfireRestrictions: isWinter ? false : precipPct < 15,
      },
    };

    return { ok: true, data: conditions };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

function windDirectionLabel(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

function recommendBestStart(sunrise: string, distanceKm: number): string {
  // For longer hikes, start earlier
  const [time, ampm] = sunrise.split(' ');
  const [h, m] = time.split(':').map(Number);
  let startH = h;
  if (distanceKm > 20) startH = Math.max(5, h - 1);
  else if (distanceKm > 12) startH = h;
  else startH = h + 1;
  const startM = m === 30 ? '00' : '30';
  return `${startH}:${startM} ${ampm}`;
}
