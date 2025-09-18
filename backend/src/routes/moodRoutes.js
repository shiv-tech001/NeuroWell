const express = require('express');
const { body } = require('express-validator');
const {
  createMoodEntry,
  getMoodEntries,
  getMoodTrend,
  updateMoodEntry,
  deleteMoodEntry,
  getMoodStats
} = require('../controllers/moodController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Validation rules
const createMoodValidation = [
  body('mood')
    .isIn(['Awful', 'Bad', 'Okay', 'Good', 'Great'])
    .withMessage('Mood must be one of: Awful, Bad, Okay, Good, Great'),
  body('intensity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Intensity must be a number between 1 and 10'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

const updateMoodValidation = [
  body('mood')
    .optional()
    .isIn(['Awful', 'Bad', 'Okay', 'Good', 'Great'])
    .withMessage('Mood must be one of: Awful, Bad, Okay, Good, Great'),
  body('intensity')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Intensity must be a number between 1 and 10'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

// All routes require authentication
router.use(protect);

// Routes
router.route('/')
  .get(getMoodEntries)          // GET /api/mood - Get user's mood entries
  .post(createMoodValidation, createMoodEntry); // POST /api/mood - Create new mood entry

router.get('/trend', getMoodTrend);             // GET /api/mood/trend - Get mood trend data
router.get('/stats', getMoodStats);             // GET /api/mood/stats - Get mood statistics

router.route('/:id')
  .put(updateMoodValidation, updateMoodEntry)   // PUT /api/mood/:id - Update mood entry
  .delete(deleteMoodEntry);                     // DELETE /api/mood/:id - Delete mood entry

module.exports = router;