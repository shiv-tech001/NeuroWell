require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔄 Testing MongoDB Connection...');
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI Template:', process.env.MONGODB_URI);

async function testConnection() {
  try {
    // Replace placeholders with test credentials
    let mongoUri = process.env.MONGODB_URI;
    
    if (mongoUri.includes('<db_username>') && mongoUri.includes('<db_password>')) {
      const username = process.env.DB_USERNAME || 'test_user';
      const password = process.env.DB_PASSWORD || 'test_password';
      
      console.log('📝 Using username:', username);
      console.log('📝 Password length:', password.length);
      
      mongoUri = mongoUri
        .replace('<db_username>', encodeURIComponent(username))
        .replace('<db_password>', encodeURIComponent(password));
    }

    console.log('🔗 Attempting connection to:', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log('🏠 Host:', conn.connection.host);
    console.log('📦 Database:', conn.connection.name);
    console.log('📊 Ready State:', conn.connection.readyState);
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('💡 Please check your database username and password in the .env file');
    } else if (error.message.includes('network')) {
      console.log('💡 Please check your network connection and MongoDB Atlas settings');
    }
  } finally {
    process.exit();
  }
}

testConnection();