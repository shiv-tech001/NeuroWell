const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userModel'
  },
  userModel: {
    type: String,
    required: true,
    enum: ['Student', 'Counselor']
  },
  
  // Mood data
  mood: {
    type: String,
    required: [true, 'Mood is required'],
    enum: ['Awful', 'Bad', 'Okay', 'Good', 'Great']
  },
  emoji: {
    type: String,
    required: true
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
  
  // Date tracking
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  // Contextual information
  triggers: [{
    type: String,
    enum: ['work', 'relationships', 'health', 'family', 'academic', 'financial', 'social', 'other']
  }],
  activities: [{
    type: String,
    enum: ['exercise', 'meditation', 'socializing', 'studying', 'sleeping', 'eating', 'entertainment', 'other']
  }],
  
  // Location and weather context (optional)
  location: {
    type: String,
    trim: true
  },
  weather: {
    type: String,
    enum: ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy', 'other']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
moodSchema.index({ userId: 1, date: -1 });
moodSchema.index({ date: -1 });
moodSchema.index({ mood: 1 });

// Ensure only one mood entry per user per day
moodSchema.index(
  { userId: 1, date: 1 }, 
  { 
    unique: true,
    partialFilterExpression: {
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      }
    }
  }
);

// Virtual for day of week
moodSchema.virtual('dayOfWeek').get(function() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[this.date.getDay()];
});

// Virtual for short day
moodSchema.virtual('shortDay').get(function() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[this.date.getDay()];
});

// Static method to get mood trend for last N days
moodSchema.statics.getMoodTrend = async function(userId, userModel, days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days + 1);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  
  return this.find({
    userId,
    userModel,
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ date: 1 });
};

// Static method to get mood statistics
moodSchema.statics.getMoodStats = async function(userId, userModel, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days + 1);
  startDate.setHours(0, 0, 0, 0);
  
  return this.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        userModel,
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$mood',
        count: { $sum: 1 },
        avgIntensity: { $avg: '$intensity' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Pre-save middleware to set date to start of day
moodSchema.pre('save', function(next) {
  if (this.isNew) {
    // Set date to start of day to ensure one entry per day
    const date = new Date(this.date);
    date.setHours(0, 0, 0, 0);
    this.date = date;
  }
  next();
});

module.exports = mongoose.model('Mood', moodSchema);