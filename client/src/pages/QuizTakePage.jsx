import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  Send,
  Sparkles
} from 'lucide-react';
import Modal from '../components/Modal';
import { api } from '../services/api';

export default function QuizTakePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: "A" | "B" | "C" | "D" }
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        setError('');
        const res = await api.quizzes.getById(id);
        setQuiz(res.quiz);
      } catch (err) {
        setError(err.message || 'Failed to load quiz questions.');
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [id]);

  const questions = quiz?.questions || [];
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optionKey) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionKey
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;
  const unansweredCount = totalCount - answeredCount;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setIsConfirmOpen(false);
      const res = await api.quizzes.submit(id, answers);
      // Navigate to result view passing the result payload
      navigate(`/quiz/${id}/result`, {
        state: { result: res.result },
        replace: true
      });
    } catch (err) {
      alert(`Submission error: ${err.message}`);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: 'calc(100vh - 65px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--slate-500)' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Loading Quiz Assessment...</div>
          <p style={{ fontSize: '0.85rem' }}>Preparing questions from backend server</p>
        </div>
      </div>
    );
  }

  if (error || !quiz || questions.length === 0) {
    return (
      <div className="main-content" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
          <AlertTriangle size={36} color="var(--danger-600)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Quiz Unavailable</h3>
          <p style={{ color: 'var(--slate-600)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error || 'This quiz does not contain any questions or has been unpublished.'}
          </p>
          <Link to="/student/dashboard" className="btn btn-primary btn-block">
            Return to Student Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 65px)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Quiz Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <Link
              to="/student/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                color: 'var(--slate-500)',
                fontWeight: 500,
                marginBottom: '0.35rem'
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              {quiz.title}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
              {quiz.description}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--white)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--slate-200)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <CheckCircle size={16} color="var(--primary-600)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-700)' }}>
              Answered: {answeredCount} / {totalCount}
            </span>
          </div>
        </div>

        {/* Question Numbers Quick Navigation Palette */}
        <div
          className="card"
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-400)', marginRight: '0.5rem', textTransform: 'uppercase' }}>
            Questions:
          </span>
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;

            let bg = 'var(--slate-100)';
            let text = 'var(--slate-700)';
            let border = '1px solid var(--slate-200)';

            if (isAnswered) {
              bg = 'var(--primary-50)';
              text = 'var(--primary-700)';
              border = '1px solid var(--primary-300)';
            }
            if (isCurrent) {
              bg = 'var(--primary-600)';
              text = 'var(--white)';
              border = '1px solid var(--primary-700)';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: bg,
                  color: text,
                  border: border,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Presentation Card */}
        <div className="card" style={{ padding: '2.25rem', marginBottom: '1.5rem' }}>
          {/* Question Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span className="badge badge-primary" style={{ fontSize: '0.8rem' }}>
              Question {currentIdx + 1} of {totalCount}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>
              1 Mark
            </span>
          </div>

          {/* Question Text */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', lineHeight: 1.5, marginBottom: '2rem' }}>
            {currentQ.question_text}
          </h2>

          {/* 4 Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { key: 'A', text: currentQ.option_a },
              { key: 'B', text: currentQ.option_b },
              { key: 'C', text: currentQ.option_c },
              { key: 'D', text: currentQ.option_d }
            ].map(({ key, text }) => {
              const isSelected = answers[currentQ.id] === key;

              return (
                <div
                  key={key}
                  onClick={() => handleSelectOption(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                    backgroundColor: isSelected ? 'var(--primary-50)' : 'var(--white)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 4px rgba(37, 99, 235, 0.1)' : 'none'
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--radius-full)',
                      border: isSelected ? '2px solid var(--primary-600)' : '2px solid var(--slate-300)',
                      backgroundColor: isSelected ? 'var(--primary-600)' : 'transparent',
                      color: isSelected ? 'var(--white)' : 'var(--slate-600)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {key}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: isSelected ? 600 : 400, color: isSelected ? 'var(--primary-900)' : 'var(--slate-700)' }}>
                    {text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Controls / Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="btn btn-secondary"
            style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
          >
            <ArrowLeft size={16} />
            <span>Previous Question</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {currentIdx < totalCount - 1 ? (
              <button
                onClick={() => setCurrentIdx((prev) => Math.min(totalCount - 1, prev + 1))}
                className="btn btn-primary"
              >
                <span>Next Question</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setIsConfirmOpen(true)}
                className="btn btn-success btn-lg"
                style={{ fontWeight: 700 }}
              >
                <Send size={16} />
                <span>Review & Submit Quiz</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Ready to Submit Quiz?"
        actions={
          <>
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="btn btn-secondary"
            >
              Keep Reviewing
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn btn-success"
              style={{ fontWeight: 600 }}
            >
              {submitting ? 'Calculating Score...' : 'Yes, Confirm & Submit'}
            </button>
          </>
        }
      >
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.925rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
            Please confirm your submission. Your answers will be securely graded by the backend logic server and permanently recorded in MySQL.
          </p>

          <div style={{
            backgroundColor: 'var(--slate-100)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Questions Answered</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success-600)' }}>
                {answeredCount} / {totalCount}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Unanswered</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: unansweredCount > 0 ? 'var(--warning-600)' : 'var(--slate-600)' }}>
                {unansweredCount}
              </div>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--warning-600)',
              fontSize: '0.825rem',
              marginTop: '1rem'
            }}>
              <AlertTriangle size={16} />
              <span>You have {unansweredCount} unanswered question(s). You can still submit if you wish.</span>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

