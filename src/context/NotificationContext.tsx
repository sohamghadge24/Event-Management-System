import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification } from '../types';
import { mockNotifications } from '../constants/mockData';

interface NotificationContextType {
  notifications: Notification[];
  getUserNotifications: (userId: string) => Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: (userId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  hasUnreadNotifications: (userId: string) => boolean;
  unreadCount: (userId: string) => number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getUserNotifications = (userId: string): Notification[] => {
    return notifications.filter(notification => notification.userId === userId);
  };

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = (userId: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.userId === userId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date()
    };
    
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
  };

  const hasUnreadNotifications = (userId: string): boolean => {
    return notifications.some(
      notification => notification.userId === userId && !notification.read
    );
  };

  const unreadCount = (userId: string): number => {
    return notifications.filter(
      notification => notification.userId === userId && !notification.read
    ).length;
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      getUserNotifications,
      markAsRead,
      markAllAsRead,
      addNotification,
      hasUnreadNotifications,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  
  return context;
};