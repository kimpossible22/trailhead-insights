import { Mountain } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-primary" />
          <div>
            <span className="font-serif text-xl text-foreground">Trailhead</span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-2 font-mono">
              Backcountry Intelligence for BC + Washington
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {[
            { to: '/', label: 'Discover' },
            { to: '/conditions', label: 'Conditions' },
            { to: '/permits', label: 'Permits' },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Location Pill */}
        <div className="hidden md:flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5 text-xs font-mono text-secondary-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-status-open opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-open"></span>
          </span>
          Surrey, BC · 1–2h radius
        </div>
      </div>
    </header>
  );
};

export default Header;
