import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { NotificationProvider } from './context/NotificationContext';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import EventDetailPage from './pages/EventDetailPage';
import EventFormPage from './pages/EventFormPage';
import DashboardPage from './pages/DashboardPage';
import NotificationsPage from './pages/NotificationsPage';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Component to handle protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true; // In a real app, this would check auth status
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <NotificationProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              
              <main className="flex-grow bg-gray-50">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/event/:id" element={<EventDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/event/create" element={<EventFormPage />} />
                  <Route path="/event/:id/edit" element={<EventFormPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  
                  {/* Fallback Route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              
              <Footer />
            </div>
          </Router>
        </NotificationProvider>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;