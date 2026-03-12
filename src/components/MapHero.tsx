import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Trail } from '@/data/trails';

// Fix default marker icons in Leaflet + bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
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

const MapHero = ({ trails, onTrailClick }: MapHeroProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [49.2, -122.5],
      zoom: 7,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const markerLayer = L.layerGroup().addTo(map);
    mapRef.current = map;
    markersLayerRef.current = markerLayer;

    return () => {
      markerLayer.clearLayers();
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markerLayer = markersLayerRef.current;
    if (!map || !markerLayer) return;

    markerLayer.clearLayers();

    if (trails.length === 0) {
      map.setView([49.2, -122.5], 7);
      return;
    }

    const bounds = L.latLngBounds([]);

    trails.forEach((trail) => {
      const marker = L.marker([trail.lat, trail.lng], { icon: trailIcon });
      marker.on('click', () => onTrailClick?.(trail.id));
      marker.bindPopup(
        `<div>
          <div><strong>${trail.name}</strong></div>
          <div>${trail.distanceKm}km · ${trail.elevationGainM}m gain · ${trail.driveTime}</div>
          <div>${trail.region}</div>
        </div>`
      );
      marker.addTo(markerLayer);
      bounds.extend([trail.lat, trail.lng]);
    });

    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
  }, [trails, onTrailClick]);

  return (
    <div className="relative bg-card border border-border rounded-lg overflow-hidden mb-8 animate-fade-in">
      <div ref={mapContainerRef} className="h-72 sm:h-96 w-full" />

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
