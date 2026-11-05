import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileQuestion,
  CheckCircle,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  BookOpen,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { api } from '../services/api';
import { authService } from '../services/auth';

export default function StudentDashboard() {
  const user = authService.getUser();
  const [stats, setStats] = useState({
    availableQuizzes: 0,
    attemptedQuizzes: 0,
    averageScore: 0,
    highestScore: 0,
    recentResults: []
  });
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsRes, quizzesRes] = await Promise.all([
        api.dashboard.getStats(),
        api.quizzes.getAll()
      ]);

      setStats(statsRes.stats);
      setQuizzes(quizzesRes.quizzes || []);
    } catch (err) {
      console.error('Failed to load student dashboard:', err);
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />

      <main className="main-content">
        {/* Welcome Banner */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Welcome, {user?.name || 'Student'}! 👋
              </h1>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
                5th-Semester Cloud Computing Student Portal • Test your knowledge and track your evaluation.
              </p>
            </div>
            <Link to="/cloud-concepts" className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--primary-300)' }}>
              <BookOpen size={16} color="var(--primary-600)" />
              <span>Review Cloud Concepts</span>
            </Link>
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

        {/* Dashboard Statistics */}
        <div className="stats-grid">
          <StatCard
            title="Available Quizzes"
            value={stats.availableQuizzes}
            icon={FileQuestion}
            color="var(--primary-600)"
            subtext="Ready to take"
          />
          <StatCard
            title="Attempted Quizzes"
            value={stats.attemptedQuizzes}
            icon={CheckCircle}
            color="#0d9488"
            subtext="Unique tests completed"
          />
          <StatCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon={TrendingUp}
            color="#0284c7"
            subtext="Overall performance"
          />
          <StatCard
            title="Highest Score"
            value={`${stats.highestScore}%`}
            icon={Award}
            color="#f59e0b"
            subtext="Best attempt grade"
          />
        </div>

        {/* Section 1: Available Quizzes */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="card-header" style={{ marginBottom: '1rem' }}>
            <div>
              <h2 className="card-title">Available Cloud Computing Quizzes</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Select a quiz below to test your understanding of cloud architecture and services.
              </p>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate-400)' }}>
              Loading available quizzes...
            </div>
          ) : quizzes.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate-500)' }}>
              No quizzes currently published by faculty. Check back soon!
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span className="badge badge-primary">
                        {quiz.total_questions} Questions
                      </span>
                      {quiz.user_attempts > 0 && (
                        <span className="badge badge-success">
                          Attempted ({quiz.user_best_score}/{quiz.total_questions})
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.4rem' }}>
                      {quiz.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {quiz.description || 'Comprehensive multiple-choice assessment.'}
                    </p>
                  </div>

                  <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                      Author: {quiz.creator_name || 'Faculty Staff'}
                    </span>
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ fontWeight: 600 }}
                    >
                      {quiz.user_attempts > 0 ? (
                        <>
                          <RotateCcw size={14} />
                          <span>Retake Quiz</span>
                        </>
                      ) : (
                        <>
                          <span>Start Quiz</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Previous Quiz Results */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Previous Quiz Results</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Detailed record of your previous quiz submissions and calculated grades.
              </p>
            </div>
          </div>

          {stats.recentResults && stats.recentResults.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Grade Status</th>
                    <th>Attempt Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentResults.map((r) => {
                    const pct = Number(r.percentage);
                    let badgeClass = 'badge-success';
                    let statusLabel = 'Excellent';

                    if (pct < 50) {
                      badgeClass = 'badge-danger';
                      statusLabel = 'Needs Improvement';
                    } else if (pct < 75) {
                      badgeClass = 'badge-warning';
                      statusLabel = 'Good';
                    }

                    return (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 600, color: 'var(--slate-900)' }}>
                          {r.quiz_title}
                        </td>
                        <td>
                          {r.score} / {r.total_questions}
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--primary-700)' }}>
                          {pct.toFixed(1)}%
                        </td>
                        <td>
                          <span className={`badge ${badgeClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.825rem', color: 'var(--slate-500)' }}>
                          {new Date(r.attempted_at).toLocaleDateString()} {new Date(r.attempted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--slate-400)', fontSize: '0.9rem' }}>
              You haven't attempted any quizzes yet. Pick an available quiz above to begin!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

