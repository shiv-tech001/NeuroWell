
import React from "react";
import { Link } from "react-router-dom";
import {
  FaRegComments,
  FaUserFriends,
  FaWalking,
  FaBookOpen,
  FaMusic,
  FaGamepad,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Data for the service cards
const services = [
  {
    icon: <FaRegComments />,
    title: "Chatbot",
    description: "Engage in supportive conversations with our AI-powered chatbot, available 24/7 to provide guidance and assistance.",
    to: "/services/chat",
  },
  {
    icon: <FaUserFriends />,
    title: "Book Appointment",
    description: "Schedule a session with licensed therapists for personalized counseling tailored to your needs.",
    to: "/student/book-appointment",
  },
  {
    icon: <FaWalking />,
    title: "Exercises",
    description: "Participate in guided exercises designed to reduce stress and improve your physical and mental health.",
    to: "/services/ExercisesHub",
  },
  {
    icon: <FaBookOpen />,
    title: "Reading Books",
    description: "Access a curated library of books focused on mental wellness, personal growth, and mindfulness.",
    to: "/services/books",
  },
  {
    icon: <FaMusic />,
    title: "Listen Music To Relax",
    description: "Discover a selection of calming music and soundscapes to help you relax and unwind.",
    to: "/services/music",
  },
  {
    icon: <FaGamepad />,
    title: "Play Games",
    description: "Engage in fun and relaxing games designed to help you de-stress and improve your mood.",
    to: "https://poki.com/",
  },
];

// Animation variants for card entry
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const ServiceCard = ({ icon, title, description, to, index }) => {
  const isExternalLink = to.startsWith('http');

  const cardContent = (
    <motion.div
      className="group relative bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col transition-transform transform hover:-translate-y-2"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      {/* Icon */}
      <div className="text-5xl text-purple-600 mb-6">{icon}</div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed flex-grow">{description}</p>

      {/* Explore Button */}
      {to && (
        isExternalLink ? (
          <a href={to} target="_blank" rel="noopener noreferrer" className="mt-6 w-full">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors w-full">
              Explore
            </button>
          </a>
        ) : (
          <Link to={to} className="mt-6 w-full">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors w-full">
              Explore
            </button>
          </Link>
        )
      )}

      {/* Glow border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  );

  return cardContent;
};

// Main Page Component
const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F7FF] font-sans">
      {/* Main Content */}
      <main className="py-16 px-8 md:px-16 lg:px-24">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our range of services designed to support your mental well-being.
            Each service is crafted to provide you with the tools and resources you need to thrive.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="container mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                to={service.to} // Pass the 'to' prop to the card
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;