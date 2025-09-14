import React from 'react';
import { Link } from 'react-router-dom';


// Icon Components
const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
    </svg>
);

const ServicesPage: React.FC = () => {
    const services = [
        {
            id: 1,
            category: 'Counseling',
            title: 'AI Chatbot',
            description: 'Connect with licensed therapists for one-on-one support tailored to your needs. Schedule sessions at your convenience.',
            price: '$50 / session',
            buttonText: 'Start Now',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
            status: 'Available',
            statusColor: 'text-green-600',
            statusIcon: <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        },
        {
            id: 2,
            category: 'Exercise',
            title: 'Exercise',
            description: 'Join group sessions focused on stress management, mindfulness, and other essential life skills. Check our calendar for upcoming events.',
            price: '$20 / workshop',
            buttonText: 'View Progress',
            buttonLink: '/services/exercise',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
            status: 'Available',
            statusColor: 'text-green-600',
            statusIcon: <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        },
        {
            id: 3,
            category: 'Support Groups',
            title: 'Community Support Groups',
            description: 'Find a safe space to share experiences and connect with peers facing similar challenges. Explore our diverse group offerings.',
            price: 'Free',
            buttonText: 'Find Groups',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
            status: 'Available',
            statusColor: 'text-green-600',
            statusIcon: <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        },
        {
            id: 4,
            category: 'Crisis Help',
            title: 'Immediate Crisis Support',
            description: 'Access immediate help during a crisis. Our resources are available 24/7 to provide the support you need when you need it most.',
            price: 'Free & Confidential',
            buttonText: 'Get Help Now',
            buttonColor: 'bg-red-600 hover:bg-red-700',
            status: '24/7',
            statusColor: 'text-red-600',
            statusIcon: <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
            
            
            {/* Main Content */}
            <main className="flex-1 px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Services</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Find the support you need to thrive. Our services are designed to help you 
                            navigate challenges and enhance your well-being.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {services.map((service) => (
                            <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                                {/* Service Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-purple-600 text-sm font-medium">{service.category}</span>
                                        <div className="flex items-center mt-2">
                                            {service.statusIcon}
                                            <span className={`text-sm font-medium ml-2 ${service.statusColor}`}>{service.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Service Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className="text-purple-600 font-semibold text-lg">{service.price}</span>
                                </div>

                                {/* Action Button */}
                                <Link 
                                    to={service.buttonLink || (service.id === 1 ? "/services/chatboat" : "#")} 
                                    className={`block w-full text-center ${service.buttonColor} text-white py-3 px-6 rounded-lg font-medium transition`}
                                >
                                    {service.buttonText}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            
            
        </div>
    );
};

export default ServicesPage;
