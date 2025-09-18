import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaTrophy, FaExclamationTriangle, FaLeaf, FaTheaterMasks, FaUsers, FaLightbulb, FaRunning, FaMedal, FaComments, FaSpa, FaCalendarAlt, FaExclamationCircle, FaSmile, FaClock } from 'react-icons/fa';

interface NotificationType {
  id: number;
  type: string;
  icon: React.ReactNode;
  title: string;
  message: string;
  time: string;
  actionText?: string;
  actionLink?: string;
  actionColor?: string;
  bgColor?: string;
  read?: boolean; // added read property
}

interface NotificationCardProps {
  notification: NotificationType;
  toggleRead: (id: number) => void;
}

const NotificationApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: 1,
      type: 'mood',
      icon: <FaBell style={{ color: '#3b82f6' }} />,
      title: 'Mood Check',
      message: 'Your daily mood check is ready. Take a moment to reflect on your feelings.',
      time: '10m ago',
      actionText: 'Check In',
      actionLink: '/student/dashboard', // Example link
      actionColor: 'blue'
    },
    {
      id: 2,
      type: 'community',
      icon: <FaUsers style={{ color: '#8b5cf6' }} />,
      title: 'Community',
      message: 'Join the study group for the upcoming psychology exam.',
      time: '30m ago',
      actionText: 'View Group',
      actionLink: '/student/community', // Example link
      actionColor: 'purple'
    },
    {
      id: 3,
      type: 'achievement',
      icon: <FaTrophy style={{ color: '#f59e0b' }} />,
      title: 'Achievement Unlocked!',
      message: "You've completed 5 wellness activities this week. Keep up the great work!",
      time: '1h ago',
      bgColor: 'achievement'
    },
    {
      id: 5,
      type: 'wellness',
      icon: <FaLeaf style={{ color: '#10b981' }} />,
      title: 'Wellness Suggestion',
      message: 'Take a break and try a 10-minute meditation session.',
      time: '3h ago',
      actionText: 'Start Meditation',
      actionLink: '/services/Meditation', // Example link
      actionColor: 'green'
    },
    {
      id: 6,
      type: 'session',
      icon: <FaTheaterMasks style={{ color: '#6366f1' }} />,
      title: 'Session Reminder',
      message: 'Your therapy session is today at 3 PM.',
      time: '4h ago',
      actionText: 'View Session',
      actionLink: '/student/book-appointment', // Example link
    },
    {
      id: 7,
      type: 'tip',
      icon: <FaLightbulb style={{ color: '#f97316' }} />,
      title: 'Daily Tip',
      message: 'Drink a glass of water and take a 5-minute walk to refresh your mind.',
      time: '5h ago',
      actionText: 'View Tip',
      actionColor: 'orange'
    },
    {
      id: 8,
      type: 'challenge',
      icon: <FaRunning style={{ color: '#6366f1' }} />,
      title: 'New Challenge',
      message: 'Complete a 7-day gratitude journal challenge to boost your positivity.',
      time: '6h ago',
      actionText: 'Join Challenge',
      actionColor: 'indigo'
    },
    {
      id: 9,
      type: 'achievement',
      icon: <FaMedal style={{ color: '#facc15' }} />,
      title: 'Achievement Unlocked!',
      message: "You've meditated for 3 consecutive days. Well done!",
      time: '6h ago',
      bgColor: 'achievement'
    },
    {
      id: 10,
      type: 'community',
      icon: <FaComments style={{ color: '#8b5cf6' }} />,
      title: 'Community Post',
      message: 'New discussion in Anxiety Support Group. Share your thoughts.',
      time: '7h ago',
      actionText: 'View Discussion',
      actionColor: 'purple'
    },
    {
      id: 11,
      type: 'wellness',
      icon: <FaSpa style={{ color: '#10b981' }} />,
      title: 'Wellness Suggestion',
      message: 'Try a 5-minute deep breathing exercise to relax.',
      time: '8h ago',
      actionText: 'Start Exercise',
      actionColor: 'green'
    },
    {
      id: 12,
      type: 'session',
      icon: <FaCalendarAlt style={{ color: '#6366f1' }} />,
      title: 'Upcoming Session',
      message: 'Your therapy session is scheduled for tomorrow at 11 AM.',
      time: '9h ago',
      actionText: 'View Details',
      actionColor: 'blue'
    },
    {
      id: 13,
      type: 'alert',
      icon: <FaExclamationCircle style={{ color: '#ef4444' }} />,
      title: 'Important Alert',
      message: 'Your account password will expire in 3 days. Please update it.',
      time: '10h ago',
      actionText: 'Update Now',
      actionColor: 'red'
    },
    {
      id: 14,
      type: 'motivation',
      icon: <FaSmile style={{ color: '#fbbf24' }} />,
      title: 'Motivational Quote',
      message: '“The best way to get started is to quit talking and begin doing.” – Walt Disney',
      time: '11h ago',
      actionText: 'Read More',
      actionColor: 'yellow'
    },
    {
      id: 15,
      type: 'reminder',
      icon: <FaClock style={{ color: '#3b82f6' }} />,
      title: 'Reminder',
      message: 'Don’t forget to log your mood for today!',
      time: '12h ago',
      actionText: 'Log Mood',
      actionColor: 'blue'
    }
  ]);

  const tabs = ['All', 'Tasks', 'Wellness', 'Community', 'Alerts'];

  // Toggle read/unread
  const toggleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  // Mark all read
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Mark all unread
  const markAllUnread = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: false })));
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Tasks') return ['mood', 'session', 'reminder'].includes(n.type);
    if (activeTab === 'Wellness') return ['wellness', 'tip', 'challenge', 'achievement'].includes(n.type);
    if (activeTab === 'Community') return ['community'].includes(n.type);
    if (activeTab === 'Alerts') return ['alert', 'emergency'].includes(n.type);
    return true;
  });

  const NotificationCard: React.FC<NotificationCardProps> = ({ notification, toggleRead }) => {
  const { id, icon, title, message, time, actionText, actionLink, actionColor, bgColor, read } = notification;

  const cardBgColor = bgColor === 'achievement' ? 'bg-yellow-50' : 'bg-white';
  const cardBorderColor = bgColor === 'achievement' ? 'border-yellow-400' : 'border-transparent';

  const getActionButtonClasses = (): string => {
    const baseClasses = 'px-3 py-1.5 rounded-md text-sm font-medium transition-colors';
    const color = actionColor || '';
    
    switch(color) {
      case 'blue': 
        return `${baseClasses} bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200`;
      case 'purple': 
        return `${baseClasses} bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200`;
      case 'red': 
        return `${baseClasses} bg-red-100 text-red-700 hover:bg-red-200 border border-red-200`;
      case 'green': 
        return `${baseClasses} bg-green-100 text-green-700 hover:bg-green-200 border border-green-200`;
      default: 
        return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200`;
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-sm transition-all duration-300 ${cardBgColor} border-l-4 ${cardBorderColor} ${read ? 'opacity-60' : ''}`}
      onClick={() => toggleRead(id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="text-2xl mr-4">{icon}</div>
          <div>
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
        <div className="text-right ml-4 flex-shrink-0">
          <p className="text-xs text-gray-500 mb-2">{time}</p>
          {actionText && actionLink && (
            <Link to={actionLink}>
              <button className={getActionButtonClasses()}>
                {actionText}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={markAllRead} className="px-3 py-1.5 text-sm rounded-md bg-green-100 text-green-700 hover:bg-green-200">Mark All Read</button>
            <button onClick={markAllUnread} className="px-3 py-1.5 text-sm rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Mark All Unread</button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} toggleRead={toggleRead} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotificationApp;