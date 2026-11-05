import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Cloud, BookOpen, LogOut, User, LayoutDashboard, FileQuestion, BarChart2 } from 'lucide-react';
import { authService } from '../services/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon-box">
            <Cloud size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.05rem', lineHeight: 1.2, color: 'var(--slate-900)' }}>
              CLOUD-BASED QUIZ
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary-600)', fontWeight: 600 }}>
              Cloud Computing Academic Project
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link
            to="/cloud-concepts"
            className={`nav-link ${location.pathname === '/cloud-concepts' ? 'active' : ''}`}
            style={{ color: 'var(--primary-700)', backgroundColor: 'var(--primary-50)' }}
          >
            <BookOpen size={17} />
            <span>Cloud Concepts</span>
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === 'faculty' ? (
                <>
                  <Link
                    to="/faculty/dashboard"
                    className={`nav-link ${location.pathname === '/faculty/dashboard' ? 'active' : ''}`}
                  >
                    <LayoutDashboard size={17} />
                    <span>Faculty Dashboard</span>
                  </Link>
                  <Link
                    to="/faculty/quizzes"
                    className={`nav-link ${location.pathname === '/faculty/quizzes' ? 'active' : ''}`}
                  >
                    <FileQuestion size={17} />
                    <span>Manage Quizzes</span>
                  </Link>
                  <Link
                    to="/faculty/results"
                    className={`nav-link ${location.pathname === '/faculty/results' ? 'active' : ''}`}
                  >
                    <BarChart2 size={17} />
                    <span>Student Results</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/student/dashboard"
                    className={`nav-link ${location.pathname === '/student/dashboard' ? 'active' : ''}`}
                  >
                    <LayoutDashboard size={17} />
                    <span>Student Dashboard</span>
                  </Link>
                </>
              )}

              {/* User Profile & Logout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    backgroundColor: 'var(--slate-100)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}
                >
                  <User size={15} color="var(--slate-600)" />
                  <span style={{ color: 'var(--slate-800)', fontWeight: 600 }}>{user?.name}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: user?.role === 'faculty' ? 'var(--primary-600)' : 'var(--accent-teal)',
                      color: '#fff',
                      fontWeight: 700
                    }}
                  >
                    {user?.role}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  title="Logout"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Student Login
              </Link>
              <Link to="/login?role=faculty" className="btn btn-outline-primary btn-sm">
                Faculty Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

