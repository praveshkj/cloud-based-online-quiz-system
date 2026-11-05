const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Public auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected profile route
router.get('/me', authenticateToken, authController.getProfile);

module.exports = router;

