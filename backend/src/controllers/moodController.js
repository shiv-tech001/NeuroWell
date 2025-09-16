const Mood = require('../models/Mood');
const Student = require('../models/Student');
const Counselor = require('../models/Counselor');
const { validationResult } = require('express-validator');
const { MESSAGES } = require('../constants/messages');

/**
 * @desc    Create or update mood entry for today  
 * @route   POST /api/mood
 * @access  Private
 */
const createMoodEntry = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: errors.array()
      });
    }

    const { mood, intensity, notes, triggers, activities } = req.body;
    const userId = req.user.id;

    // Determine user model based on which collection the user belongs to
    let userModel = 'Student';
    let user = await Student.findById(userId);
    
    if (!user) {
      user = await Counselor.findById(userId);
      userModel = 'Counselor';
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Get emoji for mood
    const moodEmojis = {
      'Awful': '😞',
      'Bad': '😔',
      'Okay': '🙂',
      'Good': '😀',
      'Great': '😁'
    };

    // Set today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if mood entry already exists for today
    let moodEntry = await Mood.findOne({
      userId,
      userModel,
      date: today
    });

    if (moodEntry) {
      // Update existing entry
      moodEntry.mood = mood;
      moodEntry.emoji = moodEmojis[mood];
      moodEntry.intensity = intensity;
      moodEntry.notes = notes || '';
      moodEntry.triggers = triggers || [];
      moodEntry.activities = activities || [];
      await moodEntry.save();
    } else {
      // Create new entry
      moodEntry = await Mood.create({
        userId,
        userModel,
        mood,
        emoji: moodEmojis[mood],
        intensity,
        notes: notes || '',
        triggers: triggers || [],
        activities: activities || [],
        date: today
      });
    }

    res.status(201).json({
      success: true,
      message: 'Mood entry saved successfully',
      data: {
        mood: moodEntry
      }
    });

  } catch (error) {
    console.error('Save mood entry error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get mood trend for the week
 * @route   GET /api/mood/trend?days=7
 * @access  Private
 */
const getMoodTrend = async (req, res) => {
  try {
    const userId = req.user.id;
    const days = parseInt(req.query.days) || 7;

    // Determine user model
    let userModel = 'Student';
    let user = await Student.findById(userId);
    
    if (!user) {
      user = await Counselor.findById(userId);
      userModel = 'Counselor';
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Get mood trend
    const moodTrend = await Mood.getMoodTrend(userId, userModel, days);

    // Create data structure for chart
    const chartData = [];
    const moodValues = {
      'Awful': 1,
      'Bad': 2,
      'Okay': 3,
      'Good': 4,
      'Great': 5
    };

    // Generate last N days
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayData = {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        date: date.toISOString().split('T')[0],
        mood: 3, // Default to "Okay"
        intensity: 5,
        hasEntry: false
      };

      // Check if there's a mood entry for this day
      const moodEntry = moodTrend.find(entry => 
        entry.date.toISOString().split('T')[0] === dayData.date
      );

      if (moodEntry) {
        dayData.mood = moodValues[moodEntry.mood];
        dayData.intensity = moodEntry.intensity;
        dayData.hasEntry = true;
        dayData.emoji = moodEntry.emoji;
        dayData.moodLabel = moodEntry.mood;
        dayData.notes = moodEntry.notes;
      }

      chartData.push(dayData);
    }

    res.json({
      success: true,
      data: {
        trend: chartData,
        entries: moodTrend
      }
    });

  } catch (error) {
    console.error('Get mood trend error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get mood history/journal
 * @route   GET /api/mood/history?limit=10&page=1
 * @access  Private
 */
const getMoodHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // Determine user model
    let userModel = 'Student';
    let user = await Student.findById(userId);
    
    if (!user) {
      user = await Counselor.findById(userId);
      userModel = 'Counselor';
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Get mood history with pagination
    const moods = await Mood.find({
      userId,
      userModel
    })
    .sort({ date: -1 })
    .limit(limit)
    .skip(skip);

    // Get total count for pagination
    const total = await Mood.countDocuments({ userId, userModel });

    res.json({
      success: true,
      data: {
        moods,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Get mood history error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get mood statistics
 * @route   GET /api/mood/stats?days=30
 * @access  Private
 */
const getMoodStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const days = parseInt(req.query.days) || 30;

    // Determine user model
    let userModel = 'Student';
    let user = await Student.findById(userId);
    
    if (!user) {
      user = await Counselor.findById(userId);
      userModel = 'Counselor';
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Get mood statistics
    const stats = await Mood.getMoodStats(userId, userModel, days);

    res.json({
      success: true,
      data: {
        stats,
        period: `${days} days`
      }
    });

  } catch (error) {
    console.error('Get mood stats error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get today's mood entry
 * @route   GET /api/mood/today
 * @access  Private
 */
const getTodaysMood = async (req, res) => {
  try {
    const userId = req.user.id;

    // Determine user model
    let userModel = 'Student';
    let user = await Student.findById(userId);
    
    if (!user) {
      user = await Counselor.findById(userId);
      userModel = 'Counselor';
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Get today's mood entry
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysMood = await Mood.findOne({
      userId,
      userModel,
      date: today
    });

    res.json({
      success: true,
      data: {
        mood: todaysMood,
        hasEntry: !!todaysMood
      }
    });

  } catch (error) {
    console.error('Get today\'s mood error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get mood entries for user
 * @route   GET /api/mood?limit=10
 * @access  Private
 */
const getMoodEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;

    // Determine user model
    let userModel = 'Student';
    let user = await Student.findById(userId);
    
    if (!user) {
      user = await Counselor.findById(userId);
      userModel = 'Counselor';
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Get mood entries
    const moods = await Mood.find({
      userId,
      userModel
    })
    .sort({ createdAt: -1 })
    .limit(limit);

    res.json({
      success: true,
      data: moods
    });

  } catch (error) {
    console.error('Get mood entries error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Update mood entry
 * @route   PUT /api/mood/:id
 * @access  Private
 */
const updateMoodEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { mood, intensity, notes } = req.body;

    // Find mood entry
    const moodEntry = await Mood.findOne({ _id: id, userId });

    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: 'Mood entry not found'
      });
    }

    // Update mood entry
    moodEntry.mood = mood || moodEntry.mood;
    moodEntry.intensity = intensity || moodEntry.intensity;
    moodEntry.notes = notes !== undefined ? notes : moodEntry.notes;
    
    await moodEntry.save();

    res.json({
      success: true,
      data: moodEntry
    });

  } catch (error) {
    console.error('Update mood entry error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * @desc    Delete mood entry
 * @route   DELETE /api/mood/:id
 * @access  Private
 */
const deleteMoodEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find and delete mood entry
    const moodEntry = await Mood.findOneAndDelete({ _id: id, userId });

    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: 'Mood entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Mood entry deleted successfully'
    });

  } catch (error) {
    console.error('Delete mood entry error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR
    });
  }
};

module.exports = {
  createMoodEntry,
  getMoodEntries,
  getMoodTrend,
  updateMoodEntry,
  deleteMoodEntry,
  getMoodHistory,
  getMoodStats,
  getTodaysMood
};