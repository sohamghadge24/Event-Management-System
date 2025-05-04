import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Tag, 
  Users, 
  DollarSign,
  Image,
  X,
  Plus,
  Info,
  Save
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Event, TicketType } from '../types';

const EventFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getEvent, createEvent, updateEvent } = useEvents();
  
  const isEditMode = !!id;
  const existingEvent = id ? getEvent(id) : null;
  
  // Redirect if user is not logged in or not an organizer
  useEffect(() => {
    if (!user || user.role !== 'organizer') {
      navigate('/login');
    }
    
    // In edit mode, check if user is the organizer of this event
    if (isEditMode && existingEvent && existingEvent.organizerId !== user?.id) {
      navigate('/dashboard');
    }
  }, [user, navigate, isEditMode, existingEvent]);
  
  // Form state
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    locationName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    bannerUrl: string;
    capacity: number;
    isPublic: boolean;
    tags: string[];
    tagInput: string;
    ticketTypes: TicketType[];
  }>({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    locationName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    bannerUrl: '',
    capacity: 100,
    isPublic: true,
    tags: [],
    tagInput: '',
    ticketTypes: [{
      id: Date.now().toString(),
      name: 'General Admission',
      price: 0,
      quantity: 100,
      description: 'Standard ticket',
      availableUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    }]
  });
  
  // Load event data if in edit mode
  useEffect(() => {
    if (isEditMode && existingEvent) {
      const startDate = new Date(existingEvent.startDate);
      const endDate = new Date(existingEvent.endDate);
      
      setFormData({
        title: existingEvent.title,
        description: existingEvent.description,
        startDate: startDate.toISOString().slice(0, 10),
        startTime: startDate.toTimeString().slice(0, 5),
        endDate: endDate.toISOString().slice(0, 10),
        endTime: endDate.toTimeString().slice(0, 5),
        locationName: existingEvent.location.name,
        address: existingEvent.location.address,
        city: existingEvent.location.city,
        state: existingEvent.location.state,
        zipCode: existingEvent.location.zipCode,
        country: existingEvent.location.country,
        bannerUrl: existingEvent.banner,
        capacity: existingEvent.capacity,
        isPublic: existingEvent.isPublic,
        tags: [...existingEvent.tags],
        tagInput: '',
        ticketTypes: [...existingEvent.ticketTypes]
      });
    }
  }, [isEditMode, existingEvent]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.tagInput && !formData.tags.includes(formData.tagInput)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.toLowerCase()],
        tagInput: ''
      }));
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleAddTicketType = () => {
    const newTicket: TicketType = {
      id: Date.now().toString(),
      name: 'New Ticket Type',
      price: 0,
      quantity: 50,
      description: 'Ticket description',
      availableUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    };
    
    setFormData(prev => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, newTicket]
    }));
  };
  
  const handleTicketChange = (id: string, field: keyof TicketType, value: any) => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map(ticket => 
        ticket.id === id 
          ? { ...ticket, [field]: value } 
          : ticket
      )
    }));
  };
  
  const handleRemoveTicket = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter(ticket => ticket.id !== id)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Validate form
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Combine date and time
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime || '00:00'}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime || '23:59'}`);
    
    // Validate dates
    if (startDateTime >= endDateTime) {
      alert('End date must be after start date');
      return;
    }
    
    // Create event object
    const eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'attendees'> = {
      title: formData.title,
      description: formData.description,
      organizerId: user.id,
      startDate: startDateTime,
      endDate: endDateTime,
      location: {
        name: formData.locationName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      banner: formData.bannerUrl || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      capacity: formData.capacity,
      isPublic: formData.isPublic,
      tags: formData.tags,
      ticketTypes: formData.ticketTypes.map(ticket => ({
        ...ticket,
        price: Number(ticket.price),
        quantity: Number(ticket.quantity)
      }))
    };
    
    if (isEditMode && id) {
      // Update existing event
      updateEvent(id, eventData);
      navigate(`/event/${id}`);
    } else {
      // Create new event
      const newEvent = createEvent(eventData);
      navigate(`/event/${newEvent.id}`);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEditMode ? 'Edit Event' : 'Create New Event'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Info className="mr-2 h-5 w-5 text-purple-500" />
            Basic Information
          </h2>
          
          <div className="space-y-4">
            <Input
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Tech Conference 2025"
              required
            />
            
            <Textarea
              label="Event Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              className="min-h-[150px]"
              required
            />
            
            <Input
              label="Banner Image URL"
              name="bannerUrl"
              value={formData.bannerUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
            
            <div className="flex items-center">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                checked={formData.isPublic}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                Make this event public (visible to everyone)
              </label>
            </div>
          </div>
        </div>
        
        {/* Date and Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-purple-500" />
            Date and Time
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Input
                label="Start Time"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Input
                label="End Time"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-purple-500" />
            Location
          </h2>
          
          <div className="space-y-4">
            <Input
              label="Venue Name"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              placeholder="e.g., Conference Center"
              required
            />
            
            <Input
              label="Street Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main St"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              
              <Input
                label="State/Province"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              
              <Input
                label="ZIP/Postal Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
              
              <Input
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        {/* Tickets and Capacity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Users className="mr-2 h-5 w-5 text-purple-500" />
            Capacity and Tickets
          </h2>
          
          <div className="space-y-6">
            <Input
              label="Maximum Capacity"
              name="capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Types
              </label>
              
              <div className="space-y-4">
                {formData.ticketTypes.map((ticket, index) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Ticket Type {index + 1}</h4>
                      {formData.ticketTypes.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTicket(ticket.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Ticket Name"
                        value={ticket.name}
                        onChange={(e) => handleTicketChange(ticket.id, 'name', e.target.value)}
                        placeholder="e.g., General Admission"
                      />
                      
                      <Input
                        label="Price ($)"
                        type="number"
                        min="0"
                        step="0.01"
                        value={ticket.price}
                        onChange={(e) => handleTicketChange(ticket.id, 'price', Number(e.target.value))}
                      />
                      
                      <Input
                        label="Quantity Available"
                        type="number"
                        min="1"
                        value={ticket.quantity}
                        onChange={(e) => handleTicketChange(ticket.id, 'quantity', Number(e.target.value))}
                      />
                      
                      <Input
                        label="Available Until"
                        type="date"
                        value={new Date(ticket.availableUntil).toISOString().slice(0, 10)}
                        onChange={(e) => handleTicketChange(
                          ticket.id, 
                          'availableUntil', 
                          new Date(e.target.value)
                        )}
                      />
                      
                      <div className="md:col-span-2">
                        <Input
                          label="Description"
                          value={ticket.description}
                          onChange={(e) => handleTicketChange(ticket.id, 'description', e.target.value)}
                          placeholder="Describe what's included with this ticket"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={handleAddTicketType}
                className="mt-4 inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Another Ticket Type
              </button>
            </div>
          </div>
        </div>
        
        {/* Categories/Tags */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Tag className="mr-2 h-5 w-5 text-purple-500" />
            Categories
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Tags (helps people find your event)
              </label>
              
              <div className="flex">
                <input
                  type="text"
                  name="tagInput"
                  value={formData.tagInput}
                  onChange={handleChange}
                  placeholder="e.g., technology, conference, networking"
                  className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <div 
                  key={tag} 
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-purple-800 hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {formData.tags.length === 0 && (
                <div className="text-gray-500 text-sm">No tags added yet</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          
          <Button type="submit" className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            {isEditMode ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventFormPage;