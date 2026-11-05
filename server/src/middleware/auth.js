const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_cloud_quiz_jwt_key_2026_academic';

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <TOKEN>

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired session token. Please log in again.'
      });
    }

    req.user = decoded; // { id, name, email, role }
    next();
  });
}

// Optional Auth (for routes that work for both guests and authenticated users)
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.user = decoded;
    } else {
      req.user = null;
    }
    next();
  });
}

// Middleware to enforce specific role
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. This action requires ${role} privileges.`
      });
    }

    next();
  };
}

const requireFaculty = requireRole('faculty');
const requireStudent = requireRole('student');

module.exports = {
  authenticateToken,
  optionalAuth,
  requireRole,
  requireFaculty,
  requireStudent,
  JWT_SECRET
};

