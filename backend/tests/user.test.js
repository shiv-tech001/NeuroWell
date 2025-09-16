const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const connectDB = require('../src/config/db');
const mongoose = require('mongoose');

// Test database setup
const setupTestDB = () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await connectDB();
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
};

setupTestDB();

describe('User Endpoints', () => {
  let authToken;
  let userId;
  let testUser;

  beforeEach(async () => {
    // Create and login a test user
    testUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      role: 'student',
      college: 'Test University',
      course: 'Computer Science',
      year: 2
    });
    const savedUser = await testUser.save();
    userId = savedUser._id;

    // Login to get token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'Password123!'
      });

    authToken = loginResponse.body.data.token;
  });

  describe('GET /api/users/profile', () => {
    test('Should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('john.doe@example.com');
      expect(response.body.data.user.firstName).toBe('John');
      expect(response.body.data.user.lastName).toBe('Doe');
      expect(response.body.data.user.role).toBe('student');
      expect(response.body.data.user.password).toBeUndefined();
    });

    test('Should fail to get profile without token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access denied. No token provided');
    });

    test('Should fail to get profile with invalid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid or expired token');
    });
  });

  describe('PUT /api/users/profile', () => {
    test('Should update user profile with valid data', async () => {
      const updateData = {
        firstName: 'John Updated',
        lastName: 'Doe Updated',
        phone: '1234567890',
        college: 'Updated University',
        course: 'Updated Course',
        year: 3
      };

      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Profile updated successfully');
      expect(response.body.data.user.firstName).toBe('John Updated');
      expect(response.body.data.user.lastName).toBe('Doe Updated');
      expect(response.body.data.user.phone).toBe('1234567890');
      expect(response.body.data.user.college).toBe('Updated University');
      expect(response.body.data.user.year).toBe(3);
    });

    test('Should update counselor-specific fields', async () => {
      // Create a counselor user
      const counselor = new User({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'Password123!',
        role: 'counselor',
        qualification: 'M.A. Psychology',
        experience: 5,
        specialization: ['anxiety']
      });
      await counselor.save();

      // Login as counselor
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'jane.smith@example.com',
          password: 'Password123!'
        });

      const counselorToken = loginResponse.body.data.token;

      const updateData = {
        qualification: 'Ph.D. Clinical Psychology',
        experience: 7,
        specialization: ['anxiety', 'depression', 'trauma']
      };

      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${counselorToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.qualification).toBe('Ph.D. Clinical Psychology');
      expect(response.body.data.user.experience).toBe(7);
      expect(response.body.data.user.specialization).toEqual(['anxiety', 'depression', 'trauma']);
    });

    test('Should fail to update with invalid phone number', async () => {
      const updateData = {
        phone: 'invalid-phone'
      };

      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });

    test('Should fail to update with invalid date of birth', async () => {
      const updateData = {
        dateOfBirth: '2030-01-01' // Future date
      };

      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('Should fail to update without authentication', async () => {
      const updateData = {
        firstName: 'Updated Name'
      };

      const response = await request(app)
        .put('/api/users/profile')
        .send(updateData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access denied. No token provided');
    });
  });

  describe('PUT /api/users/change-password', () => {
    test('Should change password with valid data', async () => {
      const passwordData = {
        currentPassword: 'Password123!',
        newPassword: 'NewPassword123!',
        confirmNewPassword: 'NewPassword123!'
      };

      const response = await request(app)
        .put('/api/users/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(passwordData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Password changed successfully');

      // Verify new password works
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'NewPassword123!'
        });

      expect(loginResponse.status).toBe(200);
    });

    test('Should fail to change password with incorrect current password', async () => {
      const passwordData = {
        currentPassword: 'WrongPassword',
        newPassword: 'NewPassword123!',
        confirmNewPassword: 'NewPassword123!'
      };

      const response = await request(app)
        .put('/api/users/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(passwordData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Current password is incorrect');
    });

    test('Should fail to change password with weak new password', async () => {
      const passwordData = {
        currentPassword: 'Password123!',
        newPassword: '123',
        confirmNewPassword: '123'
      };

      const response = await request(app)
        .put('/api/users/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(passwordData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });

    test('Should fail to change password with mismatched confirmation', async () => {
      const passwordData = {
        currentPassword: 'Password123!',
        newPassword: 'NewPassword123!',
        confirmNewPassword: 'DifferentPassword123!'
      };

      const response = await request(app)
        .put('/api/users/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(passwordData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/users/deactivate', () => {
    test('Should deactivate user account', async () => {
      const response = await request(app)
        .put('/api/users/deactivate')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Account deactivated successfully');

      // Verify user cannot login after deactivation
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'Password123!'
        });

      expect(loginResponse.status).toBe(401);
      expect(loginResponse.body.message).toBe('Account has been deactivated');
    });

    test('Should fail to deactivate without authentication', async () => {
      const response = await request(app)
        .put('/api/users/deactivate')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access denied. No token provided');
    });
  });

  describe('GET /api/users/counselors', () => {
    beforeEach(async () => {
      // Create counselor users
      const counselors = [
        {
          firstName: 'Dr. Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          password: 'Password123!',
          role: 'counselor',
          qualification: 'Ph.D. Clinical Psychology',
          experience: 10,
          specialization: ['anxiety', 'depression'],
          isEmailVerified: true
        },
        {
          firstName: 'Dr. Mike',
          lastName: 'Johnson',
          email: 'mike.johnson@example.com',
          password: 'Password123!',
          role: 'counselor',
          qualification: 'M.A. Counseling Psychology',
          experience: 5,
          specialization: ['stress', 'relationships'],
          isEmailVerified: true
        }
      ];

      await User.insertMany(counselors);
    });

    test('Should get list of counselors for students', async () => {
      const response = await request(app)
        .get('/api/users/counselors')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.docs).toHaveLength(2);
      expect(response.body.data.docs[0].role).toBeUndefined(); // Should not include role in response
      expect(response.body.data.docs[0].firstName).toBeDefined();
      expect(response.body.data.docs[0].specialization).toBeDefined();
    });

    test('Should filter counselors by specialization', async () => {
      const response = await request(app)
        .get('/api/users/counselors?specialization=anxiety')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.docs).toHaveLength(1);
      expect(response.body.data.docs[0].specialization).toContain('anxiety');
    });

    test('Should paginate counselors list', async () => {
      const response = await request(app)
        .get('/api/users/counselors?page=1&limit=1')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.docs).toHaveLength(1);
      expect(response.body.data.totalDocs).toBe(2);
      expect(response.body.data.page).toBe(1);
      expect(response.body.data.limit).toBe(1);
    });

    test('Should fail for non-student users', async () => {
      // Create admin user
      const admin = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'Password123!',
        role: 'admin'
      });
      await admin.save();

      // Login as admin
      const adminLoginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'Password123!'
        });

      const adminToken = adminLoginResponse.body.data.token;

      const response = await request(app)
        .get('/api/users/counselors')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('You do not have permission to access this resource');
    });

    test('Should fail without authentication', async () => {
      const response = await request(app)
        .get('/api/users/counselors')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access denied. No token provided');
    });
  });
});