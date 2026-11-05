import React from 'react';
import { Cloud, Server, Database, Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--white)',
      borderTop: '1px solid var(--slate-200)',
      padding: '2rem 1.5rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--slate-800)' }}>
            <Cloud size={20} color="var(--primary-600)" />
            <span>CLOUD-BASED ONLINE QUIZ SYSTEM</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
            5th-Semester Cloud Computing Academic Project • Three-Tier Architecture
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--slate-600)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Layers size={14} color="var(--primary-600)" />
            <span>Frontend: React + Vite</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Server size={14} color="var(--accent-teal)" />
            <span>Backend: Node + Express</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Database size={14} color="var(--accent-cyan)" />
            <span>Database: MySQL</span>
          </div>
        </div>

        <div style={{ fontSize: '0.775rem', color: 'var(--slate-400)' }}>
          Local Academic Deployment Environment • Safe for College Demonstrations
        </div>
      </div>
    </footer>
  );
}

