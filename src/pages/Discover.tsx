import { useState, useMemo } from 'react';
import { Search, List, Map } from 'lucide-react';
import { trails } from '@/data/trails';
import TrailCard from '@/components/TrailCard';
import MapHero from '@/components/MapHero';

const filters = ['All', 'Under 15km', 'No Permit', 'Dog Friendly', 'Low Elevation', 'Less Crowded', 'BC Only', 'WA Only'];

const Discover = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  const scrollToTrail = (trailId: string) => {
    setMobileView('list');
    setTimeout(() => {
      const el = document.getElementById(`trail-${trailId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const filteredTrails = useMemo(() => trails.filter((trail) => {
    const matchesSearch =
      trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.region.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    switch (activeFilter) {
      case 'Under 15km':   return trail.distanceKm < 15;
      case 'No Permit':    return trail.permitType === 'No Permit';
      case 'Low Elevation':return trail.elevationGainM < 700;
      case 'Dog Friendly': return trail.dogFriendly;
      case 'Less Crowded': return trail.crowdLevel === 'Low';
      case 'BC Only':      return trail.jurisdiction === 'BC';
      case 'WA Only':      return trail.jurisdiction === 'WA';
      default:             return true;
    }
  }), [activeFilter, searchQuery]);

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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40 font-mono transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── Sticky Filter Bar ─────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted border border-border'
                }`}
              >
                {filter}
              </button>
            ))}
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
                <p>No trails match your search.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                  className="text-primary hover:underline text-xs mt-3 inline-block"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTrails.map((trail, i) => (
                  <TrailCard key={trail.id} trail={trail} index={i} />
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
