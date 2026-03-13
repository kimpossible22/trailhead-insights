import { useEffect, useRef } from 'react';
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
  heightClassName?: string;
}

const center: [number, number] = [49.2, -122.5];

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const popupContent = (trail: Trail) => `
  <div style="font-family: ui-sans-serif, system-ui, sans-serif; min-width: 170px;">
    <div style="font-weight: 600; font-size: 0.875rem; color: hsl(var(--foreground));">${escapeHtml(trail.name)}</div>
    <div style="font-size: 0.75rem; margin-top: 0.25rem; color: hsl(var(--muted-foreground));">
      ${trail.distanceKm}km · ${trail.elevationGainM}m gain · ${escapeHtml(trail.driveTime)}
    </div>
    <div style="font-size: 0.75rem; margin-top: 0.15rem; color: hsl(var(--muted-foreground));">${escapeHtml(trail.region)}</div>
  </div>
`;

const MapHero = ({ trails, onTrailClick, heightClassName = 'h-72 sm:h-96' }: MapHeroProps) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const onTrailClickRef = useRef(onTrailClick);

  useEffect(() => {
    onTrailClickRef.current = onTrailClick;
  }, [onTrailClick]);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;

    const map = L.map(mapElementRef.current, {
      center,
      zoom: 7,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const markerLayer = L.layerGroup().addTo(map);

    mapRef.current = map;
    markerLayerRef.current = markerLayer;

    return () => {
      markerLayer.clearLayers();
      map.remove();
      markerLayerRef.current = null;
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markerLayer = markerLayerRef.current;
    if (!map || !markerLayer) return;

    markerLayer.clearLayers();

    if (trails.length === 0) {
      map.setView(center, 7);
      return;
    }

    const bounds = L.latLngBounds([]);

    trails.forEach((trail) => {
      const marker = L.marker([trail.lat, trail.lng], { icon: trailIcon });
      marker.bindPopup(popupContent(trail));
      marker.on('click', () => onTrailClickRef.current?.(trail.id));
      marker.addTo(markerLayer);
      bounds.extend([trail.lat, trail.lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
    }

    requestAnimationFrame(() => map.invalidateSize());
  }, [trails]);

  return (
    <div className="relative bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
      <div className={`${heightClassName} w-full`}>
        <div
          ref={mapElementRef}
          className="h-full w-full"
          style={{ background: 'hsl(var(--card))' }}
          aria-label="Trail locations map"
        />
      </div>
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

