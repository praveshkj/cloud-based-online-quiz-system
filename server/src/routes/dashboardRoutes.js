const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/auth');

// Get Dashboard Statistics (Role-aware: returns student or faculty metrics)
router.get('/stats', authenticateToken, dashboardController.getStats);

module.exports = router;

