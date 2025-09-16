import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleIcon, CalendarIcon, UsersIcon } from '@components/icons';

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-sans text-gray-700 overflow-hidden bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300">
      {/* Subtle Floating Light Highlights */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute top-24 left-32 w-24 h-24 bg-purple-400 rounded-full opacity-30 animate-pulse mix-blend-multiply filter blur-3xl"></span>
        <span className="absolute top-72 right-28 w-36 h-36 bg-purple-300 rounded-full opacity-20 animate-pulse mix-blend-multiply filter blur-3xl"></span>
        <span className="absolute bottom-32 left-24 w-40 h-40 bg-purple-300 rounded-full opacity-25 animate-pulse mix-blend-multiply filter blur-3xl"></span>
      </div>

      <div>
   {/* Hero Section */}
<section id="home" className="container mx-auto px-6 pt-24 pb-20 text-center">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-purple-900 mb-6 select-none animate-floatUpDown">
      Your Journey to Mental<br />
      Wellness Starts Here
    </h1>

    <p className="text-lg text-purple-700 mb-12 leading-relaxed opacity-0 animate-fadeInDelayed">
      NeuroWell provides students with the tools and support they need to thrive mentally and emotionally. 
      Explore our services and begin your path to a healthier, happier you.
    </p>

    <Link
      to="/services"
      className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-10 py-4 rounded-full transition shadow-md hover:shadow-xl text-lg ring-2 ring-purple-300 animate-pulse-slower hover:scale-105"
    >
      Explore Services
    </Link>
  </div>

<<<<<<< HEAD
  {/* Animation styles moved to global CSS */}
=======
  {/* Custom styles for animation */}
  <style jsx>{`
    /* Breathing scale animation */
    @keyframes breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .animate-floatUpDown {
      animation: breathe 6s ease-in-out infinite;
    }

    /* Delayed fade-in for paragraph */
    @keyframes fadeInDelayed {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .animate-fadeInDelayed {
      animation: fadeInDelayed 2s ease forwards;
      animation-delay: 1s;
    }

    /* Slower pulse for button */
    @keyframes pulseSlower {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.85; }
    }
    .animate-pulse-slower {
      animation: pulseSlower 5s ease-in-out infinite;
    }
  `}</style>
>>>>>>> 936eb34f0880ad473f8d2ef2802eb1007ed5aa87
</section>




        {/* Empowering Section */}
        <section className="py-20 bg-transparent">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-purple-900 text-center mb-16 select-none">
              Empowering Your Mental Health
            </h2>
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[{
                icon: <ChatBubbleIcon className="h-10 w-10 text-purple-600" />,
                title: "AI-Powered Chatbot",
                description: "Get instant support and guidance from our AI chatbot, available 24/7 to answer your questions."
              }, {
                icon: <UsersIcon className="h-10 w-10 text-purple-600" />,
                title: "Peer Support Community",
                description: "Connect with fellow students in a safe and supportive community."
              }, {
                icon: <CalendarIcon className="h-10 w-10 text-purple-600" />,
                title: "Easy Appointment Booking",
                description: "Schedule appointments with licensed therapists and counselors easily."
              }].map(({icon, title, description}, idx) => (
                <div key={idx} className="text-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer select-none">
                  <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-4">{title}</h3>
                  <p className="text-purple-700 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* how it works section */}

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
                                    <p className="text-gray-500 text-lg">Watch this quick tour to see how NeuroWell can support you.</p>
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
        <section className="py-20 bg-purple-50 rounded-lg mx-10 md:mx-24 shadow-lg mt-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-purple-900 text-center mb-16 select-none">What Students Are Saying</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[{
                name: "Sophia Carter",
                date: "May 15, 2024",
                text: `"NeuroWell has been a game-changer for me. The AI chatbot is incredibly helpful, and the peer support community has made me feel less alone. Highly recommend!"`,
                img: "https://images.unsplash.com/photo-1494790108755-2616b612b3fd?w=50&h=50&fit=crop&crop=face"
              }, {
                name: "Ethan Bennett",
                date: "Apr 27, 2024",
                text: `"The appointment booking process was straightforward, and I found a therapist who truly understands my needs. The platform is user-friendly and effective."`,
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
              }, {
                name: "Olivia Hayes",
                date: "Mar 12, 2024",
                text: `"I love the resources and support NeuroWell offers. It's made a significant positive impact on my mental well-being. Thank you for creating each valuable service."`,
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
              }].map(({name, date, text, img}, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition cursor-default">
                  <div className="flex items-center mb-4">
                    <img src={img} alt={name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold text-purple-900">{name}</h4>
                      <p className="text-sm text-purple-700">{date}</p>
                    </div>
                  </div>
                  <p className="text-purple-700 italic">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Start Your Journey CTA */}
        <section className="py-20 bg-purple-400 text-white text-center rounded-lg mx-16 mt-16 shadow-lg select-none">
  <h2 className="text-4xl font-extrabold mb-6">Ready to Start Your Mental Wellness Journey?</h2>
  <p className="text-xl mb-8 max-w-2xl mx-auto">
    Join thousands of students who have already begun their path to better mental health with NeuroWell.
  </p>
  <Link
    to="/register"
    className="inline-block bg-white text-purple-700 font-bold px-12 py-4 rounded-full shadow-md hover:shadow-xl transition"
  >
    Start Your Journey
  </Link>
</section>

      </div>
    </div>
  );
};

export default LandingPage;
