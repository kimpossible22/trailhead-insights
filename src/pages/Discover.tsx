import { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { trails } from '@/data/trails';
import TrailCard from '@/components/TrailCard';
import MapHero from '@/components/MapHero';

const filters = ['All', 'Under 15km', 'No Permit', 'Dog Friendly', 'Low Elevation', 'Less Crowded'];

const Discover = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrails = trails.filter((trail) => {
    const matchesSearch = trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.region.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (activeFilter) {
      case 'Under 15km': return trail.distanceKm < 15;
      case 'No Permit': return trail.permitType === 'No Permit';
      case 'Low Elevation': return trail.elevationGainM < 700;
      default: return true;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search */}
      <div className="relative mb-6 animate-fade-in">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search trails, regions, or vibes…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-card border border-border rounded-lg pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
              activeFilter === filter
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Trail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTrails.map((trail, i) => (
          <TrailCard key={trail.id} trail={trail} index={i} />
        ))}
      </div>

      {filteredTrails.length === 0 && (
        <div className="text-center py-16 text-muted-foreground font-mono text-sm">
          No trails match your search.
        </div>
      )}
    </div>
  );
};

export default Discover;
