const { pool } = require('../config/db');

// 1. Get All Quizzes
// For Students: Returns published quizzes only, with total question count & attempt status
// For Faculty: Returns all quizzes (published & draft) with attempt stats
async function getAllQuizzes(req, res, next) {
  try {
    const isFaculty = req.user && req.user.role === 'faculty';
    const studentId = req.user && req.user.role === 'student' ? req.user.id : null;

    let query = `
      SELECT 
        q.id,
        q.title,
        q.description,
        q.status,
        q.created_at,
        u.name AS creator_name,
        COUNT(DISTINCT qst.id) AS total_questions,
        COUNT(DISTINCT r.id) AS total_attempts
    `;

    if (studentId) {
      query += `,
        MAX(CASE WHEN r.student_id = ? THEN r.score ELSE NULL END) AS user_best_score,
        COUNT(DISTINCT CASE WHEN r.student_id = ? THEN r.id ELSE NULL END) AS user_attempts
      `;
    }

    query += `
      FROM quizzes q
      LEFT JOIN users u ON q.created_by = u.id
      LEFT JOIN questions qst ON q.id = qst.quiz_id
      LEFT JOIN results r ON q.id = r.quiz_id
    `;

    const queryParams = [];
    if (studentId) {
      queryParams.push(studentId, studentId);
    }

    // Students only see published quizzes; Faculty sees all
    if (!isFaculty) {
      query += ` WHERE q.status = 'published'`;
    }

    query += ` GROUP BY q.id ORDER BY q.created_at DESC`;

    const [quizzes] = await pool.query(query, queryParams);

    res.json({
      success: true,
      quizzes
    });
  } catch (error) {
    next(error);
  }
}

// 2. Get Single Quiz by ID
// Students: NEVER see correct_answer
// Faculty: Can see correct_answer
async function getQuizById(req, res, next) {
  try {
    const quizId = parseInt(req.params.id, 10);
    const isFaculty = req.user && req.user.role === 'faculty';

    // 1. Fetch quiz header
    const [quizzes] = await pool.query(
      `SELECT q.id, q.title, q.description, q.status, q.created_by, q.created_at, u.name AS creator_name
       FROM quizzes q
       LEFT JOIN users u ON q.created_by = u.id
       WHERE q.id = ? LIMIT 1`,
      [quizId]
    );

    if (quizzes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    const quiz = quizzes[0];

    // Restrict student access if quiz is draft
    if (!isFaculty && quiz.status !== 'published') {
      return res.status(403).json({
        success: false,
        message: 'This quiz is currently in draft mode and not available to students.'
      });
    }

    // 2. Fetch questions
    // SECURITY: If student, omit correct_answer completely!
    const questionColumns = isFaculty
      ? 'id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer'
      : 'id, quiz_id, question_text, option_a, option_b, option_c, option_d';

    const [questions] = await pool.query(
      `SELECT ${questionColumns} FROM questions WHERE quiz_id = ? ORDER BY id ASC`,
      [quizId]
    );

    res.json({
      success: true,
      quiz: {
        ...quiz,
        questions
      }
    });
  } catch (error) {
    next(error);
  }
}

// 3. Create New Quiz (Faculty only)
async function createQuiz(req, res, next) {
  const connection = await pool.getConnection();
  try {
    const { title, description, status = 'draft', questions = [] } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Quiz title is required.'
      });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'A quiz must contain at least one question.'
      });
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question_text || !q.option_a || !q.option_b || !q.option_c || !q.option_d || !q.correct_answer) {
        return res.status(400).json({
          success: false,
          message: `Question #${i + 1} has empty fields or missing correct answer.`
        });
      }
      if (!['A', 'B', 'C', 'D'].includes(q.correct_answer.toUpperCase())) {
        return res.status(400).json({
          success: false,
          message: `Question #${i + 1} correct answer must be one of A, B, C, or D.`
        });
      }
    }

    await connection.beginTransaction();

    // Insert quiz
    const [quizResult] = await connection.query(
      'INSERT INTO quizzes (title, description, created_by, status) VALUES (?, ?, ?, ?)',
      [title.trim(), description ? description.trim() : '', req.user.id, status === 'published' ? 'published' : 'draft']
    );

    const quizId = quizResult.insertId;

    // Insert questions
    const questionValues = questions.map(q => [
      quizId,
      q.question_text.trim(),
      q.option_a.trim(),
      q.option_b.trim(),
      q.option_c.trim(),
      q.option_d.trim(),
      q.correct_answer.toUpperCase()
    ]);

    await connection.query(
      'INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES ?',
      [questionValues]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully!',
      quizId
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
}

// 4. Update Existing Quiz (Faculty only)
async function updateQuiz(req, res, next) {
  const connection = await pool.getConnection();
  try {
    const quizId = parseInt(req.params.id, 10);
    const { title, description, status, questions = [] } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Quiz title is required.'
      });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'A quiz must contain at least one question.'
      });
    }

    // Check if quiz exists
    const [existing] = await pool.query('SELECT id, created_by FROM quizzes WHERE id = ?', [quizId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    await connection.beginTransaction();

    // Update quiz metadata
    await connection.query(
      'UPDATE quizzes SET title = ?, description = ?, status = ? WHERE id = ?',
      [
        title.trim(),
        description ? description.trim() : '',
        status === 'published' ? 'published' : 'draft',
        quizId
      ]
    );

    // Delete existing questions and replace with updated ones
    await connection.query('DELETE FROM questions WHERE quiz_id = ?', [quizId]);

    const questionValues = questions.map(q => [
      quizId,
      q.question_text.trim(),
      q.option_a.trim(),
      q.option_b.trim(),
      q.option_c.trim(),
      q.option_d.trim(),
      q.correct_answer.toUpperCase()
    ]);

    await connection.query(
      'INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES ?',
      [questionValues]
    );

    await connection.commit();

    res.json({
      success: true,
      message: 'Quiz updated successfully!'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
}

// 5. Delete Quiz (Faculty only)
async function deleteQuiz(req, res, next) {
  try {
    const quizId = parseInt(req.params.id, 10);

    const [result] = await pool.query('DELETE FROM quizzes WHERE id = ?', [quizId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    res.json({
      success: true,
      message: 'Quiz and all associated questions/results deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
}

// 6. Toggle Publish Status (Faculty only)
async function toggleStatus(req, res, next) {
  try {
    const quizId = parseInt(req.params.id, 10);

    const [quizzes] = await pool.query('SELECT status FROM quizzes WHERE id = ?', [quizId]);
    if (quizzes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    const currentStatus = quizzes[0].status;
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';

    await pool.query('UPDATE quizzes SET status = ? WHERE id = ?', [newStatus, quizId]);

    res.json({
      success: true,
      message: `Quiz status changed to ${newStatus}.`,
      status: newStatus
    });
  } catch (error) {
    next(error);
  }
}

// 7. Submit Quiz & Calculate Score (Student only)
// Receives: { answers: { [questionId]: "A" | "B" | "C" | "D" } }
async function submitQuiz(req, res, next) {
  try {
    const quizId = parseInt(req.params.id, 10);
    const studentId = req.user.id;
    const { answers = {} } = req.body;

    // Check quiz existence and status
    const [quizzes] = await pool.query(
      'SELECT id, title FROM quizzes WHERE id = ? AND status = "published" LIMIT 1',
      [quizId]
    );

    if (quizzes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz is not available for submission.'
      });
    }

    // Fetch questions with actual correct answers from MySQL
    const [questions] = await pool.query(
      'SELECT id, question_text, option_a, option_b, option_c, option_d, correct_answer FROM questions WHERE quiz_id = ? ORDER BY id ASC',
      [quizId]
    );

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'This quiz has no questions.'
      });
    }

    let score = 0;
    const totalQuestions = questions.length;
    const reviewBreakdown = [];

    questions.forEach((q) => {
      const studentSelected = answers[q.id] ? answers[q.id].toUpperCase() : null;
      const isCorrect = studentSelected === q.correct_answer;

      if (isCorrect) {
        score += 1;
      }

      reviewBreakdown.push({
        questionId: q.id,
        questionText: q.question_text,
        optionA: q.option_a,
        optionB: q.option_b,
        optionC: q.option_c,
        optionD: q.option_d,
        selectedAnswer: studentSelected,
        correctAnswer: q.correct_answer,
        isCorrect
      });
    });

    const percentage = Number(((score / totalQuestions) * 100).toFixed(2));

    // Save result into MySQL results table
    const [resultInsert] = await pool.query(
      'INSERT INTO results (student_id, quiz_id, score, total_questions, percentage) VALUES (?, ?, ?, ?, ?)',
      [studentId, quizId, score, totalQuestions, percentage]
    );

    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully!',
      result: {
        id: resultInsert.insertId,
        quizId,
        quizTitle: quizzes[0].title,
        score,
        totalQuestions,
        percentage,
        attemptedAt: new Date().toISOString(),
        breakdown: reviewBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  toggleStatus,
  submitQuiz
};

