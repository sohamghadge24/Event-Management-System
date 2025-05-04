import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { Button } from '../components/ui/Button';
import { Event } from '../types';

const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserEvents } = useEvents();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold mb-6">Please log in to view your calendar</h1>
        <Link to="/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }
  
  const userEvents = getUserEvents(user.id);
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };
  
  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    
    return (
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="font-bold text-lg">
          {format(currentMonth, dateFormat)}
        </div>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };
  
  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    const startDate = startOfWeek(currentMonth);
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-sm text-gray-600 py-2">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    
    return <div className="grid grid-cols-7">{days}</div>;
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    
    // For events lookup by date string
    const eventsByDate: Record<string, Event[]> = {};
    userEvents.forEach(event => {
      const dateStr = format(new Date(event.startDate), 'yyyy-MM-dd');
      if (!eventsByDate[dateStr]) {
        eventsByDate[dateStr] = [];
      }
      eventsByDate[dateStr].push(event);
    });
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dateStr = format(day, 'yyyy-MM-dd');
        const cloneDay = day;
        const dayEvents = eventsByDate[dateStr] || [];
        
        days.push(
          <div
            key={dateStr}
            className={`min-h-[100px] p-2 border border-gray-200 ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-400 bg-gray-50'
                : isSameDay(day, selectedDate)
                ? 'bg-purple-50 border-purple-200'
                : ''
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between items-start">
              <span className={`text-sm font-medium ${
                isSameDay(day, new Date()) ? 'bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
              }`}>
                {format(day, 'd')}
              </span>
            </div>
            
            <div className="mt-1 space-y-1">
              {dayEvents.map((event, idx) => (
                <Link 
                  key={idx} 
                  to={`/event/${event.id}`}
                  className="block text-xs bg-purple-100 text-purple-800 p-1 rounded truncate hover:bg-purple-200"
                >
                  {format(new Date(event.startDate), 'h:mm a')} - {event.title}
                </Link>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={format(day, 'yyyy-MM-dd')} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="border-t border-l">{rows}</div>;
  };
  
  const renderSelectedDateEvents = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const selectedDateEvents = userEvents.filter(event => 
      format(new Date(event.startDate), 'yyyy-MM-dd') === dateStr
    );
    
    if (selectedDateEvents.length === 0) {
      return (
        <div className="text-center py-6">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-900">No events on {format(selectedDate, 'MMMM d, yyyy')}</h3>
          {user.role === 'organizer' && (
            <Link to="/event/create" className="mt-4 inline-block">
              <Button>Create Event</Button>
            </Link>
          )}
        </div>
      );
    }
    
    return (
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Events on {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        
        <div className="space-y-3">
          {selectedDateEvents.map(event => (
            <Link 
              key={event.id}
              to={`/event/${event.id}`}
              className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all"
            >
              <p className="font-medium">{event.title}</p>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 text-purple-500 mr-1" />
                  {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-gray-600">View your events and registrations</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {renderSelectedDateEvents()}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;