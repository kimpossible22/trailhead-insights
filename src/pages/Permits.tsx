import { useState } from 'react';
import { permits } from '@/data/permits';
import { Bell, ExternalLink, Mail } from 'lucide-react';

const statusStyles = {
  open: 'bg-status-open',
  soon: 'bg-status-soon',
  closed: 'bg-status-closed',
};

const actionStyles = {
  'Book Now': 'bg-primary text-primary-foreground hover:bg-primary/90',
  'Set Alert': 'bg-secondary text-secondary-foreground hover:bg-muted border border-border',
  'Watch': 'bg-secondary text-muted-foreground hover:bg-muted border border-border',
};

const Permits = () => {
  const [activeTab, setActiveTab] = useState<'BC' | 'WA'>('BC');
  const [alertName, setAlertName] = useState('');
  const [alertEmail, setAlertEmail] = useState('');
  const [selectedPermits, setSelectedPermits] = useState<string[]>([]);

  const filteredPermits = permits.filter((p) => p.jurisdiction === activeTab);

  const togglePermit = (id: string) => {
    setSelectedPermits((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="font-serif text-2xl text-foreground mb-2 animate-fade-in">Permit Tracker</h2>
      <p className="text-sm text-muted-foreground font-mono mb-6 animate-fade-in">2026 permit windows for BC and Washington</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-1 w-fit animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {(['BC', 'WA'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-mono transition-colors ${
              activeTab === tab
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'BC' ? 'BC Parks' : 'Washington'}
          </button>
        ))}
      </div>

      {/* Permit List */}
      <div className="space-y-3 mb-12">
        {filteredPermits.map((permit, i) => (
          <div
            key={permit.id}
            className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in"
            style={{ animationDelay: `${0.15 + i * 0.05}s`, animationFillMode: 'forwards', opacity: 0 }}
          >
            <div className="flex items-start gap-3">
              <span className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${statusStyles[permit.status]}`} />
              <div>
                <div className="font-serif text-base text-foreground">{permit.name}</div>
                <div className="text-xs font-mono text-muted-foreground">{permit.agency}</div>
                <div className="text-xs font-mono text-muted-foreground mt-0.5">{permit.keyDate}</div>
              </div>
            </div>
            <a
              href={permit.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors flex-shrink-0 ${actionStyles[permit.actionLabel]}`}
            >
              {permit.actionLabel === 'Book Now' && <ExternalLink className="h-3 w-3" />}
              {permit.actionLabel === 'Set Alert' && <Bell className="h-3 w-3" />}
              {permit.actionLabel}
            </a>
          </div>
        ))}
      </div>

      {/* Email Capture */}
      <div className="bg-card border border-border rounded-lg p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg text-foreground">Get notified when permit windows open</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={alertName}
            onChange={(e) => setAlertName(e.target.value)}
            className="bg-secondary border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <input
            type="email"
            placeholder="Your email"
            value={alertEmail}
            onChange={(e) => setAlertEmail(e.target.value)}
            className="bg-secondary border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2 mb-4">
          {permits.map((permit) => (
            <label key={permit.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedPermits.includes(permit.id)}
                onChange={() => togglePermit(permit.id)}
                className="rounded border-border bg-secondary text-primary focus:ring-primary/50"
              />
              <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                {permit.name} <span className="text-xs">({permit.jurisdiction})</span>
              </span>
            </label>
          ))}
        </div>

        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-mono font-medium hover:bg-primary/90 transition-colors">
          Set My Alerts
        </button>
      </div>
    </div>
  );
};

export default Permits;
