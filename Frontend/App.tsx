
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
import AppointmentsPage from './src/pages/counselor/Appointments';
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
// Protected Route Component
import { useNavigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role || '')) {
    // Redirect to a default dashboard or an unauthorized page
    // For now, let's redirect to the landing page or a generic dashboard
    // You might want a more specific redirect based on your app's logic
    return <Navigate to="/" replace />; 
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
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/appointments" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <BookAppointmentPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/resources" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <ResourcesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/community" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <CommunityPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/chat" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <ChatPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/settings" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <SettingsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/profile" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <Profile />
                    </ProtectedRoute>
                  } />

                  {/* Public Service Routes */}
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/chatboat" element={<ChatboatPage />} />
                  <Route path="/services/exercise" element={<ExercisePage />} />

                  {/* Counselor Routes */}
                  {/* Counselor Routes */}
                  <Route path="/counselor/dashboard" element={
                    <ProtectedRoute allowedRoles={['counselor']}>
                      <CounselorDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/counselor/patients" element={
                    <ProtectedRoute allowedRoles={['counselor']}>
                      <PatientsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/counselor/appointments" element={
                    <ProtectedRoute allowedRoles={['counselor']}>
                      <AppointmentsPage />
                    </ProtectedRoute>
                  } />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <ProtectedRoute allowedRoles={['admin']}>
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
