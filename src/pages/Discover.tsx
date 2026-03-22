import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, List, Map, X, SlidersHorizontal } from 'lucide-react';
import { trails } from '@/data/trails';
import TrailCard from '@/components/TrailCard';
import MapHero from '@/components/MapHero';

const FILTER_OPTIONS = [
  'Under 15km',
  'No Permit',
  'Dog Friendly',
  'Low Elevation',
  'Less Crowded',
  'BC Only',
  'WA Only',
] as const;

const SORT_OPTIONS = [
  { value: 'default',  label: 'Featured' },
  { value: 'distance', label: 'Distance ↑' },
  { value: 'elevation',label: 'Elevation ↑' },
  { value: 'drive',    label: 'Drive Time ↑' },
  { value: 'crowd',    label: 'Less Crowded' },
] as const;

const parseDriveMinutes = (t: string) => {
  const h = parseInt(t.match(/(\d+)h/)?.[1] ?? '0', 10);
  const m = parseInt(t.match(/(\d+)m/)?.[1] ?? '0', 10);
  return h * 60 + m;
};

const crowdOrder: Record<string, number> = { Low: 0, Moderate: 1, High: 2 };

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [highlightedTrailId, setHighlightedTrailId] = useState<string | null>(null);

  // URL-driven state
  const searchQuery   = searchParams.get('q') ?? '';
  const activeFilters = useMemo(() => {
    const raw = searchParams.get('filters');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);
  const sortBy = searchParams.get('sort') ?? 'default';

  const setSearch = (q: string) => {
    setSearchParams((prev) => {
      if (q) prev.set('q', q); else prev.delete('q');
      return prev;
    }, { replace: true });
  };

  const toggleFilter = (filter: string) => {
    setSearchParams((prev) => {
      const current = prev.get('filters')?.split(',').filter(Boolean) ?? [];
      const next = current.includes(filter)
        ? current.filter((f) => f !== filter)
        : [...current, filter];
      if (next.length === 0) prev.delete('filters'); else prev.set('filters', next.join(','));
      return prev;
    }, { replace: true });
  };

  const setSort = (value: string) => {
    setSearchParams((prev) => {
      if (value === 'default') prev.delete('sort'); else prev.set('sort', value);
      return prev;
    }, { replace: true });
  };

  const clearAll = () => {
    setSearchParams({}, { replace: true });
  };

  const scrollToTrail = (trailId: string) => {
    setMobileView('list');
    setHighlightedTrailId(trailId);
    setTimeout(() => {
      const el = document.getElementById(`trail-${trailId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
    setTimeout(() => setHighlightedTrailId(null), 2500);
  };

  const filteredTrails = useMemo(() => {
    let result = trails.filter((trail) => {
      const matchesSearch =
        trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trail.region.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      for (const filter of activeFilters) {
        switch (filter) {
          case 'Under 15km':    if (trail.distanceKm >= 15) return false; break;
          case 'No Permit':     if (trail.permitType !== 'No Permit') return false; break;
          case 'Low Elevation': if (trail.elevationGainM >= 700) return false; break;
          case 'Dog Friendly':  if (!trail.dogFriendly) return false; break;
          case 'Less Crowded':  if (trail.crowdLevel !== 'Low') return false; break;
          case 'BC Only':       if (trail.jurisdiction !== 'BC') return false; break;
          case 'WA Only':       if (trail.jurisdiction !== 'WA') return false; break;
        }
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'distance':  result = [...result].sort((a, b) => a.distanceKm - b.distanceKm); break;
      case 'elevation': result = [...result].sort((a, b) => a.elevationGainM - b.elevationGainM); break;
      case 'drive':     result = [...result].sort((a, b) => parseDriveMinutes(a.driveTime) - parseDriveMinutes(b.driveTime)); break;
      case 'crowd':     result = [...result].sort((a, b) => crowdOrder[a.crowdLevel] - crowdOrder[b.crowdLevel]); break;
    }

    return result;
  }, [activeFilters, searchQuery, sortBy]);

  const hasActiveFilters = searchQuery || activeFilters.length > 0 || sortBy !== 'default';

  return (
    <div>
      {/* ── Hero / Search ─────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-2xl px-4 py-10 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-3">
            BC + Washington
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2 leading-tight">
            Find your next trail
          </h1>
          <p className="text-sm text-muted-foreground font-mono mb-7">
            {trails.length} trails tracked · permits, conditions &amp; crowd intel
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search trails or regions…"
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-11 pr-10 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40 font-mono transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Sticky Filter + Sort Bar ───────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {/* Filter pills */}
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilters.includes(filter);
              return (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary text-secondary-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {isActive && <span className="mr-1">✓</span>}
                  {filter}
                </button>
              );
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-border flex-shrink-0 mx-1" />

            {/* Sort dropdown */}
            <div className="flex-shrink-0 relative flex items-center gap-1.5">
              <SlidersHorizontal className="h-3 w-3 text-muted-foreground pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSort(e.target.value)}
                className={`text-xs font-mono rounded-full px-2.5 py-1.5 border appearance-none cursor-pointer focus:outline-none transition-all ${
                  sortBy !== 'default'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary text-secondary-foreground border-border hover:bg-muted'
                }`}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Clear all */}
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono text-muted-foreground hover:text-foreground border border-dashed border-border hover:border-foreground/30 transition-all"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-6">

        {/* Mobile: list / map toggle + result count */}
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <span className="text-xs font-mono text-muted-foreground">
            {filteredTrails.length} trail{filteredTrails.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center bg-secondary rounded-lg p-0.5">
            {(['list', 'map'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setMobileView(v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors capitalize ${
                  mobileView === v
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {v === 'list' ? <List className="h-3.5 w-3.5" /> : <Map className="h-3.5 w-3.5" />}
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile map view */}
        {mobileView === 'map' && (
          <div className="lg:hidden">
            <MapHero trails={filteredTrails} onTrailClick={scrollToTrail} />
          </div>
        )}

        {/* Desktop split + mobile list */}
        <div className={`lg:grid lg:grid-cols-[1fr_400px] lg:gap-6 ${mobileView === 'map' ? 'hidden lg:grid' : ''}`}>

          {/* Trail cards */}
          <div>
            {/* Desktop result count */}
            <p className="hidden lg:block text-xs font-mono text-muted-foreground mb-5">
              {filteredTrails.length} trail{filteredTrails.length !== 1 ? 's' : ''} found
            </p>

            {filteredTrails.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground font-mono text-sm">
                <div className="text-3xl mb-3 opacity-30">⌀</div>
                <p>No trails match your filters.</p>
                <button
                  onClick={clearAll}
                  className="text-primary hover:underline text-xs mt-3 inline-block"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTrails.map((trail, i) => (
                  <TrailCard
                    key={trail.id}
                    trail={trail}
                    index={i}
                    highlighted={highlightedTrailId === trail.id}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sticky map — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <MapHero
                trails={filteredTrails}
                onTrailClick={scrollToTrail}
                heightClassName="h-[calc(100vh-10rem)]"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Discover;
