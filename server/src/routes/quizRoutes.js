const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { authenticateToken, optionalAuth, requireFaculty, requireStudent } = require('../middleware/auth');

// Quiz browsing & details
// optionalAuth allows both guests (landing page) and authenticated students/faculty
router.get('/', optionalAuth, quizController.getAllQuizzes);
router.get('/:id', optionalAuth, quizController.getQuizById);

// Student Quiz Submission
router.post('/:id/submit', authenticateToken, requireStudent, quizController.submitQuiz);

// Faculty Quiz Management (CRUD)
router.post('/', authenticateToken, requireFaculty, quizController.createQuiz);
router.put('/:id', authenticateToken, requireFaculty, quizController.updateQuiz);
router.delete('/:id', authenticateToken, requireFaculty, quizController.deleteQuiz);
router.patch('/:id/status', authenticateToken, requireFaculty, quizController.toggleStatus);

module.exports = router;

