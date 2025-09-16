const express = require('express');
const router = express.Router();
const {
  createMoodEntry,
  getMoodEntries,
  getMoodTrend,
  updateMoodEntry,
  deleteMoodEntry
} = require('../controllers/moodController');
const { protect } = require('../middlewares/authMiddleware');

// All mood routes require authentication
router.use(protect);

// POST /api/mood - Create a new mood entry
router.post('/', createMoodEntry);

// GET /api/mood - Get all mood entries for authenticated user
router.get('/', getMoodEntries);

// GET /api/mood/trend - Get mood trend data for authenticated user
router.get('/trend', getMoodTrend);

// PUT /api/mood/:id - Update a mood entry
router.put('/:id', updateMoodEntry);

// DELETE /api/mood/:id - Delete a mood entry
router.delete('/:id', deleteMoodEntry);

module.exports = router;