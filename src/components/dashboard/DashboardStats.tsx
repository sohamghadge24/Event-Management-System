import React from 'react';
import { CalendarDays, Users, Ticket, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Event, User } from '../../types';

interface DashboardStatsProps {
  user: User;
  userEvents: Event[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ user, userEvents }) => {
  // For organizers, show different stats than for attendees
  const isOrganizer = user.role === 'organizer';
  
  // Calculate stats for organizers
  const totalEvents = isOrganizer 
    ? userEvents.length 
    : 0;
  
  const totalAttendees = isOrganizer 
    ? userEvents.reduce((sum, event) => sum + event.attendees.length, 0)
    : 0;
  
  const upcomingEvents = userEvents.filter(
    event => new Date(event.startDate) > new Date()
  ).length;
  
  // Calculate stats for attendees
  const registeredEvents = !isOrganizer 
    ? userEvents.length
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {isOrganizer ? (
        <>
          <StatsCard 
            title="Total Events"
            value={totalEvents.toString()}
            icon={<CalendarDays className="h-8 w-8 text-purple-500" />}
            trend={totalEvents > 0 ? "+10%" : "0%"}
            trendDirection={totalEvents > 0 ? "up" : "neutral"}
          />
          
          <StatsCard 
            title="Total Attendees"
            value={totalAttendees.toString()}
            icon={<Users className="h-8 w-8 text-teal-500" />}
            trend={totalAttendees > 0 ? "+25%" : "0%"}
            trendDirection={totalAttendees > 0 ? "up" : "neutral"}
          />
          
          <StatsCard 
            title="Upcoming Events"
            value={upcomingEvents.toString()}
            icon={<CalendarDays className="h-8 w-8 text-blue-500" />}
            trend=""
            trendDirection="neutral"
          />
          
          <StatsCard 
            title="Revenue"
            value="$0"
            icon={<TrendingUp className="h-8 w-8 text-emerald-500" />}
            trend="+0%"
            trendDirection="neutral"
          />
        </>
      ) : (
        <>
          <StatsCard 
            title="Registered Events"
            value={registeredEvents.toString()}
            icon={<Ticket className="h-8 w-8 text-purple-500" />}
            trend=""
            trendDirection="neutral"
          />
          
          <StatsCard 
            title="Upcoming Events"
            value={upcomingEvents.toString()}
            icon={<CalendarDays className="h-8 w-8 text-teal-500" />}
            trend=""
            trendDirection="neutral"
          />
          
          <StatsCard 
            title="Past Events"
            value={(registeredEvents - upcomingEvents).toString()}
            icon={<CalendarDays className="h-8 w-8 text-gray-500" />}
            trend=""
            trendDirection="neutral"
          />
          
          <StatsCard 
            title="Total Spent"
            value="$0"
            icon={<TrendingUp className="h-8 w-8 text-amber-500" />}
            trend=""
            trendDirection="neutral"
          />
        </>
      )}
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, trendDirection }) => {
  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up': return 'text-emerald-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            
            {trend && (
              <p className={`text-xs mt-2 ${getTrendColor()}`}>
                {trend} from last month
              </p>
            )}
          </div>
          
          <div className="p-2 rounded-lg bg-gray-50">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStats;