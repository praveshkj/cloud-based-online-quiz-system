import React, { useState, useEffect } from 'react';
import {
  FileQuestion,
  PlusCircle,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import { api } from '../services/api';

const emptyQuestion = {
  question_text: '',
  option_a: '',
  option_b: '',
  option_c: '',
  option_d: '',
  correct_answer: 'A'
};

export default function FacultyQuizManage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState(null); // null if creating new
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    status: 'published',
    questions: [{ ...emptyQuestion }]
  });
  const [saving, setSaving] = useState(false);
  const [editorError, setEditorError] = useState('');

  // Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, quizId: null, quizTitle: '' });

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.quizzes.getAll();
      setQuizzes(res.quizzes || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch quizzes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleOpenCreate = () => {
    setEditingQuizId(null);
    setQuizForm({
      title: '',
      description: '',
      status: 'published',
      questions: [{ ...emptyQuestion }]
    });
    setEditorError('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = async (quiz) => {
    try {
      setLoading(true);
      const res = await api.quizzes.getById(quiz.id);
      const fetched = res.quiz;

      setEditingQuizId(fetched.id);
      setQuizForm({
        title: fetched.title,
        description: fetched.description || '',
        status: fetched.status,
        questions: fetched.questions.length > 0 ? fetched.questions : [{ ...emptyQuestion }]
      });
      setEditorError('');
      setIsEditorOpen(true);
    } catch (err) {
      alert(`Could not load quiz details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...emptyQuestion }]
    }));
  };

  const handleRemoveQuestion = (idx) => {
    if (quizForm.questions.length <= 1) {
      alert('A quiz must have at least one question.');
      return;
    }
    setQuizForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== idx)
    }));
  };

  const handleQuestionChange = (idx, field, value) => {
    setQuizForm((prev) => {
      const updated = [...prev.questions];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, questions: updated };
    });
  };

  const handleSaveQuiz = async (e) => {
    e.preventDefault();
    setEditorError('');

    if (!quizForm.title.trim()) {
      setEditorError('Quiz title is required.');
      return;
    }

    // Validate all questions
    for (let i = 0; i < quizForm.questions.length; i++) {
      const q = quizForm.questions[i];
      if (!q.question_text.trim() || !q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim()) {
        setEditorError(`Question #${i + 1} has blank fields. Please fill all options.`);
        return;
      }
    }

    try {
      setSaving(true);
      if (editingQuizId) {
        await api.quizzes.update(editingQuizId, quizForm);
        setSuccessMsg(`Quiz "${quizForm.title}" updated successfully.`);
      } else {
        await api.quizzes.create(quizForm);
        setSuccessMsg(`Quiz "${quizForm.title}" created successfully.`);
      }
      setIsEditorOpen(false);
      fetchQuizzes();
    } catch (err) {
      setEditorError(err.message || 'Failed to save quiz.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (quizId) => {
    try {
      await api.quizzes.toggleStatus(quizId);
      fetchQuizzes();
    } catch (err) {
      alert(`Failed to toggle status: ${err.message}`);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.quizzes.delete(deleteModal.quizId);
      setDeleteModal({ isOpen: false, quizId: null, quizTitle: '' });
      setSuccessMsg('Quiz and associated questions deleted successfully.');
      fetchQuizzes();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="faculty" />

      <main className="main-content">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Quiz Management
            </h1>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
              Create, modify, publish, and delete multiple-choice academic quiz modules.
            </p>
          </div>
          <button onClick={handleOpenCreate} className="btn btn-primary">
            <PlusCircle size={18} />
            <span>Create New Quiz</span>
          </button>
        </div>

        {/* Feedback Messages */}
        {successMsg && (
          <div style={{
            backgroundColor: 'var(--success-50)',
            color: 'var(--success-600)',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={18} />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg('')} style={{ color: 'var(--success-600)', fontWeight: 700 }}>×</button>
          </div>
        )}

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

        {/* Quizzes List Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">All Authored Quizzes</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Overview of current quizzes, question totals, and publishing states.
              </p>
            </div>
            <span className="badge badge-primary">
              {quizzes.length} Total Quizzes
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate-400)' }}>
              Loading quizzes...
            </div>
          ) : quizzes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate-500)' }}>
              No quizzes created yet. Click "Create New Quiz" to author your first assessment!
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title & Description</th>
                    <th>Questions</th>
                    <th>Status</th>
                    <th>Attempts</th>
                    <th>Created At</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz) => (
                    <tr key={quiz.id}>
                      <td style={{ maxWidth: '320px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>
                          {quiz.title}
                        </div>
                        <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {quiz.description || 'No description provided.'}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-primary">
                          {quiz.total_questions} Questions
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleStatus(quiz.id)}
                          className={`badge ${quiz.status === 'published' ? 'badge-success' : 'badge-warning'}`}
                          style={{ cursor: 'pointer', border: 'none' }}
                          title="Click to toggle publish/draft"
                        >
                          {quiz.status === 'published' ? 'Published (Live)' : 'Draft (Hidden)'}
                        </button>
                      </td>
                      <td style={{ color: 'var(--slate-600)', fontWeight: 500 }}>
                        {quiz.total_attempts} attempts
                      </td>
                      <td style={{ fontSize: '0.825rem', color: 'var(--slate-400)' }}>
                        {new Date(quiz.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleOpenEdit(quiz)}
                            className="btn btn-secondary btn-sm"
                            title="Edit Quiz & Questions"
                          >
                            <Edit2 size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, quizId: quiz.id, quizTitle: quiz.title })}
                            className="btn btn-danger btn-sm"
                            title="Delete Quiz"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Quiz Create/Edit Large Modal */}
      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: '820px', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">
                {editingQuizId ? 'Edit Quiz Assessment' : 'Create New Cloud Quiz'}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                style={{ color: 'var(--slate-400)', padding: '0.25rem' }}
              >
                ✕
              </button>
            </div>

            {editorError && (
              <div style={{
                backgroundColor: 'var(--danger-50)',
                color: 'var(--danger-600)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                border: '1px solid #fecaca'
              }}>
                {editorError}
              </div>
            )}

            <form onSubmit={handleSaveQuiz}>
              {/* Quiz Metadata */}
              <div className="form-group">
                <label className="form-label">Quiz Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. AWS Cloud Security & RDS Architecture"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quiz Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Provide brief instructions or scope for this quiz"
                  value={quizForm.description}
                  onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                <label className="form-label">Publication Status</label>
                <select
                  className="form-select"
                  value={quizForm.status}
                  onChange={(e) => setQuizForm({ ...quizForm, status: e.target.value })}
                >
                  <option value="published">Published (Visible to students immediately)</option>
                  <option value="draft">Draft (Saved but hidden from students)</option>
                </select>
              </div>

              {/* Questions Section */}
              <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                    Multiple-Choice Questions ({quizForm.questions.length})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="btn btn-secondary btn-sm"
                  >
                    <Plus size={14} />
                    <span>Add Question</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {quizForm.questions.map((q, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--slate-200)',
                        backgroundColor: 'var(--slate-50)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-700)' }}>
                          Question #{idx + 1}
                        </span>
                        {quizForm.questions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(idx)}
                            style={{ color: 'var(--danger-600)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <Trash size={14} />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Enter question text..."
                          value={q.question_text}
                          onChange={(e) => handleQuestionChange(idx, 'question_text', e.target.value)}
                          required
                        />
                      </div>

                      {/* 4 Options Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)' }}>Option A</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Option A"
                            value={q.option_a}
                            onChange={(e) => handleQuestionChange(idx, 'option_a', e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)' }}>Option B</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Option B"
                            value={q.option_b}
                            onChange={(e) => handleQuestionChange(idx, 'option_b', e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)' }}>Option C</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Option C"
                            value={q.option_c}
                            onChange={(e) => handleQuestionChange(idx, 'option_c', e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)' }}>Option D</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Option D"
                            value={q.option_d}
                            onChange={(e) => handleQuestionChange(idx, 'option_d', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Correct Answer Selection */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--white)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--slate-200)' }}>
                        <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--slate-700)' }}>
                          Select Correct Option:
                        </span>
                        {['A', 'B', 'C', 'D'].map((opt) => (
                          <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                            <input
                              type="radio"
                              name={`correct_${idx}`}
                              value={opt}
                              checked={q.correct_answer === opt}
                              onChange={() => handleQuestionChange(idx, 'correct_answer', opt)}
                            />
                            <span>Option {opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="btn btn-secondary btn-block"
                  style={{ marginTop: '1rem', borderStyle: 'dashed' }}
                >
                  <Plus size={16} />
                  <span>Add Another Question</span>
                </button>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                  style={{ fontWeight: 600 }}
                >
                  {saving ? 'Saving to Database...' : editingQuizId ? 'Update Quiz' : 'Save & Publish Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, quizId: null, quizTitle: '' })}
        title="Delete Quiz"
        actions={
          <>
            <button
              onClick={() => setDeleteModal({ isOpen: false, quizId: null, quizTitle: '' })}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="btn btn-danger"
            >
              Confirm Delete
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem' }}>
          Are you sure you want to delete <strong>"{deleteModal.quizTitle}"</strong>?
        </p>
        <p style={{ color: 'var(--danger-600)', fontSize: '0.825rem', marginTop: '0.5rem' }}>
          ⚠️ This will permanently remove all associated questions and student submission records from the MySQL database.
        </p>
      </Modal>
    </div>
  );
}

