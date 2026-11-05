import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CloudConceptsPage from './pages/CloudConceptsPage';
import StudentDashboard from './pages/StudentDashboard';
import QuizTakePage from './pages/QuizTakePage';
import QuizResultPage from './pages/QuizResultPage';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyQuizManage from './pages/FacultyQuizManage';
import FacultyResultsView from './pages/FacultyResultsView';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cloud-concepts" element={<CloudConceptsPage />} />

            {/* Student Protected Routes */}
            <Route element={<ProtectedRoute requiredRole="student" />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/quiz/:id" element={<QuizTakePage />} />
              <Route path="/quiz/:id/result" element={<QuizResultPage />} />
            </Route>

            {/* Faculty Protected Routes */}
            <Route element={<ProtectedRoute requiredRole="faculty" />}>
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
              <Route path="/faculty/quizzes" element={<FacultyQuizManage />} />
              <Route path="/faculty/results" element={<FacultyResultsView />} />
            </Route>

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

