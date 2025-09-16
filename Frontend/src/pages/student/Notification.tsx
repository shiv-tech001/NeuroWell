import React, { useState } from 'react';
import { FaBell, FaTrophy, FaExclamationTriangle, FaLeaf, FaTheaterMasks, FaUsers } from 'react-icons/fa';

interface NotificationType {
  id: number;
  type: string;
  icon: JSX.Element;
  title: string;
  message: string;
  time: string;
  actionText?: string;
  actionColor?: string;
  bgColor?: string;
}

interface NotificationCardProps {
  notification: NotificationType;
}

const NotificationApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'Tasks', 'Wellness', 'Community', 'Alerts'];
  
  const notifications: NotificationType[] = [
    {
      id: 1,
      type: 'mood',
      icon: <FaBell style={{ color: '#3b82f6' }} />,
      title: 'Mood Check',
      message: 'Your daily mood check is ready. Take a moment to reflect on your feelings.',
      time: '10m ago',
      actionText: 'Check In',
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
      id: 4,
      type: 'emergency',
      icon: <FaExclamationTriangle style={{ color: '#ef4444' }} />,
      title: 'Emergency Alert',
      message: "Urgent: Please check in with your counselor. We're here to help.",
      time: '2h ago',
      actionText: 'Contact Now',
      actionColor: 'red',
      bgColor: 'emergency'
    },
    {
      id: 5,
      type: 'wellness',
      icon: <FaLeaf style={{ color: '#10b981' }} />,
      title: 'Wellness Suggestion',
      message: 'Take a break and try a 10-minute meditation session.',
      time: '3h ago',
      actionText: 'Start Meditation',
      actionColor: 'green'
    },
    {
      id: 6,
      type: 'session',
      icon: <FaTheaterMasks style={{ color: '#6366f1' }} />,
      title: 'Session Reminder',
      message: 'Your therapy session is today at 3 PM.',
      time: '4h ago'
    }
  ];

  // Notification Card Component
  const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    const getCardClasses = () => {
      let baseClasses = 'bg-white rounded-xl p-5 shadow-sm flex gap-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-l-4';
      if (notification.bgColor === 'emergency') {
        baseClasses += ' border-red-500 bg-red-50';
      } else if (notification.bgColor === 'achievement') {
        baseClasses += ' border-yellow-500 bg-amber-50';
      } else {
        baseClasses += ' border-transparent';
      }
      return baseClasses;
    };

    const getActionButtonClasses = () => {
      const baseClasses = 'px-3 py-1.5 rounded-md text-sm font-medium transition-colors';
      switch(notification.actionColor) {
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
      <div className={getCardClasses()}>
        <div className="flex-shrink-0 pt-0.5">{notification.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 mb-1">{notification.title}</h3>
          <p className="text-gray-600 text-sm">{notification.message}</p>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4 min-w-fit">
          <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
          {notification.actionText && (
            <button className={getActionButtonClasses()}>{notification.actionText}</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="text-2xl">🌲</div>
                <span className="ml-2 text-xl font-bold text-indigo-600">MindfulU</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-3">
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Mark all as read
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Clear All
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">1</div>
                <div className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                    alt="Alex Doe" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">Alex Doe</p>
                    <p className="text-xs text-gray-500">Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotificationApp;