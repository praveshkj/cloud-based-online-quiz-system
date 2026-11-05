import React from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function QuizResultPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  if (!result) {
    return (
      <div className="main-content" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>No Result Data Available</h3>
          <p style={{ color: 'var(--slate-600)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            It looks like this page was loaded directly without submitting a quiz attempt.
          </p>
          <Link to="/student/dashboard" className="btn btn-primary btn-block">
            Go to Student Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { score, totalQuestions, percentage, quizTitle, breakdown = [] } = result;
  const pct = Number(percentage);

  let badgeColor = 'var(--success-600)';
  let gradeTitle = 'Excellent Mastery!';
  let gradeSub = 'You displayed an outstanding grasp of this cloud computing module.';

  if (pct < 50) {
    badgeColor = 'var(--danger-600)';
    gradeTitle = 'Needs Improvement';
    gradeSub = 'Review the cloud concepts and lecture notes before retaking.';
  } else if (pct < 75) {
    badgeColor = 'var(--warning-600)';
    gradeTitle = 'Good Effort!';
    gradeSub = 'Solid performance, with a few concepts requiring review.';
  }

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 65px)', padding: '2.5rem 1rem' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        {/* Score Summary Hero Card */}
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-md)',
            borderTop: `6px solid ${badgeColor}`
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-full)',
              backgroundColor: `${badgeColor}15`,
              color: badgeColor,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <Award size={36} />
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
            {gradeTitle}
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            {gradeSub}
          </p>

          {/* Big Score Numbers */}
          <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1 }}>
              {score}
            </span>
            <span style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--slate-400)' }}>
              / {totalQuestions}
            </span>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: badgeColor,
              backgroundColor: `${badgeColor}15`,
              padding: '0.3rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              marginLeft: '0.75rem'
            }}>
              {pct.toFixed(1)}%
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/student/dashboard" className="btn btn-primary">
              <LayoutDashboard size={16} />
              <span>Back to Dashboard</span>
            </Link>
            <Link to={`/quiz/${id}`} className="btn btn-secondary">
              <RotateCcw size={16} />
              <span>Retake Quiz</span>
            </Link>
          </div>
        </div>

        {/* Detailed Question Review Breakdown */}
        {breakdown.length > 0 && (
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Detailed Submission Review
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
                Inspect your selections alongside the verified correct answers stored in the MySQL database.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {breakdown.map((item, idx) => {
                const isCorrect = item.isCorrect;
                return (
                  <div
                    key={item.questionId || idx}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: isCorrect ? '1px solid #bbf7d0' : '1px solid #fecaca',
                      backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          color: isCorrect ? 'var(--success-600)' : 'var(--danger-600)'
                        }}>
                          Question {idx + 1}
                        </span>
                        {isCorrect ? (
                          <span className="badge badge-success" style={{ gap: '0.25rem' }}>
                            <CheckCircle2 size={12} /> Correct
                          </span>
                        ) : (
                          <span className="badge badge-danger" style={{ gap: '0.25rem' }}>
                            <XCircle size={12} /> Incorrect
                          </span>
                        )}
                      </div>
                    </div>

                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--slate-900)', marginBottom: '1rem' }}>
                      {item.questionText}
                    </p>

                    {/* Options Breakdown */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem', fontSize: '0.85rem' }}>
                      {[
                        { key: 'A', text: item.optionA },
                        { key: 'B', text: item.optionB },
                        { key: 'C', text: item.optionC },
                        { key: 'D', text: item.optionD }
                      ].map(({ key, text }) => {
                        const isStudentChoice = item.selectedAnswer === key;
                        const isTheCorrectChoice = item.correctAnswer === key;

                        let rowBorder = '1px solid var(--slate-200)';
                        let rowBg = 'var(--white)';
                        let rowColor = 'var(--slate-700)';

                        if (isTheCorrectChoice) {
                          rowBorder = '2px solid var(--success-600)';
                          rowBg = '#dcfce7';
                          rowColor = '#166534';
                        } else if (isStudentChoice && !isCorrect) {
                          rowBorder = '2px solid var(--danger-600)';
                          rowBg = '#fee2e2';
                          rowColor = '#991b1b';
                        }

                        return (
                          <div
                            key={key}
                            style={{
                              padding: '0.6rem 0.85rem',
                              borderRadius: 'var(--radius-sm)',
                              border: rowBorder,
                              backgroundColor: rowBg,
                              color: rowColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.5rem'
                            }}
                          >
                            <span>
                              <strong>{key}.</strong> {text}
                            </span>
                            {isTheCorrectChoice && (
                              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#166534' }}>
                                Correct Answer
                              </span>
                            )}
                            {isStudentChoice && !isTheCorrectChoice && (
                              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#991b1b' }}>
                                Your Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

