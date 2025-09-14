import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  CalendarIcon, 
  DocumentTextIcon, 
  BookOpenIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline';



// Crisis Alert Componen
const CrisisAlert: React.FC = () => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
    <div className="flex items-start">
      <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3 mt-0.5" />
      <div className="flex-1">
        <h3 className="text-red-800 font-semibold">CRISIS ALERT</h3>
        <p className="text-red-700 mt-1">
          <span className="font-medium">High-Risk Student Detected:</span> Ethan Carter. 
          Signal: Increased anxiety and suicidal ideation reported. Immediate intervention required.
        </p>
        <button className="text-red-800 underline font-medium mt-2 hover:text-red-900">
          View Details
        </button>
      </div>
    </div>
  </div>
);

// Quick Access Card Component
const QuickAccessCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  onClick?: () => void;
}> = ({ icon, title, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-3 w-full"
  >
    <div className="text-gray-600">{icon}</div>
    <span className="text-sm font-medium text-gray-800">{title}</span>
  </button>
);

// Pending Task Item Component
const TaskItem: React.FC<{ 
  icon: React.ReactNode;
  title: string;
  dueDate: string;
}> = ({ icon, title, dueDate }) => (
  <div className="flex items-center space-x-3 py-3">
    <div className="text-gray-400">{icon}</div>
    <div className="flex-1">
      <p className="text-gray-800 font-medium">{title}</p>
      <p className="text-sm text-gray-500">{dueDate}</p>
    </div>
  </div>
);

// Main Dashboard Component
const CounselorDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Counselor Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Sharma. Here's your overview for today.</p>
        </header>

        {/* Crisis Alert */}
        <CrisisAlert />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Pending Tasks */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Tasks</h2>
              <div className="space-y-1">
                <TaskItem
                  icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
                  title="Review new student intake forms"
                  dueDate="Due in 2 days"
                />
                <TaskItem
                  icon={<CalendarIcon className="h-5 w-5" />}
                  title="Schedule initial consultation with new student"
                  dueDate="Due in 3 days"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Quick Access */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickAccessCard
                  icon={<UsersIcon className="h-8 w-8" />}
                  title="Student Cases"
                />
                <QuickAccessCard
                  icon={<CalendarIcon className="h-8 w-8" />}
                  title="Scheduling"
                />
                <QuickAccessCard
                  icon={<ChatBubbleLeftIcon className="h-8 w-8" />}
                  title="AI-Assisted Notes"
                />
                <QuickAccessCard
                  icon={<BookOpenIcon className="h-8 w-8" />}
                  title="Resource Hub"
                />
                <QuickAccessCard
                  icon={<ChartBarIcon className="h-8 w-8" />}
                  title="Analytics"
                />
                <div className="lg:col-span-3">
                  <button className="bg-green-500 hover:bg-green-600 transition-colors text-white p-6 rounded-xl flex items-center justify-center space-x-2 w-full">
                    <PlusIcon className="h-6 w-6" />
                    <span className="font-semibold">New Session</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounselorDashboard;
