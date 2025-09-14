import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleIcon, CalendarIcon, UsersIcon, ChartPieIcon, FacebookIcon, InstagramIcon, TwitterIcon } from '@components/icons';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            <main>
                {/* Hero Section */}
                <section id="home" className="container mx-auto px-6 pt-20 pb-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
                            Your Journey to Mental<br />
                            Wellness Starts Here
                        </h1>
                        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            MindfulU provides students with the tools and support they need to thrive mentally and 
                            emotionally. Explore our services and begin your path to a healthier, happier you.
                        </p>
                        <Link 
                            to="/services" 
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full transition shadow-lg hover:shadow-xl text-lg"
                        >
                            Explore Services
                        </Link>
                    </div>
                </section>

                {/* Empowering Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
                            Empowering Your Mental Health
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                            {/* AI-Powered Chatbot */}
                            <div className="text-center group">
                                <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition">
                                    <ChatBubbleIcon className="h-10 w-10 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">AI-Powered Chatbot</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Get instant support and guidance from our AI chatbot, available 24/7 to answer your 
                                    questions and provide resources.
                                </p>
                            </div>

                            {/* Peer Support Community */}
                            <div className="text-center group">
                                <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition">
                                    <UsersIcon className="h-10 w-10 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Peer Support Community</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Connect with fellow students in a safe and supportive community. Share experiences, 
                                    offer encouragement, and build lasting connections.
                                </p>
                            </div>

                            {/* Easy Appointment Booking */}
                            <div className="text-center group">
                                <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition">
                                    <CalendarIcon className="h-10 w-10 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Easy Appointment Booking</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Schedule appointments with licensed therapists and counselors with ease. Find the 
                                    right support at a time that works for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">How It Works</h2>
                        
                        {/* Video Placeholder */}
                        <div className="max-w-4xl mx-auto mb-16">
                            <div className="bg-white rounded-2xl shadow-lg p-8 aspect-video flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-lg">Watch this quick tour to see how MindfulU can support you.</p>
                                </div>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="max-w-4xl mx-auto">
                            {/* Step 1 */}
                            <div className="flex items-start mb-12 group">
                                <div className="flex-shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-purple-700 transition">
                                        1
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h3>
                                        <button className="text-purple-600 hover:text-purple-700 transition">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-gray-600">Create your free account in minutes to get started.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex items-start mb-12 group">
                                <div className="flex-shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-purple-700 transition">
                                        2
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Resources</h3>
                                        <button className="text-purple-600 hover:text-purple-700 transition">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-gray-600">Explore our library of wellness tools.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex items-start mb-12 group">
                                <div className="flex-shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-purple-700 transition">
                                        3
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Book Appointments</h3>
                                        <button className="text-purple-600 hover:text-purple-700 transition">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-gray-600">Schedule a session with a therapist.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">What Students Are Saying</h2>
                        
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Testimonial 1 */}
                            <div className="bg-gray-50 p-8 rounded-2xl">
                                <div className="flex items-center mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1494790108755-2616b612b3fd?w=50&h=50&fit=crop&crop=face" 
                                        alt="Sophia Carter" 
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Sophia Carter</h4>
                                        <p className="text-sm text-gray-500">May 15, 2024</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    "MindfulU has been a game-changer for me. The AI chatbot is incredibly helpful, and the 
                                    peer support community has made me feel less alone. Highly recommend!"
                                </p>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="bg-gray-50 p-8 rounded-2xl">
                                <div className="flex items-center mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                                        alt="Ethan Bennett" 
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Ethan Bennett</h4>
                                        <p className="text-sm text-gray-500">Apr 27, 2024</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    "The appointment booking process was straightforward, and I found a therapist who 
                                    truly understands my needs. The platform is user-friendly and effective."
                                </p>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="bg-gray-50 p-8 rounded-2xl">
                                <div className="flex items-center mb-4">
                                    <img 
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" 
                                        alt="Olivia Hayes" 
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Olivia Hayes</h4>
                                        <p className="text-sm text-gray-500">Mar 12, 2024</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    "I love the resources and support MindfulU offers. It's made a significant positive impact 
                                    on my mental well-being. Thank you for creating each valuable service."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Start Your Journey CTA */}
                <section className="py-20 bg-gray-800 text-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Mental Wellness Journey?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of students who have already begun their path to better mental health with MindfulU.
                        </p>
                        <Link 
                            to="/register" 
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-10 py-4 rounded-full transition shadow-lg hover:shadow-xl text-lg"
                        >
                            Start Your Journey
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
