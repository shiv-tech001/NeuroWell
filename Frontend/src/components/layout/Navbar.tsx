import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../public/Logo.jpg';
// Lucide Icons (install: npm install lucide-react)
import { 
  LayoutDashboard, 
  BookText, 
  Users2, 
  HeartHandshake, 
  Mail, 
  Bell, 
  Search, 
  User,
  Calendar,
  GraduationCap,
  Settings,
  MessageSquare,
  Menu,
  X,
  Home,
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const studentNavLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/student/resources', label: 'Resources', icon: <BookText size={18} /> },
    { to: '/student/community', label: 'Community', icon: <Users2 size={18} /> },
    { to: '/services/services', label: 'Services', icon: <HeartHandshake size={18} /> },
    { to: '/contact', label: 'Contact', icon: <Mail size={18} /> },

  ];

  const counselorNavLinks = [
    { to: '/counselor/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/counselor/patients', label: 'Patients', icon: <Users2 size={18} /> },
    { to: '/counselor/appointments', label: 'Appointments', icon: <Calendar size={18} /> },
    { to: '/counselor/sessions', label: 'Sessions', icon: <MessageSquare size={18} /> },
  ];

  const adminNavLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/admin/users', label: 'Users', icon: <Users2 size={18} /> },
    { to: '/admin/counselors', label: 'Counselors', icon: <GraduationCap size={18} /> },
    { to: '/services/services', label: 'Services', icon: <HeartHandshake size={18} /> },
    { to: '/admin/analytics', label: 'Analytics', icon: <BookText size={18} /> },
    { to: '/contact', label: 'Contact', icon: <Mail size={18} /> },
    { to: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const landingNavLinks = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/services', label: 'Services', icon: <HeartHandshake size={18} /> },
    { to: '/student/resources', label: 'Resources', icon: <BookText size={18} /> },
    { to: '/contact', label: 'Contact', icon: <Mail size={18} /> },
  ];
  
  const authLinks = location.pathname === '/login' 
    ? [
        { to: '/login', label: 'Login', icon: <LogIn size={18} /> },
      ]
    : [
        { to: '/login', label: 'Login', icon: <LogIn size={18} /> },
        { to: '/register', label: 'Register', icon: <UserPlus size={18} /> },
      ];

  let currentNavLinks: { to: string; label: string; icon: JSX.Element }[] = [];
  let profilePath = '/profile';

  if (isAuthenticated && user) {
    if (user.role === 'student') {
      currentNavLinks = studentNavLinks;
      profilePath = '/student/profile';
    } else if (user.role === 'counselor') {
      currentNavLinks = counselorNavLinks;
      profilePath = '/counselor/profile';
    } else if (user.role === 'admin') {
      currentNavLinks = adminNavLinks;
      profilePath = '/admin/profile';
    }
  } else {
    currentNavLinks = landingNavLinks;
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="MindfulU Logo" className="h-12 w-auto" />
            <h1 className="text-2xl font-bold text-purple-600 ml-1">NeuroWell</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {currentNavLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="relative flex items-center gap-1 text-gray-600 font-medium transition-colors duration-200 
                            hover:text-purple-700 focus:text-purple-700 focus:outline-none focus:ring-2 
                            focus:ring-purple-500 focus:ring-offset-2 group"
                aria-current={isActive(link.to) ? "page" : undefined}
              >
                {React.cloneElement(link.icon, { 
                  className: `transition-colors duration-200 ${isActive(link.to) ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'}` 
                })}
                <span>{link.label}</span>
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600
                      transition-transform duration-300 scale-x-0 group-hover:scale-x-100 
                     ${isActive(link.to) ? 'scale-x-100' : ''}`}
                  style={{ transformOrigin: 'center' }}
                />
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-5">
            {isAuthenticated ? (
              <>
                {/* Search - Hidden on mobile */}
                <button 
                  className="hidden sm:block text-lg text-gray-400 hover:text-purple-600 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full p-1" 
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                
                {/* Notifications - Hidden on mobile */}
                <Link 
                  to="/notifications"
                  className="hidden sm:block relative text-lg text-gray-400 hover:text-purple-600 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full p-1" 
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Link>
                
                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-purple-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-label="User menu"
                    aria-expanded={isDropdownOpen}
                  >
                    <User size={16} className="text-purple-600" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm text-gray-500 capitalize">{user?.role || 'User'}</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link 
                      to={profilePath} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={16} className="inline mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/logout"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Logout
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {authLinks.map((link, index) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${'bg-purple-600 text-white hover:bg-purple-700'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <img src={Logo} alt="MindfulU Logo" className="h-12 w-auto" />
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-purple-600 transition-colors p-1"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-4 mb-8">
            {currentNavLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors ${isActive(link.to) ? 'text-purple-600 bg-purple-50' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {React.cloneElement(link.icon, { 
                  className: `${isActive(link.to) ? 'text-purple-600' : 'text-gray-400'}` 
                })}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Auth Actions */}
          {isAuthenticated ? (
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <Link
                to={profilePath}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} className="text-gray-400" />
                <span className="font-medium">Profile</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} className="text-gray-400" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <Link
                to="/login"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg text-center transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;