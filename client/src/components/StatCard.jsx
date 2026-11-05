import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'var(--primary-600)', subtext }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ color: color, backgroundColor: `${color}15` }}>
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
        {subtext && (
          <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '0.2rem' }}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}

