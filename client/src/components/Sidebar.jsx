import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileQuestion,
  Award,
  BookOpen,
  PlusCircle,
  Users,
  LogOut,
  Layers,
  Database
} from 'lucide-react';
import { authService } from '../services/auth';

export default function Sidebar({ role = 'student' }) {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-heading">Portal Navigation</div>
        <div className="sidebar-menu">
          {role === 'faculty' ? (
            <>
              <NavLink
                to="/faculty/dashboard"
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                end
              >
                <LayoutDashboard size={18} />
                <span>Faculty Dashboard</span>
              </NavLink>

              <NavLink
                to="/faculty/quizzes"
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              >
                <FileQuestion size={18} />
                <span>Quiz Management</span>
              </NavLink>

              <NavLink
                to="/faculty/results"
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Users size={18} />
                <span>Student Results</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                end
              >
                <LayoutDashboard size={18} />
                <span>Student Dashboard</span>
              </NavLink>
            </>
          )}

          <div className="sidebar-heading" style={{ marginTop: '1.25rem' }}>
            Academic Resources
          </div>

          <NavLink
            to="/cloud-concepts"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={18} />
            <span>Cloud Concepts</span>
          </NavLink>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="user-info">
          <span className="user-name">{user?.name || 'User'}</span>
          <span className="user-role-badge">{role}</span>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem', border: 'none' }}
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

