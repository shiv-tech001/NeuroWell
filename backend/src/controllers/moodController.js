const Mood = require('../models/Mood');
const { validationResult } = require('express-validator');
const { MESSAGES } = require('../constants/messages');

/**
 * @desc    Create a new mood entry
 * @route   POST /api/mood
 * @access  Private
 */
const createMoodEntry = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: errors.array()
      });
    }

    const { mood, intensity, notes } = req.body;
    const userId = req.user.id;

    // Check if user already has a mood entry for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingEntry = await Mood.findOne({
      userId,
      date: today,
      isActive: true
    });

    if (existingEntry) {
      // Update existing entry instead of creating new one
      existingEntry.mood = mood;
      existingEntry.intensity = intensity;
      if (notes !== undefined) existingEntry.notes = notes;
      await existingEntry.save();

      return res.json({
        success: true,
        message: 'Mood entry updated successfully',
        data: existingEntry.toFrontend()
      });
    }

    // Create new mood entry
    const moodEntry = await Mood.create({
      userId,
      userModel: 'User',
      mood,
      intensity,
      notes: notes || '',
      date: today
    });

    res.status(201).json({
      success: true,
      message: 'Mood entry created successfully',
      data: moodEntry.toFrontend()
    });

  } catch (error) {
    console.error('Create mood entry error:', error);
    
    // Handle duplicate key error (same user, same day)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already logged your mood for today. Try updating it instead.'
      });
    }

    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get mood entries for authenticated user
 * @route   GET /api/mood
 * @access  Private
 */
const getMoodEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10, page = 1 } = req.query;

    const skip = (page - 1) * limit;

    const moodEntries = await Mood.find({
      userId,
      isActive: true
    })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

    const total = await Mood.countDocuments({
      userId,
      isActive: true
    });

    const formattedEntries = moodEntries.map(entry => entry.toFrontend());

    res.json({
      success: true,
      message: 'Mood entries retrieved successfully',
      data: formattedEntries,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: formattedEntries.length,
        totalEntries: total
      }
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
 * @desc    Get mood trend data for charts
 * @route   GET /api/mood/trend
 * @access  Private
 */
const getMoodTrend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { days = 7 } = req.query;

    // Get mood entries for the specified date range
    const moodEntries = await Mood.getMoodTrend(userId, parseInt(days));

    // Generate trend data for all days in range (including days with no entries)
    const trendData = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(days) + 1);

    for (let i = 0; i < parseInt(days); i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      currentDate.setHours(0, 0, 0, 0);

      // Find mood entry for this day
      const dayEntry = moodEntries.find(entry => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === currentDate.getTime();
      });

      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      if (dayEntry) {
        trendData.push({
          day: dayName,
          date: dateStr,
          mood: dayEntry.moodValue,
          intensity: dayEntry.intensity,
          moodLabel: dayEntry.mood,
          hasEntry: true,
          emoji: dayEntry.emoji,
          notes: dayEntry.notes || ''
        });
      } else {
        // No entry for this day
        trendData.push({
          day: dayName,
          date: dateStr,
          mood: 0,
          intensity: 0,
          moodLabel: '',
          hasEntry: false,
          emoji: '',
          notes: ''
        });
      }
    }

    res.json({
      success: true,
      message: 'Mood trend data retrieved successfully',
      data: {
        trend: trendData,
        summary: {
          totalDays: parseInt(days),
          daysWithEntries: moodEntries.length,
          averageMood: moodEntries.length > 0 
            ? (moodEntries.reduce((sum, entry) => sum + entry.moodValue, 0) / moodEntries.length).toFixed(1)
            : 0,
          averageIntensity: moodEntries.length > 0
            ? (moodEntries.reduce((sum, entry) => sum + entry.intensity, 0) / moodEntries.length).toFixed(1)
            : 0
        }
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
 * @desc    Update a mood entry
 * @route   PUT /api/mood/:id
 * @access  Private
 */
const updateMoodEntry = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { mood, intensity, notes } = req.body;
    const userId = req.user.id;

    const moodEntry = await Mood.findOne({
      _id: id,
      userId,
      isActive: true
    });

    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: 'Mood entry not found'
      });
    }

    // Update fields
    if (mood !== undefined) moodEntry.mood = mood;
    if (intensity !== undefined) moodEntry.intensity = intensity;
    if (notes !== undefined) moodEntry.notes = notes;

    await moodEntry.save();

    res.json({
      success: true,
      message: 'Mood entry updated successfully',
      data: moodEntry.toFrontend()
    });

  } catch (error) {
    console.error('Update mood entry error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Delete a mood entry
 * @route   DELETE /api/mood/:id
 * @access  Private
 */
const deleteMoodEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const moodEntry = await Mood.findOne({
      _id: id,
      userId,
      isActive: true
    });

    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: 'Mood entry not found'
      });
    }

    // Soft delete by setting isActive to false
    moodEntry.isActive = false;
    await moodEntry.save();

    res.json({
      success: true,
      message: 'Mood entry deleted successfully'
    });

  } catch (error) {
    console.error('Delete mood entry error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get mood statistics for user
 * @route   GET /api/mood/stats
 * @access  Private
 */
const getMoodStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = 'month' } = req.query; // week, month, year

    let startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
    }

    const moodEntries = await Mood.find({
      userId,
      createdAt: { $gte: startDate },
      isActive: true
    });

    // Calculate statistics
    const stats = {
      totalEntries: moodEntries.length,
      averageMood: 0,
      averageIntensity: 0,
      moodDistribution: {
        'Awful': 0,
        'Bad': 0,
        'Okay': 0,
        'Good': 0,
        'Great': 0
      },
      mostCommonMood: '',
      streak: 0 // Current consecutive days with entries
    };

    if (moodEntries.length > 0) {
      // Calculate averages
      stats.averageMood = (moodEntries.reduce((sum, entry) => sum + entry.moodValue, 0) / moodEntries.length).toFixed(1);
      stats.averageIntensity = (moodEntries.reduce((sum, entry) => sum + entry.intensity, 0) / moodEntries.length).toFixed(1);

      // Calculate mood distribution
      moodEntries.forEach(entry => {
        stats.moodDistribution[entry.mood]++;
      });

      // Find most common mood
      stats.mostCommonMood = Object.keys(stats.moodDistribution).reduce((a, b) => 
        stats.moodDistribution[a] > stats.moodDistribution[b] ? a : b
      );

      // Calculate current streak (consecutive days with entries)
      const sortedEntries = await Mood.find({
        userId,
        isActive: true
      }).sort({ date: -1 }).limit(30); // Check last 30 days for streak

      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        
        const hasEntry = sortedEntries.some(entry => {
          const entryDate = new Date(entry.date);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === checkDate.getTime();
        });

        if (hasEntry) {
          streak++;
        } else {
          break;
        }
      }
      
      stats.streak = streak;
    }

    res.json({
      success: true,
      message: 'Mood statistics retrieved successfully',
      data: stats
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

module.exports = {
  createMoodEntry,
  getMoodEntries,
  getMoodTrend,
  updateMoodEntry,
  deleteMoodEntry,
  getMoodStats
};