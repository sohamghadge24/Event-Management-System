import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, Tag } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import EventList from '../components/events/EventList';
import { Badge } from '../components/ui/Badge';
import { Event } from '../types';

const ExplorePage: React.FC = () => {
  const { events } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract all unique categories/tags from events
  const allCategories = Array.from(
    new Set(events.flatMap(event => event.tags))
  ).sort();
  
  useEffect(() => {
    // Filter events based on search query and selected categories
    let filtered = [...events];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.city.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event => 
        event.tags.some(tag => selectedCategories.includes(tag))
      );
    }
    
    // Sort by upcoming dates
    filtered.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    
    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedCategories]);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Events</h1>
        <p className="text-gray-600">Discover amazing events happening around you</p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, categories, or locations..."
                className="w-full h-11 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-11 w-full flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {selectedCategories.length > 0 && (
                <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                  {selectedCategories.length}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategories.includes(category)
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Input
                  label="Date"
                  type="date"
                />
              </div>
              
              <div>
                <Input
                  label="Location"
                  type="text"
                  placeholder="City, State, or Country"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select className="w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Any Price</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select className="w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="date-asc">Date (Upcoming first)</option>
                  <option value="date-desc">Date (Latest first)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="popular">Popularity</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
              
              <Button size="sm">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Active Filters */}
      {selectedCategories.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategories.map(category => (
              <Badge 
                key={category}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {category}
                <span className="text-gray-500 ml-1">&times;</span>
              </Badge>
            ))}
            <button 
              className="text-sm text-purple-600 hover:text-purple-800 ml-2"
              onClick={clearFilters}
            >
              Clear all
            </button>
          </div>
        </div>
      )}
      
      {/* Results Stats */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
        </p>
      </div>
      
      {/* Events Grid */}
      <EventList 
        events={filteredEvents} 
        layout="grid" 
        emptyMessage="No events match your search criteria"
      />
    </div>
  );
};

export default ExplorePage;