const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  userModel: {
    type: String,
    required: true,
    default: 'User'
  },
  
  // Mood data
  mood: {
    type: String,
    required: [true, 'Mood is required'],
    enum: ['Awful', 'Bad', 'Okay', 'Good', 'Great'],
    trim: true
  },
  intensity: {
    type: Number,
    required: [true, 'Intensity is required'],
    min: [1, 'Intensity must be at least 1'],
    max: [10, 'Intensity cannot exceed 10']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    trim: true
  },
  
  // Date tracking (day-wise storage)
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  // Metadata
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
moodSchema.index({ userId: 1, date: -1 });
moodSchema.index({ userId: 1, createdAt: -1 });
moodSchema.index({ mood: 1 });

// Compound index to ensure one entry per user per day
moodSchema.index({ 
  userId: 1, 
  date: 1 
}, { 
  unique: true,
  partialFilterExpression: { isActive: true }
});

// Pre-save middleware to set date to start of day (00:00:00)
moodSchema.pre('save', function(next) {
  if (this.isModified('date') || this.isNew) {
    const startOfDay = new Date(this.date);
    startOfDay.setHours(0, 0, 0, 0);
    this.date = startOfDay;
  }
  next();
});

// Virtual for mood numeric value (for charts)
moodSchema.virtual('moodValue').get(function() {
  const moodMap = {
    'Awful': 1,
    'Bad': 2,
    'Okay': 3,
    'Good': 4,
    'Great': 5
  };
  return moodMap[this.mood] || 3;
});

// Virtual for mood emoji
moodSchema.virtual('emoji').get(function() {
  const emojiMap = {
    'Awful': '😞',
    'Bad': '😔',
    'Okay': '🙂',
    'Good': '😀',
    'Great': '😁'
  };
  return emojiMap[this.mood] || '🙂';
});

// Instance method to format for frontend
moodSchema.methods.toFrontend = function() {
  const obj = this.toObject();
  return {
    _id: obj._id,
    userId: obj.userId,
    userModel: obj.userModel,
    mood: obj.mood,
    intensity: obj.intensity,
    notes: obj.notes,
    date: obj.date,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
    moodValue: this.moodValue,
    emoji: this.emoji
  };
};

// Static method to find by user and date range
moodSchema.statics.findByUserAndDateRange = function(userId, startDate, endDate) {
  return this.find({
    userId,
    date: {
      $gte: startDate,
      $lte: endDate
    },
    isActive: true
  }).sort({ date: -1 });
};

// Static method to get user's mood trend
moodSchema.statics.getMoodTrend = function(userId, days = 7) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days + 1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return this.findByUserAndDateRange(userId, startDate, endDate);
};

module.exports = mongoose.model('Mood', moodSchema);