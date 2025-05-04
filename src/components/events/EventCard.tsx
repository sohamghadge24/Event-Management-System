import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact';
}

const EventCard: React.FC<EventCardProps> = ({ event, variant = 'default' }) => {
  const { id, title, description, startDate, endDate, location, banner, tags, capacity, attendees } = event;
  
  const formattedDate = format(new Date(startDate), 'EEE, MMM d, yyyy');
  const formattedTime = format(new Date(startDate), 'h:mm a');
  const availableSpots = capacity - attendees.length;
  const percentFilled = Math.round((attendees.length / capacity) * 100);
  
  // truncate description based on variant
  const truncateDescription = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };
  
  const descriptionLength = variant === 'compact' ? 80 : 120;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md" hover>
      <div className="relative">
        <img 
          src={banner} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant={index % 3 === 0 ? 'default' : index % 3 === 1 ? 'secondary' : 'accent'}
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold line-clamp-2">
          <Link to={`/event/${id}`} className="hover:text-purple-600 transition-colors">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 text-sm mb-4">
          {truncateDescription(description, descriptionLength)}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-purple-500 mr-2" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 text-purple-500 mr-2" />
            <span>{formattedTime}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-purple-500 mr-2" />
            <span className="truncate">{location.city}, {location.state}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 text-purple-500 mr-2" />
            <span>{attendees.length} of {capacity} spots filled</span>
          </div>
          
          {/* Show capacity indicator */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className={`rounded-full h-2 ${
                percentFilled > 80 ? 'bg-amber-500' : 'bg-teal-500'
              }`}
              style={{ width: `${percentFilled}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link to={`/event/${id}`} className="w-full">
          <Button variant="default" fullWidth>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;