import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  CheckCircle,
  ShieldCheck,
  Zap,
  BookOpen,
  Users,
  Server,
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { authService } from '../services/auth';

export default function LandingPage() {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 65px)' }}>
      {/* Hero Section */}
      <section className="hero">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>5th-Semester Cloud Computing Academic Project</span>
          </div>

          <h1 className="hero-title">
            Cloud-Based Online <span style={{ color: 'var(--primary-600)' }}>Quiz System</span>
          </h1>

          <p className="hero-subtitle">
            A modern, secure web application demonstrating Three-Tier Cloud Architecture principles.
            Designed for seamless student assessment, faculty curriculum management, and cloud computing educational exploration.
          </p>

          <div className="hero-cta">
            {isAuthenticated ? (
              <Link
                to={user?.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'}
                className="btn btn-primary btn-lg"
              >
                Go to {user?.role === 'faculty' ? 'Faculty' : 'Student'} Dashboard
                <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary btn-lg">
                  Student Login
                  <ArrowRight size={18} />
                </Link>
                <Link to="/login?role=faculty" className="btn btn-secondary btn-lg">
                  Faculty Login
                </Link>
                <Link to="/register" className="btn btn-outline-primary btn-lg">
                  Register as Student
                </Link>
              </>
            )}
            <Link to="/cloud-concepts" className="btn btn-secondary btn-lg" style={{ borderColor: 'var(--primary-300)' }}>
              <BookOpen size={18} color="var(--primary-600)" />
              Explore Cloud Concepts
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="main-content" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        {/* Quick Demo Credentials Info Card */}
        <div
          style={{
            backgroundColor: 'var(--white)',
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.75rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: 'var(--primary-800)', fontSize: '1rem' }}>
              ⚡ Ready-to-Test Academic Demo Accounts
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginTop: '0.2rem' }}>
              Faculty: <code style={{ backgroundColor: 'var(--slate-100)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>faculty@quiz.edu</code> (pass: <code style={{ backgroundColor: 'var(--slate-100)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>faculty123</code>) &nbsp;|&nbsp;
              Student: <code style={{ backgroundColor: 'var(--slate-100)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>student@quiz.edu</code> (pass: <code style={{ backgroundColor: 'var(--slate-100)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>student123</code>)
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/login" className="btn btn-primary btn-sm">
              Quick Login
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Key Application Features
            </h2>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
              Engineered with clean separation of concerns, modern React frontend, and robust Express/MySQL backend.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Feature 1 */}
            <div className="card">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                Instant Automated Scoring
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Submit answers and receive instantaneous score calculation and percentage grading without page reload, powered by backend evaluation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#f0fdf4',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                Anti-Cheat Backend Security
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Correct answers are never sent to the browser during the quiz. Validation and comparison are strictly executed in the Express logic tier.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                Role-Based Faculty Portal
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Faculty members can author custom MCQs, publish or unpublish tests, and inspect comprehensive student submission reports.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#fdf4ff',
                color: '#c026d3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                Integrated Cloud Learning
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Built-in interactive curriculum section explaining Cloud Computing, Amazon EC2, Amazon S3, Amazon RDS, CloudWatch, and 3-Tier Architecture.
              </p>
            </div>
          </div>
        </section>

        {/* About Project Section */}
        <section className="card" style={{ padding: '2.5rem', backgroundColor: 'var(--white)' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
              Academic Curriculum Context
            </span>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>
              About the Academic Project
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              This web application was developed as a <strong>5th-Semester Cloud Computing</strong> coursework project. It serves a dual objective: offering a fully functional online quiz system for academic evaluation, while serving as a concrete case study for understanding how enterprise web applications are structured in cloud environments.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              The application demonstrates the decoupling of the client interface from the backend API server and relational database, illustrating how each tier maps directly to standard cloud building blocks:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary-700)', fontSize: '0.9rem' }}>1. Presentation Tier</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>React.js + Vite SPA (Maps to Amazon S3 & CloudFront CDN)</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-teal)', fontSize: '0.9rem' }}>2. Logic / Compute Tier</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>Node.js + Express REST API (Maps to Amazon EC2 Instances)</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>3. Data Storage Tier</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>MySQL Relational Database (Maps to Amazon RDS Multi-AZ)</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

