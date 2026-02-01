import { useState } from 'react';

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', icon: '📊', label: 'Signals' },
    { id: 'charts', icon: '📈', label: 'Charts' },
    { id: 'trade', icon: '🚀', label: 'Trade' },
    { id: 'portfolio', icon: '💰', label: 'Portfolio' }
  ];

  return (
    <nav className="mobile-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
