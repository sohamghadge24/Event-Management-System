import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  Share2, 
  Heart, 
  Edit, 
  Trash,
  ChevronDown,
  ChevronUp,
  Ticket
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { TicketType } from '../types';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getEvent, registerForEvent, cancelRegistration } = useEvents();
  const { addNotification } = useNotifications();
  const [selectedTicket, setSelectedTicket] = useState<string>('');
  const [showAllDescription, setShowAllDescription] = useState(false);
  
  if (!id) {
    navigate('/explore');
    return null;
  }
  
  const event = getEvent(id);
  
  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore">
          <Button>Explore Events</Button>
        </Link>
      </div>
    );
  }
  
  const { 
    title, 
    description, 
    startDate, 
    endDate, 
    organizerId,
    location, 
    banner,
    capacity,
    isPublic,
    tags,
    ticketTypes,
    attendees
  } = event;
  
  const formattedStartDate = format(new Date(startDate), 'EEE, MMMM d, yyyy');
  const formattedStartTime = format(new Date(startDate), 'h:mm a');
  const formattedEndTime = format(new Date(endDate), 'h:mm a');
  const availableSpots = capacity - attendees.length;
  const percentFilled = Math.round((attendees.length / capacity) * 100);
  
  const isOrganizer = user && user.id === organizerId;
  const isAttending = user && attendees.some(
    attendee => attendee.userId === user.id && attendee.status !== 'cancelled'
  );
  
  const handleRegister = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!selectedTicket) {
      alert('Please select a ticket type');
      return;
    }
    
    const result = registerForEvent(id, user.id, selectedTicket);
    
    if (result) {
      addNotification({
        userId: user.id,
        title: 'Registration Confirmed',
        message: `Your registration for ${title} has been confirmed.`,
        type: 'event',
        read: false
      });
      
      // Also notify the organizer
      addNotification({
        userId: organizerId,
        title: 'New Attendee',
        message: `${user.name} has registered for your ${title} event.`,
        type: 'update',
        read: false
      });
    }
  };
  
  const handleCancelRegistration = () => {
    if (!user) return;
    
    const result = cancelRegistration(id, user.id);
    
    if (result) {
      addNotification({
        userId: user.id,
        title: 'Registration Cancelled',
        message: `Your registration for ${title} has been cancelled.`,
        type: 'event',
        read: false
      });
    }
  };
  
  return (
    <div className="pb-12">
      {/* Banner Image */}
      <div className="h-64 md:h-96 bg-gray-300 relative">
        <img 
          src={banner} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        {/* Event Header Card */}
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant={index % 3 === 0 ? 'default' : index % 3 === 1 ? 'secondary' : 'accent'}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="mr-6">{formattedStartDate}</span>
                  
                  <Clock className="h-5 w-5 text-purple-500 mr-2" />
                  <span>{formattedStartTime} - {formattedEndTime}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 text-purple-500 mr-2" />
                  <span>
                    {location.name}, {location.address}, {location.city}, {location.state} {location.zipCode}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 text-purple-500 mr-2" />
                  <span>
                    {attendees.length} attendees - {availableSpots} spots left
                  </span>
                </div>
                
                {/* Capacity bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`rounded-full h-2 ${
                      percentFilled > 80 ? 'bg-amber-500' : 'bg-teal-500'
                    }`}
                    style={{ width: `${percentFilled}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="md:w-64 flex flex-col gap-4">
                {isOrganizer ? (
                  <>
                    <Link to={`/event/${id}/edit`}>
                      <Button fullWidth className="flex items-center justify-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Event
                      </Button>
                    </Link>
                    <Button variant="outline" fullWidth className="flex items-center justify-center">
                      <Users className="h-4 w-4 mr-2" />
                      View Attendees
                    </Button>
                  </>
                ) : isAttending ? (
                  <>
                    <div className="bg-emerald-100 text-emerald-800 font-medium px-4 py-2 rounded-md text-center mb-2">
                      You're attending this event
                    </div>
                    <Button 
                      variant="outline" 
                      fullWidth
                      onClick={handleCancelRegistration}
                    >
                      Cancel Registration
                    </Button>
                  </>
                ) : (
                  <>
                    {ticketTypes.length > 0 && (
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Ticket Type
                        </label>
                        <select
                          className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
                          value={selectedTicket}
                          onChange={(e) => setSelectedTicket(e.target.value)}
                        >
                          <option value="">Select a ticket</option>
                          {ticketTypes.map((ticket) => (
                            <option key={ticket.id} value={ticket.id}>
                              {ticket.name} - ${ticket.price.toFixed(2)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <Button 
                      fullWidth 
                      className="flex items-center justify-center"
                      onClick={handleRegister}
                      disabled={availableSpots === 0}
                    >
                      <Ticket className="h-4 w-4 mr-2" />
                      {availableSpots === 0 ? 'Sold Out' : 'Register Now'}
                    </Button>
                  </>
                )}
                
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                
                <div className={showAllDescription ? '' : 'relative max-h-48 overflow-hidden'}>
                  <p className="text-gray-700 whitespace-pre-line">
                    {description}
                  </p>
                  
                  {!showAllDescription && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                  )}
                </div>
                
                <button
                  className="mt-4 text-purple-600 hover:text-purple-800 font-medium flex items-center"
                  onClick={() => setShowAllDescription(!showAllDescription)}
                >
                  {showAllDescription ? (
                    <>
                      Show Less
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Read More
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Ticket Information</h3>
                
                {ticketTypes.length > 0 ? (
                  <div className="space-y-4">
                    {ticketTypes.map((ticket: TicketType) => (
                      <div key={ticket.id} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{ticket.name}</h4>
                            <p className="text-sm text-gray-600">{ticket.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">${ticket.price.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">
                              {ticket.quantity} available
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No ticket information available.</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Location</h3>
                
                <div className="mb-4">
                  <p className="font-medium">{location.name}</p>
                  <p className="text-gray-600">{location.address}</p>
                  <p className="text-gray-600">
                    {location.city}, {location.state} {location.zipCode}
                  </p>
                  <p className="text-gray-600">{location.country}</p>
                </div>
                
                <div className="bg-gray-200 h-48 rounded-md flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-600">Map view</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;