import React, { useState, useEffect } from 'react';
import {
  Users,
  Award,
  Filter,
  CheckCircle,
  Clock,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { api } from '../services/api';

export default function FacultyResultsView() {
  const [results, setResults] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResults = async (quizId = '') => {
    try {
      setLoading(true);
      setError('');
      const res = await api.results.getAll(quizId);
      setResults(res.results || []);
      if (res.quizzes) {
        setQuizzes(res.quizzes);
      }
    } catch (err) {
      setError(err.message || 'Failed to load student results.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(selectedQuizId);
  }, [selectedQuizId]);

  const totalSubmissions = results.length;
  const avgPct =
    totalSubmissions > 0
      ? (results.reduce((acc, r) => acc + Number(r.percentage), 0) / totalSubmissions).toFixed(1)
      : 0;

  return (
    <div className="dashboard-layout">
      <Sidebar role="faculty" />

      <main className="main-content">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Student Quiz Results
              </h1>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
                Academic evaluation records: Inspect individual student scores, percentages, and quiz submissions.
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Metrics Toolbar */}
        <div
          className="card"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Filter size={18} color="var(--slate-500)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)' }}>
              Filter by Quiz:
            </span>
            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '240px' }}
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
            >
              <option value="">All Quizzes (Entire Curriculum)</option>
              {quizzes.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: 'var(--slate-500)' }}>Submissions: </span>
              <strong style={{ color: 'var(--slate-900)' }}>{totalSubmissions}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--slate-500)' }}>Filtered Average: </span>
              <strong style={{ color: 'var(--primary-700)' }}>{avgPct}%</strong>
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'var(--danger-50)',
            color: 'var(--danger-600)',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        {/* Results Table Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Submission Logs</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Detailed submission timestamps, calculated marks, and performance tiers.
              </p>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate-400)' }}>
              Loading results from database...
            </div>
          ) : results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate-500)' }}>
              No student submissions found matching the selected filter.
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email Address</th>
                    <th>Quiz Title</th>
                    <th>Score / Total</th>
                    <th>Percentage</th>
                    <th>Performance Status</th>
                    <th>Attempt Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => {
                    const pct = Number(r.percentage);
                    let badgeClass = pct >= 75 ? 'badge-success' : pct >= 50 ? 'badge-warning' : 'badge-danger';
                    let label = pct >= 75 ? 'High Distinction' : pct >= 50 ? 'Satisfactory' : 'Needs Review';

                    return (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 700, color: 'var(--slate-900)' }}>
                          {r.student_name}
                        </td>
                        <td style={{ color: 'var(--slate-500)', fontSize: '0.85rem' }}>
                          {r.student_email}
                        </td>
                        <td style={{ fontWeight: 600, color: 'var(--slate-700)' }}>
                          {r.quiz_title}
                        </td>
                        <td style={{ fontWeight: 600 }}>
                          {r.score} / {r.total_questions}
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--primary-700)' }}>
                          {pct.toFixed(1)}%
                        </td>
                        <td>
                          <span className={`badge ${badgeClass}`}>
                            {label}
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
          )}
        </div>
      </main>
    </div>
  );
}

