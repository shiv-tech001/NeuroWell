const express = require('express');
const { sendMessage } = require('../controllers/chatController');
const { optionalAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Send message to AI chatbot - using optionalAuth instead of protect
// This allows both authenticated and unauthenticated users to access mental health support
router.post('/send', optionalAuth, sendMessage);

module.exports = router;