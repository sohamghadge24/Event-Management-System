// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Calendar, Users, ArrowRight } from 'lucide-react';
// import { Button } from '../components/ui/Button';
// import EventList from '../components/events/EventList';
// import { useEvents } from '../context/EventContext';
// import '../Style /homePage.css';

// const HomePage: React.FC = () => {
//   const { events } = useEvents();
  
//   // Get upcoming events for the featured section
//   const upcomingEvents = events
//     .filter(event => new Date(event.startDate) > new Date())
//     .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
//     .slice(0, 4);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section */}
//       <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-900 to-purple-600 text-white">
//         <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//               <span className="block">Create, Manage, and</span>
//               <span className="block">Experience Great Events</span>
//             </h1>
//             <p className="text-lg md:text-xl opacity-90 mb-8">
//               Your all-in-one platform for organizing and attending unforgettable events, from conferences to workshops, weddings to concerts.
//             </p>
//             <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//               <Link to="/explore">
//                 <Button size="lg" className="w-full sm:w-auto">
//                   Explore Events
//                 </Button>
//               </Link>
//               <Link to="/event/create">
//                 <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/20">
//                   Create Event
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
        
//         {/* Search Bar - floating below the hero */}
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 mt-12 -mb-16 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search events..."
//                   className="w-full h-11 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//             <div className="flex-1">
//               <select className="w-full h-11 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                 <option value="">All Categories</option>
//                 <option value="conference">Conferences</option>
//                 <option value="workshop">Workshops</option>
//                 <option value="music">Music & Concerts</option>
//                 <option value="charity">Charity & Fundraisers</option>
//                 <option value="networking">Networking</option>
//               </select>
//             </div>
//             <div>
//               <Button fullWidth className="h-11">Search</Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 bg-white mt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl font-bold mb-4">Everything You Need For Successful Events</h2>
//             <p className="text-lg text-gray-600">
//               Our comprehensive tools make event management simpler and more effective
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
//               <div className="p-3 bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-5">
//                 <Calendar className="h-7 w-7 text-purple-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Easy Event Creation</h3>
//               <p className="text-gray-600">
//                 Create beautiful event pages with all the details your attendees need, from schedules to ticket options.
//               </p>
//             </div>
            
//             <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
//               <div className="p-3 bg-teal-100 rounded-full w-14 h-14 flex items-center justify-center mb-5">
//                 <Users className="h-7 w-7 text-teal-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Attendee Management</h3>
//               <p className="text-gray-600">
//                 Track registrations, send communications, and manage check-ins with our powerful attendee tools.
//               </p>
//             </div>
            
//             <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
//               <div className="p-3 bg-coral-100 rounded-full w-14 h-14 flex items-center justify-center mb-5">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral-600">
//                   <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
//                   <path d="M15 9.354a4 4 0 1 0 0 5.292" />
//                   <line x1="15" y1="12" x2="22" y2="12" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Integrated Ticketing</h3>
//               <p className="text-gray-600">
//                 Sell tickets with flexible pricing options and manage revenue streams all in one place.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Featured Events Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center mb-12">
//             <h2 className="text-3xl font-bold">Upcoming Events</h2>
//             <Link to="/explore" className="text-purple-600 hover:text-purple-700 flex items-center transition-colors">
//               View all events
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//           </div>
          
//           <EventList events={upcomingEvents} layout="grid" />
          
//           {upcomingEvents.length === 0 && (
//             <div className="text-center py-12">
//               <h3 className="text-xl font-medium text-gray-900 mb-2">No upcoming events</h3>
//               <p className="text-gray-500 mb-6">Be the first to create an amazing event!</p>
//               <Link to="/event/create">
//                 <Button>Create Event</Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>
      
//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-br from-teal-900 to-teal-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Own Event?</h2>
//           <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
//             Join thousands of event organizers who are creating memorable experiences for their attendees.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <Link to="/register">
//               <Button size="lg" className="w-full sm:w-auto bg-white text-teal-700 hover:bg-gray-100">
//                 Get Started
//               </Button>
//             </Link>
//             <Link to="/about">
//               <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 hover:bg-white/10">
//                 Learn More
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Search, Ticket, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import EventList from '../components/events/EventList';
import { useEvents } from '../context/EventContext';

const HomePage: React.FC = () => {
  const { events } = useEvents();

  const upcomingEvents = events
    .filter(event => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/event-bg.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 py-24 px-6 lg:px-16 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Plan. Promote. Host. <br />
            <span className="text-purple-200">All-in-One Event Platform</span>
          </h1>
          <p className="text-lg opacity-90 mb-10">
            Discover, create, and manage events effortlessly — for professionals, communities, and brands.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/explore">
              <Button size="lg" className="w-full sm:w-auto">Browse Events</Button>
            </Link>
            <Link to="/event/create">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10">
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="relative -mt-10 z-20 max-w-5xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for events..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select className="w-full py-2 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500">
            <option>All Categories</option>
            <option>Conferences</option>
            <option>Workshops</option>
            <option>Concerts</option>
            <option>Networking</option>
          </select>
          <Button fullWidth className="py-2">Search</Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Professional Tools for Every Organizer</h2>
          <p className="text-lg text-gray-600 mb-16">
            Seamlessly handle events of any scale with advanced features and intuitive design.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="w-6 h-6 text-purple-600" />}
              title="Easy Scheduling"
              description="Quickly publish events with custom time, location, and more."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-indigo-600" />}
              title="Guest Management"
              description="Track attendance, invite guests, and streamline communications."
            />
            <FeatureCard
              icon={<Ticket className="w-6 h-6 text-rose-600" />}
              title="Ticketing & Payments"
              description="Set up free or paid tickets and track sales with real-time analytics."
            />
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Link to="/explore" className="text-purple-600 hover:text-purple-700 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          {upcomingEvents.length > 0 ? (
            <EventList events={upcomingEvents} layout="grid" />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No upcoming events yet</h3>
              <p className="text-gray-500 mb-6">Be the first to launch an amazing experience!</p>
              <Link to="/event/create">
                <Button>Create Your Event</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-800 to-purple-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Empower Your Event Journey</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of creators and make your events stand out — with ease and impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-white text-purple-800 hover:bg-gray-100">Get Started</Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 hover:bg-white/10">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6 text-left">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HomePage;
