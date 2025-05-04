import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types';

interface EventListProps {
  events: Event[];
  title?: string;
  emptyMessage?: string;
  layout?: 'grid' | 'list';
  cardVariant?: 'default' | 'compact';
}

const EventList: React.FC<EventListProps> = ({
  events,
  title,
  emptyMessage = 'No events found',
  layout = 'grid',
  cardVariant = 'default'
}) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h3 className="text-xl font-medium text-gray-900 mb-2">{emptyMessage}</h3>
        <p className="text-gray-500">Try different filters or check back soon!</p>
      </div>
    );
  }

  const gridCols = layout === 'grid' 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
    : 'grid-cols-1';

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className={`grid ${gridCols} gap-6`}>
        {events.map(event => (
          <EventCard key={event.id} event={event} variant={cardVariant} />
        ))}
      </div>
    </div>
  );
};

export default EventList;