import React, { useState } from 'react';
import { Laptop, Server, Database, Activity, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ArchitectureDiagram() {
  const [activeTier, setActiveTier] = useState('all');

  const tiers = {
    client: {
      name: 'Presentation Tier (Tier 1)',
      component: 'React.js + Vite Single Page Application (SPA)',
      cloudEquivalent: 'Amazon S3 (Static Website Hosting) + Amazon CloudFront (CDN)',
      protocol: 'HTTPS / JSON REST Calls',
      description: 'Runs directly in the student/faculty web browser (Google Chrome). Provides responsive UI, question rendering, client validation, and real-time score display.',
      responsibilities: [
        'User registration & login forms',
        'Dynamic quiz question navigation & timer',
        'Instant result summary visualizer',
        'Cloud concepts academic knowledge portal'
      ]
    },
    server: {
      name: 'Application / Logic Tier (Tier 2)',
      component: 'Node.js + Express.js REST API Server',
      cloudEquivalent: 'Amazon Elastic Compute Cloud (EC2) Virtual Machine',
      protocol: 'TCP Port 5000 / Internal SQL Driver (mysql2)',
      description: 'Handles server-side business logic, JWT authentication, role authorization, and score evaluation. Crucially guards correct answers from being exposed before submission.',
      responsibilities: [
        'JWT token generation and verification',
        'Bcrypt password hashing (10 salt rounds)',
        'Server-side answer grading (cheat prevention)',
        'Faculty quiz CRUD & status publishing endpoints'
      ]
    },
    database: {
      name: 'Data Persistence Tier (Tier 3)',
      component: 'MySQL Relational Database Management System (RDBMS)',
      cloudEquivalent: 'Amazon Relational Database Service (RDS - MySQL Multi-AZ)',
      protocol: 'TCP Port 3306 (SQL Connection Pool)',
      description: 'Stores relational tables for users, quizzes, questions, and attempt records with primary/foreign keys and referential integrity constraints.',
      responsibilities: [
        'Users table with unique email indices',
        'Quizzes & questions table with cascading deletes',
        'Results table recording student scores & timestamps',
        'Relational foreign key integrity constraints'
      ]
    }
  };

  return (
    <div className="card" style={{ padding: '2rem', backgroundColor: '#ffffff', border: '1px solid var(--slate-200)' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
          Academic Architecture Diagram
        </span>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--slate-900)' }}>
          Three-Tier Cloud Web Architecture
        </h3>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', maxWidth: '650px', margin: '0.35rem auto 0' }}>
          Interactive visualization showing how the Presentation, Logic, and Data layers communicate securely in modern cloud computing systems.
        </p>
      </div>

      {/* Tier Selector Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTier('all')}
          className={`btn btn-sm ${activeTier === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          View Full Pipeline
        </button>
        <button
          onClick={() => setActiveTier('client')}
          className={`btn btn-sm ${activeTier === 'client' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Tier 1: Presentation (React)
        </button>
        <button
          onClick={() => setActiveTier('server')}
          className={`btn btn-sm ${activeTier === 'server' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Tier 2: Logic (Express)
        </button>
        <button
          onClick={() => setActiveTier('database')}
          className={`btn btn-sm ${activeTier === 'database' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Tier 3: Database (MySQL)
        </button>
      </div>

      {/* Visual Pipeline Flow */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch',
          position: 'relative',
          marginBottom: '2rem'
        }}
      >
        {/* Tier 1 Box */}
        <div
          onClick={() => setActiveTier('client')}
          style={{
            cursor: 'pointer',
            border: activeTier === 'client' || activeTier === 'all' ? '2px solid var(--primary-500)' : '1px solid var(--slate-200)',
            backgroundColor: activeTier === 'client' ? 'var(--primary-50)' : 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            transition: 'all 0.2s ease',
            boxShadow: activeTier === 'client' ? 'var(--shadow-md)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#2563eb',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Laptop size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase' }}>
                Tier 1: Presentation
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--slate-900)' }}>
                React.js + Vite
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
            Browser client rendered in Google Chrome. Dispatches secure HTTP REST requests.
          </p>
          <div style={{ fontSize: '0.75rem', background: '#e0e7ff', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', color: '#3730a3', fontWeight: 600 }}>
            ☁️ Cloud Equivalent: Amazon S3 + CloudFront
          </div>
        </div>

        {/* Tier 2 Box */}
        <div
          onClick={() => setActiveTier('server')}
          style={{
            cursor: 'pointer',
            border: activeTier === 'server' || activeTier === 'all' ? '2px solid #0d9488' : '1px solid var(--slate-200)',
            backgroundColor: activeTier === 'server' ? '#f0fdfa' : 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            transition: 'all 0.2s ease',
            boxShadow: activeTier === 'server' ? 'var(--shadow-md)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#0d9488',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Server size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d9488', textTransform: 'uppercase' }}>
                Tier 2: Business Logic
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--slate-900)' }}>
                Node.js + Express API
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
            Middleware authentication, score evaluation, input validation, and business logic processing.
          </p>
          <div style={{ fontSize: '0.75rem', background: '#ccfbf1', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', color: '#115e59', fontWeight: 600 }}>
            ☁️ Cloud Equivalent: Amazon EC2 VM Instance
          </div>
        </div>

        {/* Tier 3 Box */}
        <div
          onClick={() => setActiveTier('database')}
          style={{
            cursor: 'pointer',
            border: activeTier === 'database' || activeTier === 'all' ? '2px solid #0284c7' : '1px solid var(--slate-200)',
            backgroundColor: activeTier === 'database' ? '#f0f9ff' : 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            transition: 'all 0.2s ease',
            boxShadow: activeTier === 'database' ? 'var(--shadow-md)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#0284c7',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Database size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>
                Tier 3: Data Tier
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--slate-900)' }}>
                MySQL Relational DB
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
            ACID-compliant relational storage storing users, quizzes, questions, and attempt records.
          </p>
          <div style={{ fontSize: '0.75rem', background: '#e0f2fe', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', color: '#0369a1', fontWeight: 600 }}>
            ☁️ Cloud Equivalent: Amazon RDS for MySQL
          </div>
        </div>
      </div>

      {/* CloudWatch Telemetry Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.9rem 1.25rem',
        backgroundColor: '#f8fafc',
        border: '1px dashed #cbd5e1',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.75rem'
      }}>
        <Activity size={20} color="#f59e0b" />
        <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
          <strong>Cross-Cutting Cloud Telemetry:</strong> In an AWS environment, <strong>Amazon CloudWatch</strong> collects system metrics, CPU utilization, network I/O, error logs, and sets alarms across all three tiers.
        </div>
      </div>

      {/* Detail Panel */}
      {activeTier !== 'all' && (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--slate-300)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem'
        }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            {tiers[activeTier].name} — Details
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
            {tiers[activeTier].description}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {tiers[activeTier].responsibilities.map((resp, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                <CheckCircle2 size={16} color="var(--success-600)" />
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

