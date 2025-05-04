import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, TicketType, Attendee } from '../types';
import { mockEvents } from '../constants/mockData';

interface EventContextType {
  events: Event[];
  getEvent: (id: string) => Event | undefined;
  getUserEvents: (userId: string) => Event[];
  createEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'attendees'>) => Event;
  updateEvent: (id: string, updates: Partial<Event>) => Event | undefined;
  registerForEvent: (eventId: string, userId: string, ticketTypeId: string) => Attendee | undefined;
  cancelRegistration: (eventId: string, userId: string) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const getEvent = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  const getUserEvents = (userId: string): Event[] => {
    // For organizers, return events they created
    const createdEvents = events.filter(event => event.organizerId === userId);
    
    // For attendees, return events they're attending
    const attendingEvents = events.filter(event => 
      event.attendees.some(attendee => attendee.userId === userId)
    );
    
    return [...new Set([...createdEvents, ...attendingEvents])];
  };

  const createEvent = (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'attendees'>): Event => {
    const newEvent: Event = {
      ...event,
      id: Math.random().toString(36).substring(2, 11),
      attendees: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setEvents(prevEvents => [...prevEvents, newEvent]);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>): Event | undefined => {
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) return undefined;
    
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = {
      ...updatedEvents[eventIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    setEvents(updatedEvents);
    return updatedEvents[eventIndex];
  };

  const registerForEvent = (eventId: string, userId: string, ticketTypeId: string): Attendee | undefined => {
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) return undefined;
    
    // Check if user is already registered
    const isRegistered = events[eventIndex].attendees.some(
      attendee => attendee.userId === userId
    );
    
    if (isRegistered) return undefined;
    
    const newAttendee: Attendee = {
      id: Math.random().toString(36).substring(2, 11),
      userId,
      eventId,
      ticketTypeId,
      status: 'registered',
      registeredAt: new Date()
    };
    
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = {
      ...updatedEvents[eventIndex],
      attendees: [...updatedEvents[eventIndex].attendees, newAttendee]
    };
    
    setEvents(updatedEvents);
    return newAttendee;
  };

  const cancelRegistration = (eventId: string, userId: string): boolean => {
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) return false;
    
    const attendeeIndex = events[eventIndex].attendees.findIndex(
      attendee => attendee.userId === userId
    );
    
    if (attendeeIndex === -1) return false;
    
    const updatedEvents = [...events];
    const updatedAttendees = [...updatedEvents[eventIndex].attendees];
    
    // Update status to cancelled
    updatedAttendees[attendeeIndex] = {
      ...updatedAttendees[attendeeIndex],
      status: 'cancelled'
    };
    
    updatedEvents[eventIndex] = {
      ...updatedEvents[eventIndex],
      attendees: updatedAttendees
    };
    
    setEvents(updatedEvents);
    return true;
  };

  return (
    <EventContext.Provider value={{
      events,
      getEvent,
      getUserEvents,
      createEvent,
      updateEvent,
      registerForEvent,
      cancelRegistration
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  
  return context;
};