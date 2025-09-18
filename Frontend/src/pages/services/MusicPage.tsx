import React from "react";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";

const playlists = [
  {
    name: "sound therapy🎵",
    url: "https://open.spotify.com/playlist/3seMb8qvyZdfLrlVtN2khP?si=83edf5aa3af84a28 ",
    description: "Relax and indulge with beautiful piano pieces",
  },
  {
    name: "Motivational Mix🔥",
    url: "https://open.spotify.com/playlist/2F0XjETaHsdTz7wPtBMjBH?si=eaae9066451a4a3e",
    description: "Chill beats, lofi vibes, new tracks every week.",
  },
];

const MusicPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F7FF] font-sans p-8">
      <motion.div
        className="container mx-auto text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Relax with Music
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Here are some playlists to help you relax and unwind.
        </p>
      </motion.div>

      <div className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {playlists.map((playlist, index) => (
          <motion.div
            key={index}
            className="group relative bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col transition-transform transform hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-5xl text-green-500 mb-6">
              <FaSpotify />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{playlist.name}</h3>
            <p className="text-gray-500 leading-relaxed flex-grow">{playlist.description}</p>
            <a href={playlist.url} target="_blank" rel="noopener noreferrer" className="mt-6 w-full">
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors w-full">
                Listen on Spotify
              </button>
            </a>
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MusicPage;
