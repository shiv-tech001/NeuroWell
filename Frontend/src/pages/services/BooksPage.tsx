import React from "react";
import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";

const books = [
  {
    title: "Self Help; with Illustrations of Conduct and Perseverance",
    author: "Samuel Smiles",
    description: "A classic work on the importance of self-reliance, industry, and perseverance.",
    url: "https://www.gutenberg.org/ebooks/935",
  },
  {
    title: "The Power of Positive Thinking",
    author: "Norman Vincent Peale",
    description: "A guide to achieving a happy, satisfying, and worthwhile life through positive thinking.",
    url: "https://www.gutenberg.org/ebooks/17478",
  },
  {
    title: "Within You is the Power",
    author: "Henry Thomas Hamblin",
    description: "A book about discovering and utilizing the power that lies within each individual.",
    url: "https://www.gutenberg.org/ebooks/7224",
  },
  {
    title: "Pushing to the Front",
    author: "Orison Swett Marden",
    description: "A motivational book about ambition, perseverance, and achieving success in life.",
    url: "https://www.gutenberg.org/ebooks/21291",
  },
  {
    title: "As a Man Thinketh",
    author: "James Allen",
    description: "A literary essay that argues that a person's thoughts shape their reality.",
    url: "https://www.gutenberg.org/ebooks/4507",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    description: "A series of personal writings by the Roman Emperor on Stoic philosophy.",
    url: "https://www.gutenberg.org/ebooks/2680",
  },
  {
    title: "The Go-Getter: A Story That Tells You How to be One",
    author: "Peter B. Kyne",
    description: "An inspiring story about determination, resourcefulness, and never giving up.",
    url: "https://www.gutenberg.org/ebooks/15689",
  },
  {
    title: "100 Ways to Motivate Yourself",
    author: "Steve Chandler",
    description: "Practical strategies and techniques to change your life and achieve your goals.",
    url: "https://ebook-mecca.com/online/100%20Ways%20to%20Motivate%20Yourself%20Change%20Your%20Life%20Forever.pdf",
  },
  {
    title: "Thoughts I Met on the Highway",
    author: "Frank W. Boreham",
    description: "A collection of cheerful and inspiring thoughts and observations on life.",
    url: "https://www.gutenberg.org/ebooks/18392",
  },
  {
    title: "Strive and Thrive; or, Stories for the Example and Encouragement of the Young",
    author: "Anonymous",
    description: "A collection of stories meant to encourage and provide examples for young people.",
    url: "https://www.gutenberg.org/ebooks/35177",
  },
];

const BooksPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F7FF] font-sans p-8">
      <motion.div
        className="container mx-auto text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Books for Mental Wellness
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore a curated list of books to support your journey towards mental well-being.
        </p>
      </motion.div>

      <div className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {books.map((book, index) => (
          <motion.div
            key={index}
            className="group relative bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col transition-transform transform hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-5xl text-purple-600 mb-6">
              <FaBook />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-md text-gray-500 mb-4">by {book.author}</p>
            <p className="text-gray-600 leading-relaxed flex-grow">{book.description}</p>
            <a href={book.url} target="_blank" rel="noopener noreferrer" className="mt-6 w-full">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors w-full">
                Learn More
              </button>
            </a>
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
