const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Counselor = require('../models/Counselor');
const { MESSAGES } = require('../constants/messages');

/**
 * Protect routes - Authenticate user using JWT
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database - try both Student and Counselor collections
        let user = await Student.findById(decoded.id);
        
        if (!user) {
          user = await Counselor.findById(decoded.id);
        }
        
        if (!user) {
          return res.status(401).json({
            success: false,
            message: MESSAGES.INVALID_TOKEN
          });
        }

        // Check if user account is active
        if (!user.isActive) {
          return res.status(401).json({
            success: false,
            message: MESSAGES.ACCOUNT_DEACTIVATED
          });
        }

        req.user = user;
        next();

      } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({
          success: false,
          message: MESSAGES.INVALID_TOKEN
        });
      }
    }

    // If no token provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.NO_TOKEN
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Authorize specific roles
 * @param {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.NO_TOKEN
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.INSUFFICIENT_PERMISSIONS
      });
    }

    next();
  };
};

/**
 * Optional authentication - sets user if token is valid but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database - try both Student and Counselor collections
        let user = await Student.findById(decoded.id);
        
        if (!user) {
          user = await Counselor.findById(decoded.id);
        }
        
        if (user && user.isActive) {
          req.user = user;
        }

      } catch (error) {
        // Silently ignore invalid tokens for optional auth
        console.log('Optional auth - invalid token:', error.message);
      }
    }

    next();

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if there's an error
  }
};

/**
 * Check if user owns the resource or is admin/counselor
 */
const authorizeOwnerOrRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.NO_TOKEN
      });
    }

    // Check if user owns the resource (userId parameter matches authenticated user)
    const resourceUserId = req.params.userId || req.params.id;
    const isOwner = resourceUserId && resourceUserId.toString() === req.user._id.toString();

    // Check if user has authorized role
    const hasRole = allowedRoles.includes(req.user.role);

    if (!isOwner && !hasRole) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.INSUFFICIENT_PERMISSIONS
      });
    }

    next();
  };
};

/**
 * Rate limiting middleware for authentication endpoints
 */
const authRateLimit = (req, res, next) => {
  // This would be implemented with a more sophisticated rate limiting solution
  // like express-rate-limit or redis-based rate limiting in production
  next();
};

/**
 * Middleware to ensure email is verified for certain actions
 */
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.NO_TOKEN
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Please verify your email address to access this feature'
    });
  }

  next();
};

/**
 * Admin only access
 */
const adminOnly = authorize('admin');

/**
 * Counselor or Admin access
 */
const counselorOrAdmin = authorize('counselor', 'admin');

/**
 * Student only access
 */
const studentOnly = authorize('student');

module.exports = {
  protect,
  authorize,
  optionalAuth,
  authorizeOwnerOrRole,
  authRateLimit,
  requireEmailVerification,
  adminOnly,
  counselorOrAdmin,
  studentOnly
};