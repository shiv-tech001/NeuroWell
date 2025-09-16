import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Import Layout
import Layout from './src/components/layout/Layout';
import SessionsPage from './src/pages/counselor/Sessions';
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
import ForgotPassword from './src/pages/auth/ForgotPassword';
import ResetPassword from './src/pages/auth/ResetPassword';
import Logout from './src/components/auth/Logout';
import CommunityPage from './src/pages/student/CommunityPage';
import Profile from './src/pages/student/Profile';
import ServicesPage from './src/pages/services/services';
import ChatboatPage from './src/pages/services/Chatboat';
import ExercisePage from './src/pages/services/Excercise';
import ContactPage from './src/pages/ContactPage'; // New import
import NotificationsPage from './src/pages/student/Notification';

// Protected Route Component
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (!loading && isAuthenticated && allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user role
      const dashboardPath = `/${user.role}/dashboard`;
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, loading, user, allowedRoles, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || (allowedRoles && user?.role && !allowedRoles.includes(user.role))) {
    return null; // Navigation will be handled by the useEffect
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Layout>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/contact" element={<ContactPage />} />
            
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
            <Route path="/notifications" element={
              <ProtectedRoute allowedRoles={['student']}>
                <NotificationsPage />
              </ProtectedRoute>
            } />

            {/* Public Service Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/chatboat" element={<ChatboatPage />} />
            <Route path="/services/exercise" element={<ExercisePage />} />

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
