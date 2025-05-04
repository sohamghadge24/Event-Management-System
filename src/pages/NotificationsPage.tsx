import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import NotificationList from '../components/notifications/NotificationList';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserNotifications, markAsRead, markAllAsRead } = useNotifications();
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold mb-6">Please log in to view your notifications</h1>
        <Link to="/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }
  
  const notifications = getUserNotifications(user.id);
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-gray-600">Stay updated with your events and activities</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <NotificationList
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={() => markAllAsRead(user.id)}
          emptyMessage="You don't have any notifications yet"
        />
      </div>
    </div>
  );
};

export default NotificationsPage;