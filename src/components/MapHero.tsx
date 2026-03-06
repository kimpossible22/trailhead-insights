import { trails } from '@/data/trails';
import { MapPin } from 'lucide-react';

// Approximate positions for trails relative to Surrey/Vancouver area
const trailPositions: Record<string, { x: number; y: number }> = {
  'garibaldi-lake': { x: 42, y: 28 },
  'joffre-lakes': { x: 55, y: 20 },
  'panorama-ridge': { x: 43, y: 26 },
  'chain-lakes': { x: 38, y: 72 },
  'wedgemount-lake': { x: 48, y: 22 },
  'maple-pass': { x: 62, y: 58 },
};

const homeBase = { x: 28, y: 52 }; // Surrey, BC

const MapHero = ({ onTrailClick }: { onTrailClick?: (id: string) => void }) => {
  return (
    <div className="relative bg-card border border-border rounded-lg overflow-hidden mb-8 animate-fade-in">
      {/* Map Area */}
      <div className="relative h-64 sm:h-80 w-full">
        {/* Topo-style SVG background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Topo contour lines */}
          {[15, 25, 35, 45, 55, 65, 75].map((r, i) => (
            <ellipse
              key={i}
              cx={45}
              cy={45}
              rx={r * 0.6}
              ry={r * 0.4}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="0.3"
              opacity={0.4 + i * 0.05}
              transform={`rotate(${-15 + i * 5} 45 45)`}
            />
          ))}
          {[20, 30, 50, 60, 70].map((r, i) => (
            <ellipse
              key={`b-${i}`}
              cx={60}
              cy={60}
              rx={r * 0.5}
              ry={r * 0.35}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="0.2"
              opacity={0.3}
              transform={`rotate(${10 + i * 8} 60 60)`}
            />
          ))}

          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map((v) => (
            <line key={`h-${v}`} x1={0} y1={v} x2={100} y2={v} stroke="hsl(var(--border))" strokeWidth="0.15" opacity="0.3" />
          ))}
          {[0, 20, 40, 60, 80, 100].map((v) => (
            <line key={`v-${v}`} x1={v} y1={0} x2={v} y2={100} stroke="hsl(var(--border))" strokeWidth="0.15" opacity="0.3" />
          ))}

          {/* Dashed drive radius circles from home */}
          <circle cx={homeBase.x} cy={homeBase.y} r={18} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" strokeDasharray="1.5 1" opacity="0.25" />
          <circle cx={homeBase.x} cy={homeBase.y} r={32} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" strokeDasharray="1.5 1" opacity="0.15" />

          {/* Connection lines from home to trails */}
          {trails.map((trail) => {
            const pos = trailPositions[trail.id];
            if (!pos) return null;
            return (
              <line
                key={trail.id}
                x1={homeBase.x}
                y1={homeBase.y}
                x2={pos.x}
                y2={pos.y}
                stroke="hsl(var(--primary))"
                strokeWidth="0.25"
                strokeDasharray="1 1"
                opacity="0.2"
              />
            );
          })}
        </svg>

        {/* Home base marker */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{ left: `${homeBase.x}%`, top: `${homeBase.y}%`, transform: 'translate(-50%, -100%)' }}
        >
          <div className="bg-primary/20 border border-primary/40 rounded-full px-2 py-0.5 text-[9px] font-mono text-primary mb-1 whitespace-nowrap">
            Surrey, BC
          </div>
          <div className="w-3 h-3 bg-primary rounded-full border-2 border-card shadow-lg" />
        </div>

        {/* Trail markers */}
        {trails.map((trail, i) => {
          const pos = trailPositions[trail.id];
          if (!pos) return null;
          return (
            <button
              key={trail.id}
              onClick={() => onTrailClick?.(trail.id)}
              className="absolute z-10 group"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -100%)',
                animationDelay: `${0.3 + i * 0.1}s`,
              }}
            >
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-md px-2 py-1 mb-1 whitespace-nowrap pointer-events-none shadow-lg">
                <div className="text-xs font-serif text-foreground">{trail.name}</div>
                <div className="text-[9px] font-mono text-muted-foreground">
                  {trail.distanceKm}km · {trail.elevationGainM}m · {trail.driveTime}
                </div>
              </div>
              <MapPin className="h-5 w-5 text-primary drop-shadow-md group-hover:scale-125 transition-transform" />
            </button>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm border border-border rounded-md px-3 py-2">
          <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Nearby Trails</div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-mono text-muted-foreground">{trails.length} trails</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 border-t border-dashed border-primary/40" />
              <span className="text-[10px] font-mono text-muted-foreground">1–2h drive</span>
            </div>
          </div>
        </div>

        {/* Region labels */}
        <div className="absolute top-4 right-4 text-right">
          <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">BC · WA</div>
          <div className="text-[9px] font-mono text-muted-foreground/30">49°N · 122°W</div>
        </div>
      </div>
    </div>
  );
};

export default MapHero;
