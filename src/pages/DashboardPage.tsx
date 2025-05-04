import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusSquare, Calendar, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/ui/Button';
import EventList from '../components/events/EventList';
import DashboardStats from '../components/dashboard/DashboardStats';
import NotificationList from '../components/notifications/NotificationList';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { events, getUserEvents } = useEvents();
  const { getUserNotifications, markAsRead, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState<'events' | 'notifications'>('events');
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold mb-6">Please log in to view your dashboard</h1>
        <Link to="/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }
  
  const userEvents = getUserEvents(user.id);
  const notifications = getUserNotifications(user.id);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>
        
        {user.role === 'organizer' && (
          <Link to="/event/create">
            <Button className="flex items-center">
              <PlusSquare className="h-4 w-4 mr-2" />
              Create New Event
            </Button>
          </Link>
        )}
      </div>
      
      {/* Stats Cards */}
      <DashboardStats user={user} userEvents={userEvents} />
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex -mb-px">
          <button
            className={`py-4 px-4 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'events'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('events')}
          >
            My Events
          </button>
          <button
            className={`py-4 px-4 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'notifications'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'events' ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {user.role === 'organizer' ? 'Your Events' : 'Your Registered Events'}
            </h2>
            <EventList 
              events={userEvents} 
              emptyMessage={
                user.role === 'organizer'
                  ? "You haven't created any events yet"
                  : "You haven't registered for any events yet"
              }
            />
          </div>
          
          {user.role === 'organizer' && userEvents.length === 0 && (
            <div className="flex justify-center mt-8">
              <Link to="/event/create">
                <Button>Create Your First Event</Button>
              </Link>
            </div>
          )}
          
          {user.role === 'attendee' && userEvents.length === 0 && (
            <div className="flex justify-center mt-8">
              <Link to="/explore">
                <Button>Explore Events</Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <NotificationList
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={() => markAllAsRead(user.id)}
        />
      )}
    </div>
  );
};

export default DashboardPage;