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

// Custom coloured dot marker
function makeIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <circle cx="11" cy="11" r="7" fill="${color}" stroke="white" stroke-width="2.5"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
  });
}

const PERMIT_COLORS: Record<string, string> = {
  'Permit Required':      '#e05f5f',
  'No Permit':            '#4caf82',
  'WA Discover Pass':     '#7b9fd4',
  'Northwest Forest Pass':'#7b9fd4',
};

interface MapHeroProps {
  trails: Trail[];
  onTrailClick?: (id: string) => void;
  heightClassName?: string;
}

const center: [number, number] = [49.2, -122.5];

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const permitBadgeStyle: Record<string, string> = {
  'Permit Required':      'color:#e05f5f;background:rgba(224,95,95,0.12);border:1px solid rgba(224,95,95,0.3)',
  'No Permit':            'color:#4caf82;background:rgba(76,175,130,0.12);border:1px solid rgba(76,175,130,0.3)',
  'WA Discover Pass':     'color:#7b9fd4;background:rgba(123,159,212,0.12);border:1px solid rgba(123,159,212,0.3)',
  'Northwest Forest Pass':'color:#7b9fd4;background:rgba(123,159,212,0.12);border:1px solid rgba(123,159,212,0.3)',
};

const crowdColor: Record<string, string> = {
  Low: '#4caf82', Moderate: '#e8a84c', High: '#e05f5f',
};

function popupContent(trail: Trail): string {
  const dog = trail.dogFriendly
    ? `<span style="color:#4caf82">🐕 Dogs OK</span>`
    : `<span style="color:#888">No dogs</span>`;
  const crowd = `<span style="color:${crowdColor[trail.crowdLevel]}">${esc(trail.crowdLevel)} crowds</span>`;

  return `
<div style="font-family:ui-sans-serif,system-ui,sans-serif;width:240px;line-height:1.4">
  <div style="font-weight:700;font-size:0.9rem;margin-bottom:2px">${esc(trail.name)}</div>
  <div style="font-size:0.7rem;color:#888;margin-bottom:8px">${esc(trail.region)} · ${trail.jurisdiction}</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px">
    <div style="background:rgba(128,128,128,0.08);border-radius:6px;padding:6px 8px">
      <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:.05em;color:#888;margin-bottom:2px">Distance</div>
      <div style="font-size:0.85rem;font-weight:600;font-family:ui-monospace,monospace">${trail.distanceKm} km</div>
    </div>
    <div style="background:rgba(128,128,128,0.08);border-radius:6px;padding:6px 8px">
      <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:.05em;color:#888;margin-bottom:2px">Elevation</div>
      <div style="font-size:0.85rem;font-weight:600;font-family:ui-monospace,monospace">${trail.elevationGainM} m↑</div>
    </div>
    <div style="background:rgba(128,128,128,0.08);border-radius:6px;padding:6px 8px">
      <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:.05em;color:#888;margin-bottom:2px">Drive</div>
      <div style="font-size:0.85rem;font-weight:600;font-family:ui-monospace,monospace">${esc(trail.driveTime)}</div>
    </div>
    <div style="background:rgba(128,128,128,0.08);border-radius:6px;padding:6px 8px">
      <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:.05em;color:#888;margin-bottom:2px">Bugs</div>
      <div style="font-size:0.85rem;font-weight:600;font-family:ui-monospace,monospace">${esc(trail.bugsLevel)}</div>
    </div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:0.72rem">
    ${dog} · ${crowd}
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between">
    <span style="font-size:0.65rem;font-family:ui-monospace,monospace;padding:3px 8px;border-radius:999px;${permitBadgeStyle[trail.permitType]}">${esc(trail.permitType)}</span>
    <a href="/trail/${trail.id}" style="font-size:0.72rem;color:#4caf82;text-decoration:none;font-family:ui-monospace,monospace;font-weight:600">View details →</a>
  </div>
</div>`;
}

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
      const icon = makeIcon(PERMIT_COLORS[trail.permitType] ?? '#4caf82');
      const marker = L.marker([trail.lat, trail.lng], { icon });

      marker.bindPopup(popupContent(trail), {
        maxWidth: 260,
        className: 'trail-popup',
      });

      // Scroll list to card on click; popup opens automatically
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

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-card/90 backdrop-blur-sm border border-border rounded-md px-3 py-2">
        <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Permit type</div>
        {[
          { label: 'No Permit',    color: '#4caf82' },
          { label: 'Permit Req.',  color: '#e05f5f' },
          { label: 'Pass Req.',    color: '#7b9fd4' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5 mb-0.5">
            <svg width="10" height="10"><circle cx="5" cy="5" r="4" fill={color} /></svg>
            <span className="text-[9px] font-mono text-muted-foreground">{label}</span>
          </div>
        ))}
        <div className="mt-1.5 pt-1.5 border-t border-border text-[9px] font-mono text-muted-foreground">
          {trails.length} trails
        </div>
      </div>
    </div>
  );
};

export default MapHero;
