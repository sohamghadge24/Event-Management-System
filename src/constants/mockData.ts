import { Event, User, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'organizer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'attendee',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date('2023-01-05')
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    role: 'organizer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date('2023-03-10')
  }
];

// Mock Events
const futureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year, featuring industry leaders and innovative workshops.',
    organizerId: '1',
    startDate: futureDate(30),
    endDate: futureDate(32),
    location: {
      name: 'Tech Convention Center',
      address: '123 Innovation Blvd',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    banner: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 1000,
    isPublic: true,
    tags: ['technology', 'conference', 'networking'],
    ticketTypes: [
      {
        id: '1',
        name: 'General Admission',
        price: 199.99,
        quantity: 800,
        description: 'Access to all keynotes and exhibitor hall',
        availableUntil: futureDate(25)
      },
      {
        id: '2',
        name: 'VIP Pass',
        price: 499.99,
        quantity: 200,
        description: 'Priority seating, exclusive networking events, and swag bag',
        availableUntil: futureDate(20)
      }
    ],
    attendees: [],
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: '2',
    title: 'Annual Charity Gala',
    description: 'An elegant evening raising funds for education initiatives in underserved communities.',
    organizerId: '4',
    startDate: futureDate(45),
    endDate: futureDate(45),
    location: {
      name: 'Grand Ballroom',
      address: '789 Charity Lane',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    banner: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 350,
    isPublic: true,
    tags: ['charity', 'gala', 'fundraiser'],
    ticketTypes: [
      {
        id: '3',
        name: 'Single Ticket',
        price: 250,
        quantity: 300,
        description: 'Includes dinner and entertainment',
        availableUntil: futureDate(40)
      },
      {
        id: '4',
        name: 'Table Sponsorship',
        price: 2000,
        quantity: 25,
        description: 'Reserved table for 8 guests with premium wine selection',
        availableUntil: futureDate(35)
      }
    ],
    attendees: [],
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: '3',
    title: 'Workshop: Digital Marketing Essentials',
    description: 'Learn the fundamentals of digital marketing in this hands-on workshop led by industry experts.',
    organizerId: '1',
    startDate: futureDate(15),
    endDate: futureDate(15),
    location: {
      name: 'Business Innovation Hub',
      address: '456 Marketing Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    banner: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 50,
    isPublic: true,
    tags: ['workshop', 'marketing', 'professional development'],
    ticketTypes: [
      {
        id: '5',
        name: 'Workshop Ticket',
        price: 129.99,
        quantity: 50,
        description: 'Full-day workshop with lunch included',
        availableUntil: futureDate(10)
      }
    ],
    attendees: [],
    createdAt: new Date('2024-07-25'),
    updatedAt: new Date('2024-07-25')
  },
  {
    id: '4',
    title: 'Summer Music Festival',
    description: 'Three days of amazing performances across multiple genres, featuring both established artists and emerging talents.',
    organizerId: '4',
    startDate: futureDate(60),
    endDate: futureDate(62),
    location: {
      name: 'Riverside Park',
      address: '321 Festival Way',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA'
    },
    banner: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 5000,
    isPublic: true,
    tags: ['music', 'festival', 'entertainment'],
    ticketTypes: [
      {
        id: '6',
        name: 'Day Pass',
        price: 89.99,
        quantity: 3000,
        description: 'Single day admission',
        availableUntil: futureDate(55)
      },
      {
        id: '7',
        name: 'Weekend Pass',
        price: 229.99,
        quantity: 2000,
        description: 'Full weekend admission',
        availableUntil: futureDate(50)
      },
      {
        id: '8',
        name: 'VIP Weekend',
        price: 449.99,
        quantity: 500,
        description: 'Full weekend with VIP lounge access, fast-track entry, and exclusive viewing areas',
        availableUntil: futureDate(45)
      }
    ],
    attendees: [],
    createdAt: new Date('2024-06-30'),
    updatedAt: new Date('2024-07-05')
  }
];

// Populate some attendees for the events
mockEvents[0].attendees = [
  {
    id: '1',
    userId: '2',
    eventId: '1',
    ticketTypeId: '1',
    status: 'registered',
    registeredAt: new Date('2024-08-05')
  }
];

mockEvents[2].attendees = [
  {
    id: '2',
    userId: '2',
    eventId: '3',
    ticketTypeId: '5',
    status: 'registered',
    registeredAt: new Date('2024-08-10')
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    title: 'Registration Confirmed',
    message: 'Your registration for Tech Conference 2025 has been confirmed.',
    type: 'event',
    read: false,
    createdAt: new Date('2024-08-05')
  },
  {
    id: '2',
    userId: '2',
    title: 'Event Reminder',
    message: 'Workshop: Digital Marketing Essentials is happening in 2 days.',
    type: 'reminder',
    read: false,
    createdAt: new Date('2024-08-13')
  },
  {
    id: '3',
    userId: '1',
    title: 'New Attendee',
    message: 'Sarah Williams has registered for your Tech Conference 2025 event.',
    type: 'update',
    read: true,
    createdAt: new Date('2024-08-05')
  }
];

// Current user (for demo purposes)
export const currentUser: User = {
  ...mockUsers[0],
};