// WMO Weather Interpretation Codes → human-readable description + lucide icon name
const WMO_CODES: Record<number, { description: string; icon: string }> = {
  0:  { description: 'Clear sky',       icon: 'Sun' },
  1:  { description: 'Mainly clear',    icon: 'Sun' },
  2:  { description: 'Partly cloudy',   icon: 'CloudSun' },
  3:  { description: 'Overcast',        icon: 'Cloud' },
  45: { description: 'Foggy',           icon: 'CloudFog' },
  48: { description: 'Icy fog',         icon: 'CloudFog' },
  51: { description: 'Light drizzle',   icon: 'CloudDrizzle' },
  53: { description: 'Drizzle',         icon: 'CloudDrizzle' },
  55: { description: 'Heavy drizzle',   icon: 'CloudDrizzle' },
  61: { description: 'Light rain',      icon: 'CloudRain' },
  63: { description: 'Rain',            icon: 'CloudRain' },
  65: { description: 'Heavy rain',      icon: 'CloudRain' },
  71: { description: 'Light snow',      icon: 'CloudSnow' },
  73: { description: 'Snow',            icon: 'CloudSnow' },
  75: { description: 'Heavy snow',      icon: 'CloudSnow' },
  77: { description: 'Snow grains',     icon: 'CloudSnow' },
  80: { description: 'Rain showers',    icon: 'CloudRain' },
  81: { description: 'Rain showers',    icon: 'CloudRain' },
  82: { description: 'Heavy showers',   icon: 'CloudRain' },
  85: { description: 'Snow showers',    icon: 'CloudSnow' },
  86: { description: 'Heavy snow showers', icon: 'CloudSnow' },
  95: { description: 'Thunderstorm',    icon: 'CloudLightning' },
  96: { description: 'Thunderstorm',    icon: 'CloudLightning' },
  99: { description: 'Thunderstorm',    icon: 'CloudLightning' },
};

export interface LiveWeather {
  tempC: number;
  description: string;
  icon: string;         // lucide icon name
  windKph: number;
  precipPct: number;    // precipitation probability %
}

export async function fetchTrailWeather(lat: number, lng: number): Promise<LiveWeather> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,weather_code,windspeed_10m,precipitation_probability` +
    `&timezone=auto&forecast_days=1`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
  const json = await res.json();
  const c = json.current;

  const wmo = WMO_CODES[c.weather_code as number] ?? { description: 'Unknown', icon: 'CloudSun' };

  return {
    tempC: Math.round(c.temperature_2m as number),
    description: wmo.description,
    icon: wmo.icon,
    windKph: Math.round(c.windspeed_10m as number),
    precipPct: Math.round((c.precipitation_probability as number) ?? 0),
  };
}
