import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Cloud, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { authService } from '../services/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = searchParams.get('role') === 'faculty' ? 'faculty' : 'student';
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const r = searchParams.get('role');
    if (r === 'faculty' || r === 'student') {
      setRole(r);
    }
  }, [searchParams]);

  // Demo account quick fill
  const handleQuickFill = (targetRole) => {
    setRole(targetRole);
    setError('');
    if (targetRole === 'faculty') {
      setEmail('faculty@quiz.edu');
      setPassword('faculty123');
    } else {
      setEmail('student@quiz.edu');
      setPassword('student123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.auth.login({ email, password, role });
      authService.setAuth(res.token, res.user);

      if (res.user.role === 'faculty') {
        navigate('/faculty/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 65px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      backgroundColor: 'var(--slate-50)'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--primary-600)',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
          }}>
            <Cloud size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
            Sign in to access your {role === 'faculty' ? 'Faculty' : 'Student'} Portal
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          backgroundColor: 'var(--slate-200)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem'
        }}>
          <button
            type="button"
            onClick={() => { setRole('student'); setError(''); }}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: role === 'student' ? 'var(--white)' : 'transparent',
              color: role === 'student' ? 'var(--primary-700)' : 'var(--slate-600)',
              boxShadow: role === 'student' ? 'var(--shadow-xs)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => { setRole('faculty'); setError(''); }}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: role === 'faculty' ? 'var(--white)' : 'transparent',
              color: role === 'faculty' ? 'var(--primary-700)' : 'var(--slate-600)',
              boxShadow: role === 'faculty' ? 'var(--shadow-xs)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Faculty Login
          </button>
        </div>

        {/* Main Card */}
        <div className="card" style={{ padding: '2rem' }}>
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--danger-50)',
              color: 'var(--danger-600)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              border: '1px solid #fecaca'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder={role === 'faculty' ? 'faculty@quiz.edu' : 'student@quiz.edu'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail
                  size={18}
                  style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock
                  size={18}
                  style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
              style={{ fontWeight: 600 }}
            >
              {loading ? 'Authenticating...' : `Sign In as ${role === 'faculty' ? 'Faculty' : 'Student'}`}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Quick Fill Demo Credentials Buttons */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--slate-200)' }}>
            <div style={{ fontSize: '0.775rem', color: 'var(--slate-500)', marginBottom: '0.5rem', textAlign: 'center' }}>
              1-Click Demo Evaluation Buttons:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleQuickFill('student')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.775rem' }}
              >
                Fill Student (Ada)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('faculty')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.775rem' }}
              >
                Fill Faculty (Alan)
              </button>
            </div>
          </div>
        </div>

        {/* Register Prompt */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

