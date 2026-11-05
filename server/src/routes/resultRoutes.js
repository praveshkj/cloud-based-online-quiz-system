const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { authenticateToken, requireFaculty, requireStudent } = require('../middleware/auth');

// Student: View own results
router.get('/my-results', authenticateToken, requireStudent, resultController.getStudentResults);

// Faculty: View all results across students & quizzes
router.get('/all', authenticateToken, requireFaculty, resultController.getAllResults);

// Common: View single result details (restricted by student ID or faculty role)
router.get('/:id', authenticateToken, resultController.getResultById);

module.exports = router;

