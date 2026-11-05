const { pool } = require('../config/db');

// 1. Get logged-in student's quiz results
async function getStudentResults(req, res, next) {
  try {
    const studentId = req.user.id;

    const [results] = await pool.query(
      `SELECT 
        r.id,
        r.quiz_id,
        r.score,
        r.total_questions,
        r.percentage,
        r.attempted_at,
        q.title AS quiz_title,
        q.description AS quiz_description
       FROM results r
       JOIN quizzes q ON r.quiz_id = q.id
       WHERE r.student_id = ?
       ORDER BY r.attempted_at DESC`,
      [studentId]
    );

    res.json({
      success: true,
      results
    });
  } catch (error) {
    next(error);
  }
}

// 2. Get all quiz results across students (Faculty only)
async function getAllResults(req, res, next) {
  try {
    const { quizId } = req.query;

    let query = `
      SELECT 
        r.id,
        r.score,
        r.total_questions,
        r.percentage,
        r.attempted_at,
        q.id AS quiz_id,
        q.title AS quiz_title,
        u.id AS student_id,
        u.name AS student_name,
        u.email AS student_email
      FROM results r
      JOIN quizzes q ON r.quiz_id = q.id
      JOIN users u ON r.student_id = u.id
    `;

    const queryParams = [];

    if (quizId) {
      query += ` WHERE r.quiz_id = ?`;
      queryParams.push(parseInt(quizId, 10));
    }

    query += ` ORDER BY r.attempted_at DESC`;

    const [results] = await pool.query(query, queryParams);

    // Also get list of quizzes for filtering dropdown
    const [quizzes] = await pool.query(
      `SELECT id, title FROM quizzes ORDER BY title ASC`
    );

    res.json({
      success: true,
      results,
      quizzes
    });
  } catch (error) {
    next(error);
  }
}

// 3. Get detailed result by ID
async function getResultById(req, res, next) {
  try {
    const resultId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const isFaculty = req.user.role === 'faculty';

    let query = `
      SELECT 
        r.id,
        r.score,
        r.total_questions,
        r.percentage,
        r.attempted_at,
        r.student_id,
        q.id AS quiz_id,
        q.title AS quiz_title,
        q.description AS quiz_description,
        u.name AS student_name,
        u.email AS student_email
      FROM results r
      JOIN quizzes q ON r.quiz_id = q.id
      JOIN users u ON r.student_id = u.id
      WHERE r.id = ?
    `;

    const queryParams = [resultId];

    if (!isFaculty) {
      query += ` AND r.student_id = ?`;
      queryParams.push(userId);
    }

    const [rows] = await pool.query(query, queryParams);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Result not found or access denied.'
      });
    }

    res.json({
      success: true,
      result: rows[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStudentResults,
  getAllResults,
  getResultById
};

