const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { testConnection } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const resultRoutes = require('./routes/resultRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
  });
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'Cloud-Based Online Quiz System',
    course: '5th-Semester Cloud Computing Academic Project',
    architecture: 'Three-Tier Architecture (Client -> Server -> Database)',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found.`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server and Test Database Connectivity
app.listen(PORT, async () => {
  console.log('===========================================================');
  console.log(` CLOUD-BASED ONLINE QUIZ SYSTEM - BACKEND SERVER`);
  console.log(` Server running on: http://localhost:${PORT}`);
  console.log(` Academic Project: 5th-Semester Cloud Computing`);
  console.log('===========================================================');
  await testConnection();
});

module.exports = app;

