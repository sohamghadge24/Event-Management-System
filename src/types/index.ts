export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'attendee' | 'admin';
  avatar: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizerId: string;
  organizer?: User;
  startDate: Date;
  endDate: Date;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  banner: string;
  capacity: number;
  isPublic: boolean;
  tags: string[];
  ticketTypes: TicketType[];
  attendees: Attendee[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  availableUntil: Date;
}

export interface Attendee {
  id: string;
  userId: string;
  user?: User;
  eventId: string;
  ticketTypeId: string;
  status: 'registered' | 'checked-in' | 'cancelled';
  registeredAt: Date;
  checkedInAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'event' | 'reminder' | 'update' | 'system';
  read: boolean;
  createdAt: Date;
}