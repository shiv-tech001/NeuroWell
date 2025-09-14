import React from 'react';
import { Link } from 'react-router-dom';

// Icon components (you can replace these with your actual icon components)
const DashboardIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
    </svg>
);

const ResourcesIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
    </svg>
);

const CommunityIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
    </svg>
);

const SupportIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
    </svg>
);

const MeditationIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
);

const TherapyIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
    </svg>
);

const GroupIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
    </svg>
);

const StudentDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-orange-200 to-orange-300 px-6 py-8 mx-6 mt-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, Sarah!</h1>
                        <p className="text-gray-700 flex items-center">
                            How are you feeling today? 
                            <span className="ml-2 text-xl">😊</span>
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <img 
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=120&fit=crop" 
                            alt="Welcome illustration" 
                            className="w-48 h-24 object-cover rounded-lg"
                        />
                    </div>
                </div>

                <div className="px-6 py-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <p className="text-gray-500 text-sm mb-1">Mood Score</p>
                            <p className="text-3xl font-bold text-purple-600">7.8</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <p className="text-gray-500 text-sm mb-1">Streak</p>
                            <p className="text-3xl font-bold text-purple-600">14 days</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <p className="text-gray-500 text-sm mb-1">Appointments</p>
                            <p className="text-3xl font-bold text-purple-600">3</p>
                        </div>
                        <Link to="/resources" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <p className="text-gray-500 text-sm mb-1">Resources</p>
                            <p className="text-3xl font-bold text-purple-600">20+</p>
                        </Link>
                    </div>

                    {/* Mental Health Quizzes */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mental Health Quizzes</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                            {/* Anxiety Quiz */}
                            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=80&h=80&fit=crop" 
                                        alt="Anxiety assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Anxiety</p>
                            </div>

                            {/* Depression Quiz */}
                            <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                                        alt="Depression assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Depression</p>
                            </div>

                            {/* Stress Quiz */}
                            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
                                        alt="Stress assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Stress</p>
                            </div>

                            {/* Sleep Quiz */}
                            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=80&h=80&fit=crop" 
                                        alt="Sleep assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Sleep</p>
                            </div>

                            {/* Social Quiz */}
                            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=80&h=80&fit=crop" 
                                        alt="Social assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Social</p>
                            </div>
                        </div>

                        {/* Second Row of Quizzes */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {/* Academic Quiz */}
                            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=80&h=80&fit=crop" 
                                        alt="Academic assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Academic</p>
                            </div>

                            {/* Body Image Quiz */}
                            <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop" 
                                        alt="Body image assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Body Image</p>
                            </div>

                            {/* Substance Quiz */}
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop" 
                                        alt="Substance assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Substance</p>
                            </div>

                            {/* Eating Quiz */}
                            <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=80&h=80&fit=crop" 
                                        alt="Eating assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Eating</p>
                            </div>

                            {/* Wellness Quiz */}
                            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
                                        alt="Wellness assessment" 
                                        className="w-full h-16 object-cover rounded"
                                    />
                                </div>
                                <p className="font-semibold text-gray-800">Wellness</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Mood Score Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative w-32 h-32">
                                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            stroke="#e5e7eb"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            stroke="#8b5cf6"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${(7.8 / 10) * 314.16} 314.16`}
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-purple-600">7.8</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-800 font-semibold">Mood Score</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                                        <span className="text-purple-600 text-sm">✓</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">Completed 'Stress Management' quiz</p>
                                        <p className="text-xs text-gray-500">Today</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                                        <CommunityIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">Joined 'Mindful Moments' group</p>
                                        <p className="text-xs text-gray-500">2 days ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                                        <span className="text-green-600 text-sm">📅</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">Scheduled appointment with Dr. Emily Carter</p>
                                        <p className="text-xs text-gray-500">1 week ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            {/* Upcoming Appointments */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Appointments</h3>
                                <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-xl">
                                    <div className="flex items-center justify-center mb-3">
                                        <img 
                                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop" 
                                            alt="Appointment illustration" 
                                            className="w-16 h-12 object-cover rounded"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold text-gray-800">Dr. Emily Carter</p>
                                        <p className="text-sm text-gray-600">July 15th at 2:00 PM</p>
                                        <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg mt-3 text-sm font-medium hover:bg-purple-700 transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recommended Resources */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Recommended Resources</h3>
                                <div className="space-y-3">
                                    <Link to="/resources" className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <MeditationIcon className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">Guided Meditation</p>
                                            <p className="text-xs text-gray-500">Find inner peace.</p>
                                        </div>
                                    </Link>
                                    <Link to="/resources" className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <TherapyIcon className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">Online Therapy</p>
                                            <p className="text-xs text-gray-500">Connect with therapists.</p>
                                        </div>
                                    </Link>
                                    <Link to="/resources" className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <GroupIcon className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">Peer Support</p>
                                            <p className="text-xs text-gray-500">Join support groups.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
