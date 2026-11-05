import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileQuestion,
  Users,
  CheckSquare,
  TrendingUp,
  PlusCircle,
  Eye,
  BarChart2,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { api } from '../services/api';
import { authService } from '../services/auth';

export default function FacultyDashboard() {
  const user = authService.getUser();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    publishedQuizzes: 0,
    totalStudents: 0,
    totalAttempts: 0,
    averagePercentage: 0,
    recentActivity: [],
    quizBreakdown: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.dashboard.getStats();
      setStats(res.stats);
    } catch (err) {
      console.error('Failed to load faculty dashboard:', err);
      setError(err.message || 'Failed to load faculty analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar role="faculty" />

      <main className="main-content">
        {/* Top Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Faculty Dashboard
              </h1>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
                Welcome, {user?.name}! Oversee academic assessments, monitor student performance, and manage quizzes.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/faculty/quizzes" className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                <span>Manage / Create Quizzes</span>
              </Link>
              <Link to="/faculty/results" className="btn btn-secondary btn-sm">
                <BarChart2 size={16} />
                <span>View All Results</span>
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'var(--danger-50)',
            color: 'var(--danger-600)',
            padding: '0.9rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        {/* Faculty Statistics Grid */}
        <div className="stats-grid">
          <StatCard
            title="Total Quizzes"
            value={stats.totalQuizzes}
            icon={FileQuestion}
            color="var(--primary-600)"
            subtext={`${stats.publishedQuizzes} published live`}
          />
          <StatCard
            title="Registered Students"
            value={stats.totalStudents}
            icon={Users}
            color="#0d9488"
            subtext="Enrolled student accounts"
          />
          <StatCard
            title="Total Quiz Attempts"
            value={stats.totalAttempts}
            icon={CheckSquare}
            color="#0284c7"
            subtext="Submissions received"
          />
          <StatCard
            title="Class Average Score"
            value={`${stats.averagePercentage}%`}
            icon={TrendingUp}
            color="#f59e0b"
            subtext="Across all attempts"
          />
        </div>

        {/* Section: Recent Quiz Activity */}
        <div className="card" style={{ marginBottom: '2.5rem' }}>
          <div className="card-header">
            <div>
              <h2 className="card-title">Recent Quiz Activity</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Latest student submissions evaluated and stored in the database.
              </p>
            </div>
            <Link to="/faculty/results" style={{ fontSize: '0.85rem', color: 'var(--primary-600)', fontWeight: 600 }}>
              View All Attempts →
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--slate-400)' }}>
              Loading recent submissions...
            </div>
          ) : stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Quiz Title</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentActivity.map((act) => {
                    const pct = Number(act.percentage);
                    let badgeClass = pct >= 75 ? 'badge-success' : pct >= 50 ? 'badge-warning' : 'badge-danger';

                    return (
                      <tr key={act.id}>
                        <td style={{ fontWeight: 600, color: 'var(--slate-900)' }}>
                          {act.student_name}
                        </td>
                        <td>{act.quiz_title}</td>
                        <td>
                          {act.score} / {act.total_questions}
                        </td>
                        <td>
                          <span className={`badge ${badgeClass}`}>
                            {pct.toFixed(1)}%
                          </span>
                        </td>
                        <td style={{ fontSize: '0.825rem', color: 'var(--slate-500)' }}>
                          {new Date(act.attempted_at).toLocaleDateString()} {new Date(act.attempted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--slate-400)', fontSize: '0.9rem' }}>
              No quiz attempts recorded yet.
            </div>
          )}
        </div>

        {/* Section: Quiz Overview Breakdown */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Curriculum Quiz Overview</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Status and engagement metrics for each authored quiz module.
              </p>
            </div>
            <Link to="/faculty/quizzes" className="btn btn-outline-primary btn-sm">
              Manage Quizzes
            </Link>
          </div>

          {stats.quizBreakdown && stats.quizBreakdown.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Publication Status</th>
                    <th>Total Submissions</th>
                    <th>Module Average</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.quizBreakdown.map((q) => (
                    <tr key={q.id}>
                      <td style={{ fontWeight: 600, color: 'var(--slate-900)' }}>
                        {q.title}
                      </td>
                      <td>
                        <span className={`badge ${q.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                          {q.status === 'published' ? 'Live (Published)' : 'Draft'}
                        </span>
                      </td>
                      <td>{q.attempt_count} attempts</td>
                      <td style={{ fontWeight: 600, color: 'var(--primary-700)' }}>
                        {q.avg_score ? `${Number(q.avg_score).toFixed(1)}%` : 'No attempts yet'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--slate-400)' }}>
              No quizzes created yet. Click "Manage / Create Quizzes" to create your first quiz!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

