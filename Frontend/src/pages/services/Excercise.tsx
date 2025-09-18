import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Icon Components
const PlayIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
    </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
    </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a3 3 0 003-3V4a3 3 0 00-6 0v3a3 3 0 003 3zm0 0a9 9 0 009 9"/>
    </svg>
);

const InteractiveActivityHub: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Breathing');
    const [dailyGoal, setDailyGoal] = useState('15');

    const tabs = ['Breathing', 'Meditation', 'Physical', 'Creative'];

    const progressData = {
        breathingExercises: { current: 6, total: 10 },
        currentStreak: 5,
        totalPoints: 250
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
                {/* Page Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Interactive Activity Hub</h1>

                {/* Activity Tabs */}
                <div className="flex space-x-8 mb-8 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-1 font-medium transition ${
                                activeTab === tab
                                    ? 'text-purple-600 border-b-2 border-purple-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Featured Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex items-start space-x-6">
                        <div className="w-64 h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-full h-1/2">
                                <div className="absolute bottom-4 left-6">
                                    <div className="w-16 h-20 bg-orange-300 rounded-t-full"></div>
                                </div>
                                <div className="absolute bottom-0 right-8 w-8 h-16 bg-orange-400 rounded"></div>
                            </div>
                            <div className="relative z-10">
                                <div className="w-20 h-32 bg-orange-400 rounded-full mx-auto mb-2"></div>
                                <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto"></div>
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            <div className="mb-4">
                                <span className="text-purple-600 text-sm font-medium uppercase tracking-wide">Guided Session</span>
                                <h2 className="text-2xl font-bold text-gray-900 mt-1">Guided Breathing Session</h2>
                                <p className="text-gray-600 mt-2">Join a 10-minute guided breathing exercise to reduce stress and improve focus.</p>
                            </div>
                            
                            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
                                Start Session
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Progress Tracking */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Progress Tracking</h3>
                        
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700 font-medium">Breathing Exercises</span>
                                <span className="text-sm text-gray-500">
                                    {progressData.breathingExercises.current} of {progressData.breathingExercises.total}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                                    style={{ 
                                        width: `${(progressData.breathingExercises.current / progressData.breathingExercises.total) * 100}%` 
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Customization */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Customization</h3>
                        
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Set Daily Breathing Goal (minutes)
                            </label>
                            <input
                                type="text"
                                value={dailyGoal}
                                onChange={(e) => setDailyGoal(e.target.value)}
                                placeholder="e.g., 15"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Gamification & Social */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Gamification & Social</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center">
                            <p className="text-gray-600 mb-2">Current Streak</p>
                            <p className="text-4xl font-bold text-purple-600 mb-1">{progressData.currentStreak} days</p>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-gray-600 mb-2">Total Points</p>
                            <p className="text-4xl font-bold text-purple-600 mb-1">{progressData.totalPoints}</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4 mt-6">
                        <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                            <ShareIcon className="w-6 h-6 text-gray-600" />
                        </button>
                        <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                            <HeartIcon className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InteractiveActivityHub;
