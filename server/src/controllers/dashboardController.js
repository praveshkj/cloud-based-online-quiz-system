const { pool } = require('../config/db');

// Get Dashboard Statistics based on user role
async function getStats(req, res, next) {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    if (role === 'faculty') {
      // 1. Total Quizzes Created
      const [quizRows] = await pool.query(
        'SELECT COUNT(*) AS total_quizzes, SUM(CASE WHEN status = "published" THEN 1 ELSE 0 END) AS published_quizzes FROM quizzes'
      );

      // 2. Total Registered Students
      const [studentRows] = await pool.query(
        'SELECT COUNT(*) AS total_students FROM users WHERE role = "student"'
      );

      // 3. Total Quiz Attempts & Average Score
      const [attemptRows] = await pool.query(
        'SELECT COUNT(*) AS total_attempts, AVG(percentage) AS avg_percentage FROM results'
      );

      // 4. Recent Activity Log (Latest 5 quiz attempts)
      const [recentActivity] = await pool.query(
        `SELECT 
          r.id,
          r.score,
          r.total_questions,
          r.percentage,
          r.attempted_at,
          u.name AS student_name,
          q.title AS quiz_title
         FROM results r
         JOIN users u ON r.student_id = u.id
         JOIN quizzes q ON r.quiz_id = q.id
         ORDER BY r.attempted_at DESC
         LIMIT 6`
      );

      // 5. Quiz-wise breakdown for charts/tables
      const [quizBreakdown] = await pool.query(
        `SELECT 
          q.id,
          q.title,
          q.status,
          COUNT(r.id) AS attempt_count,
          AVG(r.percentage) AS avg_score
         FROM quizzes q
         LEFT JOIN results r ON q.id = r.quiz_id
         GROUP BY q.id
         ORDER BY q.created_at DESC`
      );

      return res.json({
        success: true,
        stats: {
          totalQuizzes: quizRows[0].total_quizzes || 0,
          publishedQuizzes: quizRows[0].published_quizzes || 0,
          totalStudents: studentRows[0].total_students || 0,
          totalAttempts: attemptRows[0].total_attempts || 0,
         averagePercentage: Number(Number(attemptRows[0].avg_percentage || 0).toFixed(1)),
          recentActivity,
          quizBreakdown
        }
      });

    } else {
      // Student Dashboard Stats

      // 1. Available Quizzes (published)
      const [availableRows] = await pool.query(
        'SELECT COUNT(*) AS available_quizzes FROM quizzes WHERE status = "published"'
      );

      // 2. Student's Attempted Quizzes (distinct) & Total Attempts
      const [studentAttempts] = await pool.query(
        `SELECT 
          COUNT(DISTINCT quiz_id) AS distinct_quizzes_attempted,
          COUNT(id) AS total_attempts,
          AVG(percentage) AS avg_score,
          MAX(percentage) AS highest_score
         FROM results
         WHERE student_id = ?`,
        [userId]
      );

      // 3. Recent Quiz Results of this student
      const [recentResults] = await pool.query(
        `SELECT 
          r.id,
          r.quiz_id,
          r.score,
          r.total_questions,
          r.percentage,
          r.attempted_at,
          q.title AS quiz_title
         FROM results r
         JOIN quizzes q ON r.quiz_id = q.id
         WHERE r.student_id = ?
         ORDER BY r.attempted_at DESC
         LIMIT 5`,
        [userId]
      );

      return res.json({
        success: true,
        stats: {
          availableQuizzes: availableRows[0].available_quizzes || 0,
          attemptedQuizzes: studentAttempts[0].distinct_quizzes_attempted || 0,
          totalSubmissions: studentAttempts[0].total_attempts || 0,
          averageScore: Number(Number(studentAttempts[0].avg_score || 0).toFixed(1)),
          highestScore: Number(Number(studentAttempts[0].highest_score || 0).toFixed(1)),
          recentResults
        }
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStats
};

