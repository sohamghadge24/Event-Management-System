import React from 'react';
import { Bell, BellOff, CalendarDays, Info, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { Notification } from '../../types';
import { Button } from '../ui/Button';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  emptyMessage?: string;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  emptyMessage = 'No notifications yet'
}) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <BellOff className="h-12 w-12 text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">{emptyMessage}</h3>
        <p className="text-gray-500 max-w-md">
          We'll notify you when there are new events or updates to your registrations.
        </p>
      </div>
    );
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Bell className="h-5 w-5 text-purple-500" />;
      case 'reminder':
        return <CalendarDays className="h-5 w-5 text-amber-500" />;
      case 'update':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        {notifications.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`flex p-4 rounded-lg border ${
              notification.read 
                ? 'bg-white border-gray-200' 
                : 'bg-purple-50 border-purple-200'
            }`}
          >
            <div className="mr-4 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                <span className="text-xs text-gray-500">
                  {format(new Date(notification.createdAt), 'MMM d, h:mm a')}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              
              {!notification.read && (
                <div className="mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;