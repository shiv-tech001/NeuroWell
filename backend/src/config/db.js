const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace placeholders with actual credentials from environment variables
    let mongoUri = process.env.MONGODB_URI;
    
    if (mongoUri.includes('<db_username>') && mongoUri.includes('<db_password>')) {
      const username = process.env.DB_USERNAME;
      const password = process.env.DB_PASSWORD;
      
      if (!username || !password) {
        throw new Error('DB_USERNAME and DB_PASSWORD must be set in environment variables');
      }
      
      mongoUri = mongoUri
        .replace('<db_username>', encodeURIComponent(username))
        .replace('<db_password>', encodeURIComponent(password));
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;