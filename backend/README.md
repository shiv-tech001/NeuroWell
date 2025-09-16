# SIH Mental Health Support Platform - Backend API

A comprehensive Node.js/Express backend API for the Student Mental Health Support Platform built for Smart India Hackathon (SIH).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Core Features
- **User Authentication & Authorization** - JWT-based auth with role-based access control
- **User Management** - Profile management for students, counselors, and admins
- **Session Management** - Appointment booking and counseling session management
- **File Upload** - Avatar upload with Cloudinary integration
- **Email Services** - Automated email notifications and verification
- **OTP Services** - One-time password generation and verification
- **Input Validation** - Comprehensive data validation and sanitization
- **Error Handling** - Centralized error handling with detailed logging
- **Rate Limiting** - API rate limiting for security
- **Security** - Helmet.js security headers and CORS protection

### User Roles
- **Students** - Book appointments, access resources, manage profile
- **Counselors** - Manage sessions, view assigned students, update availability
- **Admins** - Full system access, user management, analytics

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: express-validator
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Testing**: Jest + Supertest
- **Security**: Helmet.js, CORS, express-rate-limit
- **Development**: Nodemon

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Session.js         # Session schema
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── userController.js  # User management logic
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   └── userRoutes.js      # User management routes
│   ├── middlewares/
│   │   ├── authMiddleware.js  # JWT authentication
│   │   └── errorMiddleware.js # Error handling
│   ├── utils/
│   │   ├── generateToken.js   # JWT token utilities
│   │   └── validators.js      # Input validation helpers
│   ├── services/
│   │   ├── emailService.js    # Email notifications
│   │   └── otpService.js      # OTP generation/verification
│   ├── constants/
│   │   ├── roles.js           # User roles and permissions
│   │   └── messages.js        # Application messages
│   └── app.js                 # Express app configuration
├── tests/
│   ├── auth.test.js           # Authentication tests
│   └── user.test.js           # User management tests
├── uploads/
│   └── avatars/               # Avatar upload directory
├── .env                       # Environment variables
├── server.js                  # Server entry point
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   - Local: `mongod`
   - Or use MongoDB Atlas connection string

5. **Run the application**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/sih_mental_health

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "Password123!",
  "role": "student"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### User Management Endpoints

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Updated Name",
  "phone": "1234567890"
}
```

#### Upload Avatar
```http
POST /api/users/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

avatar: <image-file>
```

#### Change Password
```http
PUT /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123",
  "confirmNewPassword": "newpassword123"
}
```

#### Get Counselors (Students only)
```http
GET /api/users/counselors?specialization=anxiety&page=1&limit=10
Authorization: Bearer <token>
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Registration/Login** returns a JWT token
2. **Protected routes** require `Authorization: Bearer <token>` header
3. **Role-based access** control for different user types
4. **Token expiration** configurable via environment variables

### User Roles

- **student**: Can book appointments, access resources
- **counselor**: Can manage sessions, view assigned students  
- **admin**: Full system access and user management

## 💾 Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['student', 'counselor', 'admin'],
  avatar: { public_id, url },
  phone: String,
  dateOfBirth: Date,
  
  // Student fields
  studentId: String,
  college: String,
  course: String,
  year: Number,
  
  // Counselor fields
  specialization: [String],
  qualification: String,
  experience: Number,
  licenseNumber: String,
  
  // Status fields
  isActive: Boolean,
  isEmailVerified: Boolean,
  lastLogin: Date,
  preferences: Object
}
```

### Session Model
```javascript
{
  student: ObjectId (ref: User),
  counselor: ObjectId (ref: User),
  title: String,
  description: String,
  category: Enum,
  scheduledDate: Date,
  duration: Number,
  status: Enum,
  type: Enum ['video-call', 'voice-call', 'chat'],
  meetingLink: String,
  notes: String,
  feedback: Object,
  isUrgent: Boolean,
  riskLevel: Enum
}
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- **auth.test.js**: Authentication endpoint tests
- **user.test.js**: User management endpoint tests
- Uses **Jest** as testing framework
- Uses **Supertest** for HTTP assertions
- Includes setup/teardown for test database

### Example Test
```javascript
test('Should register a new user', async () => {
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'Password123!',
    role: 'student'
  };

  const response = await request(app)
    .post('/api/auth/register')
    .send(userData)
    .expect(201);

  expect(response.body.success).toBe(true);
  expect(response.body.data.user.email).toBe(userData.email);
});
```

## 🚀 Deployment

### Using PM2 (Production)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start ecosystem.config.js

# Monitor
pm2 status
pm2 logs
```

### Using Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Setup
1. Set `NODE_ENV=production`
2. Use secure JWT secrets
3. Configure production database
4. Set up email service credentials
5. Configure Cloudinary for file uploads
6. Set up monitoring and logging

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "user": { ... }
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## 🔒 Security Features

- **JWT Authentication** with secure token generation
- **Password Hashing** using bcryptjs
- **Input Validation** and sanitization
- **Rate Limiting** to prevent abuse
- **CORS** protection
- **Helmet.js** security headers
- **Data encryption** for sensitive information
- **File upload validation** and size limits

## 📊 Monitoring & Logging

- **Console logging** for development
- **Error tracking** with detailed stack traces
- **Request logging** for API calls
- **Performance monitoring** capabilities
- **Health check** endpoint at `/health`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages
- Ensure all tests pass

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for Smart India Hackathon (SIH)**