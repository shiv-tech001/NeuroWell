
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Import Layout
import Layout from './src/components/layout/Layout';

import LandingPage from './src/pages/LandingPage';
import StudentDashboard from './src/pages/student/StudentDashboard';
import BookAppointmentPage from './src/pages/student/BookAppointmentPage';
import ResourcesPage from './src/pages/student/ResourcesPage';
import ChatPage from './src/pages/student/ChatPage';
import SettingsPage from './src/pages/student/SettingsPage';
import CounselorDashboard from './src/pages/counselor/CounselorDashboard';
import PatientsPage from './src/pages/counselor/PatientsPage';
import AdminDashboard from './src/pages/admin/AdminDashboard';
import UsersPage from './src/pages/admin/UsersPage';
import LoginPage from './src/pages/auth/LoginPage';
import RegisterPage from './src/pages/auth/RegisterPage';
import Logout from './src/components/auth/Logout';
import CommunityPage from './src/pages/student/CommunityPage';
import Profile from './src/pages/student/Profile';
import ServicesPage from './src/pages/services/services';
import ChatboatPage from './src/pages/services/Chatboat';
import ExercisePage from './src/pages/services/Excercise';
import ContactPage from './src/pages/ContactPage'; // New import

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
          <HashRouter>
            <Layout>
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/contact" element={<ContactPage />} /> {/* New Route */}
                  
                  {/* Student Routes */}
                  <Route path="/student/dashboard" element={
                    <ProtectedRoute>
                      <StudentDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/appointments" element={
                    <ProtectedRoute>
                      <BookAppointmentPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/resources" element={
                    <ProtectedRoute>
                      <ResourcesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/community" element={
                    <ProtectedRoute>
                      <CommunityPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/chat" element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/settings" element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />

                  {/* Public Service Routes */}
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/chatboat" element={<ChatboatPage />} />
                  <Route path="/services/exercise" element={<ExercisePage />} />

                  {/* Counselor Routes */}
                  <Route path="/counselor/dashboard" element={
                    <ProtectedRoute>
                      <CounselorDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/counselor/patients" element={
                    <ProtectedRoute>
                      <PatientsPage />
                    </ProtectedRoute>
                  } />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <ProtectedRoute>
                      <UsersPage />
                    </ProtectedRoute>
                  } />
              </Routes>
            </Layout>
          </HashRouter>
        </AuthProvider>
    );
};

export default App;
