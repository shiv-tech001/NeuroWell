import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Counselor } from '../../../types';
import { LogoIcon, SearchIcon, BellIcon, StarIcon, CalendarIcon, ClockIcon } from '@components/icons';


const counselorsData: Counselor[] = [
    { 
        id: '1', 
        name: 'Dr. Sarah Miller', 
        specialty: 'Clinical Psychology', 
        rating: 4.9, 
        reviewCount: 156, 
        quote: "Specializing in anxiety, depression and trauma therapy with 8+ years experience.", 
        avatarUrl: 'https://picsum.photos/seed/sarah/100/100',
        hourlyRate: 120,
        nextAvailable: '2:00 PM Today'
    },
    { 
        id: '2', 
        name: 'Dr. Jennifer Hayes', 
        specialty: 'Relationship Counseling', 
        rating: 4.8, 
        reviewCount: 132, 
        quote: "Expert in couples therapy and family counseling with proven success rates.", 
        avatarUrl: 'https://picsum.photos/seed/jennifer/100/100',
        hourlyRate: 110,
        nextAvailable: '4:00 PM Today'
    },
    { 
        id: '3', 
        name: 'Dr. Michael Chen', 
        specialty: 'Stress Management', 
        rating: 4.7, 
        reviewCount: 98, 
        quote: "Helping students and professionals manage stress and achieve work-life balance.", 
        avatarUrl: 'https://picsum.photos/seed/michael/100/100',
        hourlyRate: 105,
        nextAvailable: '10:00 AM Tomorrow'
    },
];

const CounselorCard: React.FC<{ counselor: Counselor }> = ({ counselor }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
                <img 
                    src={counselor.avatarUrl} 
                    alt={counselor.name} 
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{counselor.name}</h3>
                        <span className="text-2xl font-bold text-purple-600">${counselor.hourlyRate}/hr</span>
                    </div>
                    <p className="text-purple-600 font-medium mb-2">{counselor.specialty}</p>
                    <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.round(counselor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                />
                            ))}
                        </div>
                        <span className="text-gray-600 text-sm">({counselor.rating}) • {counselor.reviewCount} reviews</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-4 italic">"{counselor.quote}"</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-green-600">
                            <ClockIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">Next: {counselor.nextAvailable}</span>
                        </div>
                        <Link 
                            to={`/student/appointments/book/${counselor.id}`}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                            Book Session
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AppointmentBookingPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('all');

    const specialties = [
        { value: 'all', label: 'All Specialties' },
        { value: 'anxiety', label: 'Anxiety & Stress' },
        { value: 'depression', label: 'Depression' },
        { value: 'relationships', label: 'Relationships' },
        { value: 'trauma', label: 'Trauma & PTSD' },
        { value: 'academic', label: 'Academic Support' }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            
            {/* Hero Section */}

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">Find Your Perfect Therapist</h1>
                    <p className="text-xl mb-8 text-purple-100">
                        Connect with licensed mental health professionals through secure video sessions
                    </p>
                    
                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-lg">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="relative">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search therapists, specialties..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                                />
                            </div>
                            <select 
                                value={selectedSpecialty}
                                onChange={(e) => setSelectedSpecialty(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                            >
                                {specialties.map(specialty => (
                                    <option key={specialty.value} value={specialty.value}>
                                        {specialty.label}
                                    </option>
                                ))}
                            </select>
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                                Search Therapists
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                        <div className="text-gray-600">Licensed Therapists</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                        <div className="text-gray-600">Available Sessions</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                        <div className="text-gray-600">Satisfaction Rate</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                        <div className="text-3xl font-bold text-orange-600 mb-2">15min</div>
                        <div className="text-gray-600">Avg. Response Time</div>
                    </div>
                </div>

                {/* Featured Therapists */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Recommended for You</h2>
                        <Link to="/student/appointments/all" className="text-purple-600 hover:text-purple-700 font-semibold">
                            View All Therapists →
                        </Link>
                    </div>
                    <div className="space-y-6">
                        {counselorsData.map(counselor => (
                            <CounselorCard key={counselor.id} counselor={counselor} />
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="bg-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <SearchIcon className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">1. Browse & Choose</h3>
                            <p className="text-gray-600">Search through our network of licensed therapists and find the perfect match for your needs.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CalendarIcon className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">2. Schedule Session</h3>
                            <p className="text-gray-600">Book your appointment at a time that works for you with our flexible scheduling system.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 font-bold text-xl">💬</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">3. Start Healing</h3>
                            <p className="text-gray-600">Connect through secure video sessions from the comfort and privacy of your own space.</p>
                        </div>
                    </div>
                </section>
            </main>
            
        </div>
    );
};

export default AppointmentBookingPage;
