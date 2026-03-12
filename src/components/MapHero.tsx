import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Trail } from '@/data/trails';

// Fix default marker icons in Leaflet + bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const trailIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapHeroProps {
  trails: Trail[];
  onTrailClick?: (id: string) => void;
}

const FitBounds = ({ trails }: { trails: Trail[] }) => {
  const map = useMap();
  useEffect(() => {
    if (trails.length === 0) return;
    const bounds = L.latLngBounds(trails.map(t => [t.lat, t.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
  }, [trails, map]);
  return null;
};

const MapHero = ({ trails, onTrailClick }: MapHeroProps) => {
  const center: [number, number] = [49.2, -122.5];

  return (
    <div className="relative bg-card border border-border rounded-lg overflow-hidden mb-8 animate-fade-in">
      <div className="h-72 sm:h-96 w-full">
        <MapContainer
          center={center}
          zoom={7}
          className="h-full w-full"
          style={{ background: 'hsl(var(--card))' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
          <FitBounds trails={trails} />
          {trails.map((trail) => (
            <Marker
              key={trail.id}
              position={[trail.lat, trail.lng]}
              icon={trailIcon}
              eventHandlers={{
                click: () => onTrailClick?.(trail.id),
              }}
            >
              <Popup>
                <div className="font-sans">
                  <div className="font-semibold text-sm">{trail.name}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {trail.distanceKm}km · {trail.elevationGainM}m gain · {trail.driveTime}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{trail.region}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-card/90 backdrop-blur-sm border border-border rounded-md px-3 py-2">
        <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Trail Map</div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[10px] font-mono text-muted-foreground">{trails.length} trails</span>
        </div>
      </div>
    </div>
  );
};

export default MapHero;
