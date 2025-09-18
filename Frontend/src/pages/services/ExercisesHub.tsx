
// src/components/ExercisesHubPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Data for the exercise cards
const exercises = [
  {
    title: "Breathing Exercises",
    description: "Relax with guided breathing",
    action: "Start",
  },
  {
    title: "Meditation",
    description: "Find inner peace through meditation",
    action: "Start",
  },
  {
    title: "Yoga Poses",
    description: "Stretch your body gently",
    action: "Start",
  },
];

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

// Reusable Exercise Card Component
const ExerciseCard = ({ title, description, action, onStart, index }) => (
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col justify-between relative group border border-transparent hover:border-purple-300"
    custom={index}
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    whileHover={{ scale: 1.05, y: -6 }}
  >
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 leading-relaxed">{description}</p>
    </div>
    <motion.button
      className="self-start bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors relative overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onStart}
    >
      <span className="relative z-10">{action}</span>
      {/* Glow effect */}
      <span className="absolute inset-0 rounded-lg bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
    </motion.button>

    {/* Glow border effect */}
    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 pointer-events-none"></div>
  </motion.div>
);

// Main Exercises Hub Page Component
const ExerciseHub = () => {
  const navigate = useNavigate();

  // Map exercise titles to their route paths
  const exerciseRoutes = {
    "Breathing Exercises": "/services/breathing",
    "Meditation": "/services/meditation",
    "Yoga Poses": "/services/yoga",
    "Cycling": "/services/cycling",
    "Reading": "/services/Reading",
    "Walking": "/services/walking",
  };

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
            Exercises Hub
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose from a variety of exercises designed to improve your mental
            and physical well-being.
          </p>
        </motion.div>

        {/* Exercises Grid */}
        <div className="container mx-auto mt-16">
          <div className="flex flex-col items-center gap-10 w-full">
            {exercises.map((exercise, index) => (
              <div className="w-4/5">
                <ExerciseCard
                  key={index}
                  title={exercise.title}
                  description={exercise.description}
                  action={exercise.action}
                  onStart={() => navigate(exerciseRoutes[exercise.title])}
                  index={index}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end mt-8 mb-8">
            <span className="text-purple-600 text-lg font-semibold opacity-80 select-none">
              More Exercises going to be added soon.....
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExerciseHub;