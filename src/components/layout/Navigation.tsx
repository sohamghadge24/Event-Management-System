// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   Calendar, 
//   User, 
//   Bell, 
//   Menu, 
//   X, 
//   LogOut, 
//   Settings,
//   PlusSquare,
//   Search
// } from 'lucide-react';
// import { Button } from '../ui/Button';
// import { useAuth } from '../../context/AuthContext';
// import { useNotifications } from '../../context/NotificationContext';
// import { Badge } from '../ui/Badge';

// const Navigation: React.FC = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const { unreadCount } = useNotifications();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const location = useLocation();

//   const notificationCount = user ? unreadCount(user.id) : 0;

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
//   const closeAll = () => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   };

//   const isActive = (path: string) => {
//     return location.pathname === path;
//   };

//   return (
//     <nav className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo and main nav */}
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" onClick={closeAll} className="text-purple-600 font-bold text-xl">
//                 EventFlow
//               </Link>
//             </div>
            
//             {/* Desktop menu */}
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link 
//                 to="/" 
//                 onClick={closeAll}
//                 className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                   isActive('/') 
//                     ? 'border-purple-500 text-gray-900' 
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Home
//               </Link>
//               <Link 
//                 to="/explore" 
//                 onClick={closeAll}
//                 className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                   isActive('/explore') 
//                     ? 'border-purple-500 text-gray-900' 
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Explore
//               </Link>
//               {isAuthenticated && (
//                 <>
//                   <Link 
//                     to="/dashboard" 
//                     onClick={closeAll}
//                     className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                       isActive('/dashboard') 
//                         ? 'border-purple-500 text-gray-900' 
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link 
//                     to="/calendar" 
//                     onClick={closeAll}
//                     className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                       isActive('/calendar') 
//                         ? 'border-purple-500 text-gray-900' 
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     Calendar
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
          
//           {/* Right side items */}
//           <div className="flex items-center">
//             {/* Search icon */}
//             <Link 
//               to="/search"
//               className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
//               onClick={closeAll}
//             >
//               <Search className="h-5 w-5" />
//             </Link>
            
//             {isAuthenticated ? (
//               <div className="flex items-center">
//                 {/* Create event button - only visible to organizers */}
//                 {user?.role === 'organizer' && (
//                   <Link 
//                     to="/event/create"
//                     onClick={closeAll}
//                     className="hidden md:inline-flex ml-3"
//                   >
//                     <Button size="sm" className="flex items-center">
//                       <PlusSquare className="h-4 w-4 mr-1" />
//                       Create Event
//                     </Button>
//                   </Link>
//                 )}

//                 {/* Notifications */}
//                 <Link 
//                   to="/notifications"
//                   className="ml-4 p-2 text-gray-500 hover:text-purple-600 transition-colors relative"
//                   onClick={closeAll}
//                 >
//                   <Bell className="h-5 w-5" />
//                   {notificationCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                       {notificationCount > 9 ? '9+' : notificationCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* Profile dropdown */}
//                 <div className="ml-3 relative">
//                   <div>
//                     <button
//                       type="button"
//                       className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//                       id="user-menu"
//                       aria-expanded="false"
//                       aria-haspopup="true"
//                       onClick={toggleProfile}
//                     >
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-8 w-8 rounded-full object-cover"
//                         src={user?.avatar}
//                         alt={user?.name}
//                       />
//                     </button>
//                   </div>

//                   {/* Profile dropdown menu */}
//                   {isProfileOpen && (
//                     <div
//                       className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
//                       role="menu"
//                       aria-orientation="vertical"
//                       aria-labelledby="user-menu"
//                     >
//                       <div className="px-4 py-2 border-b border-gray-100">
//                         <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
//                         <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                         <Badge className="mt-1" variant={
//                           user?.role === 'organizer' ? 'default' :
//                           user?.role === 'attendee' ? 'secondary' :
//                           'accent'
//                         }>
//                           {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
//                         </Badge>
//                       </div>
//                       <Link
//                         to="/profile"
//                         onClick={closeAll}
//                         className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         <User className="mr-2 h-4 w-4" />
//                         Your Profile
//                       </Link>
//                       <Link
//                         to="/settings"
//                         onClick={closeAll}
//                         className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         <Settings className="mr-2 h-4 w-4" />
//                         Settings
//                       </Link>
//                       <button
//                         onClick={() => {
//                           logout();
//                           closeAll();
//                         }}
//                         className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         <LogOut className="mr-2 h-4 w-4" />
//                         Sign out
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center">
//                 <Link to="/login" onClick={closeAll}>
//                   <Button variant="ghost" size="sm" className="ml-2">
//                     Sign In
//                   </Button>
//                 </Link>
//                 <Link to="/register" onClick={closeAll} className="hidden sm:inline-flex">
//                   <Button size="sm" className="ml-2">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </div>
//             )}

//             {/* Mobile menu button */}
//             <div className="flex items-center sm:hidden ml-4">
//               <button
//                 type="button"
//                 className="p-2 rounded-md inline-flex items-center justify-center text-gray-500 hover:text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
//                 aria-controls="mobile-menu"
//                 aria-expanded="false"
//                 onClick={toggleMenu}
//               >
//                 <span className="sr-only">Open main menu</span>
//                 {isMenuOpen ? (
//                   <X className="block h-6 w-6" aria-hidden="true" />
//                 ) : (
//                   <Menu className="block h-6 w-6" aria-hidden="true" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="sm:hidden" id="mobile-menu">
//           <div className="pt-2 pb-3 space-y-1">
//             <Link
//               to="/"
//               onClick={closeAll}
//               className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//                 isActive('/') 
//                   ? 'border-purple-500 text-purple-700 bg-purple-50' 
//                   : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               to="/explore"
//               onClick={closeAll}
//               className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//                 isActive('/explore') 
//                   ? 'border-purple-500 text-purple-700 bg-purple-50' 
//                   : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
//               }`}
//             >
//               Explore
//             </Link>
//             {isAuthenticated && (
//               <>
//                 <Link
//                   to="/dashboard"
//                   onClick={closeAll}
//                   className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//                     isActive('/dashboard') 
//                       ? 'border-purple-500 text-purple-700 bg-purple-50' 
//                       : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
//                   }`}
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/calendar"
//                   onClick={closeAll}
//                   className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//                     isActive('/calendar') 
//                       ? 'border-purple-500 text-purple-700 bg-purple-50' 
//                       : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <Calendar className="h-5 w-5 mr-2" />
//                     Calendar
//                   </div>
//                 </Link>
//                 <Link
//                   to="/notifications"
//                   onClick={closeAll}
//                   className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//                     isActive('/notifications') 
//                       ? 'border-purple-500 text-purple-700 bg-purple-50' 
//                       : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <Bell className="h-5 w-5 mr-2" />
//                     Notifications
//                     {notificationCount > 0 && (
//                       <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                         {notificationCount > 9 ? '9+' : notificationCount}
//                       </span>
//                     )}
//                   </div>
//                 </Link>
//                 {user?.role === 'organizer' && (
//                   <Link
//                     to="/event/create"
//                     onClick={closeAll}
//                     className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-purple-600 hover:text-purple-800 hover:bg-gray-50 hover:border-purple-300"
//                   >
//                     <div className="flex items-center">
//                       <PlusSquare className="h-5 w-5 mr-2" />
//                       Create Event
//                     </div>
//                   </Link>
//                 )}
//               </>
//             )}
//           </div>
          
//           {!isAuthenticated && (
//             <div className="pt-4 pb-3 border-t border-gray-200">
//               <div className="flex items-center px-4">
//                 <div className="flex flex-col space-y-2 w-full">
//                   <Link 
//                     to="/login" 
//                     onClick={closeAll}
//                     className="w-full"
//                   >
//                     <Button variant="outline" fullWidth>Sign In</Button>
//                   </Link>
//                   <Link 
//                     to="/register" 
//                     onClick={closeAll}
//                     className="w-full"
//                   >
//                     <Button fullWidth>Sign Up</Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  User,
  Bell,
  Menu,
  X,
  LogOut,
  Settings,
  PlusSquare,
  Search
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Badge } from '../ui/Badge';

const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const notificationCount = user ? unreadCount(user.id) : 0;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeAll = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              onClick={closeAll}
              className="text-purple-600 font-bold text-2xl tracking-tight"
            >
              EventFlow
            </Link>
            <div className="hidden sm:flex space-x-10">
              <Link
                to="/"
                onClick={closeAll}
                className={`text-sm font-medium transition duration-200 border-b-2 px-3 pt-1 ${
                  isActive('/')
                    ? 'text-gray-900 border-purple-600'
                    : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                Home
              </Link>
              <Link
                to="/explore"
                onClick={closeAll}
                className={`text-sm font-medium transition duration-200 border-b-2 px-3 pt-1 ${
                  isActive('/explore')
                    ? 'text-gray-900 border-purple-600'
                    : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                Explore
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeAll}
                    className={`text-sm font-medium transition duration-200 border-b-2 px-3 pt-1 ${
                      isActive('/dashboard')
                        ? 'text-gray-900 border-purple-600'
                        : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/calendar"
                    onClick={closeAll}
                    className={`text-sm font-medium transition duration-200 border-b-2 px-3 pt-1 ${
                      isActive('/calendar')
                        ? 'text-gray-900 border-purple-600'
                        : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    Calendar
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-purple-600 transition"
              onClick={closeAll}
            >
              <Search className="h-5 w-5" />
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'organizer' && (
                  <Link to="/event/create" onClick={closeAll} className="hidden md:inline-flex">
                    <Button size="sm" className="flex items-center">
                      <PlusSquare className="h-4 w-4 mr-1" /> Create Event
                    </Button>
                  </Link>
                )}

                <Link
                  to="/notifications"
                  className="relative p-2 text-gray-500 hover:text-purple-600 hover:bg-gray-100 rounded-full"
                  onClick={closeAll}
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleProfile}
                    className="flex items-center focus:outline-none rounded-full border border-gray-300 hover:ring-2 hover:ring-purple-400"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user?.avatar}
                      alt={user?.name}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        <Badge className="mt-1" variant={user?.role === 'organizer' ? 'default' : 'secondary'}>
                          {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                        </Badge>
                      </div>
                      <Link to="/profile" onClick={closeAll} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="mr-2 h-4 w-4" /> Your Profile
                      </Link>
                      <Link to="/settings" onClick={closeAll} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Link>
                      <button onClick={() => { logout(); closeAll(); }} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogOut className="mr-2 h-4 w-4" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" onClick={closeAll}>
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/register" onClick={closeAll}>
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="sm:hidden p-2 rounded-md text-gray-500 hover:text-purple-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="py-2 space-y-1">
            {['/', '/explore', '/dashboard', '/calendar', '/notifications'].map((path) => (
              (path === '/dashboard' || path === '/calendar' || path === '/notifications') && !isAuthenticated ? null : (
                <Link
                  key={path}
                  to={path}
                  onClick={closeAll}
                  className={`block px-4 py-2 text-base font-medium rounded-md ${
                    isActive(path) ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}
                </Link>
              )
            ))}

            {user?.role === 'organizer' && (
              <Link
                to="/event/create"
                onClick={closeAll}
                className="block px-4 py-2 text-base font-medium text-purple-600 hover:bg-gray-50"
              >
                Create Event
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
