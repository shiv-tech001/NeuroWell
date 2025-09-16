import React, { useState } from 'react';

// Galaxy-themed left panel background with stars
const GalaxyBackground = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-l-3xl shadow-xl bg-black">
    <svg
      className="absolute inset-0 w-full h-full object-cover"
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d8b4fe" stopOpacity="1" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9932cc" />
          <stop offset="100%" stopColor="#663399" />
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="url(#bgGradient)" />
      {Array.from({ length: 40 }).map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * 400}
          cy={Math.random() * 600}
          r={Math.random() * 1.5 + 0.5}
          fill="white"
          fillOpacity={Math.random() * 0.8 + 0.2}
          filter="url(#starGlow)"
        />
      ))}
      <path
        d="M100 300 Q200 100 300 300"
        stroke="#d8b4fe"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M120 320 Q200 150 280 320"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.2"
      />
    </svg>

    <div className="relative z-10 text-center px-6 max-w-xs">
      <h2 className="text-6xl font-extrabold text-white drop-shadow-lg select-none">
        We're Here for You
      </h2>
      <br />
      <p className="text-3xl text-white drop-shadow-md select-none">
        Reach out any time — your mental health matters.
      </p>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row rounded-3xl shadow-xl bg-white border border-gray-200 overflow-hidden">
        {/* Left Galaxy Panel */}
        <div className="hidden lg:flex w-1/2">
          <GalaxyBackground />
        </div>

        {/* Contact Form Right Panel */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 max-w-lg mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-700 mb-10">
            We’re here to support you. Reach out anytime and we’ll respond promptly.
          </p>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 rounded-lg border border-green-400 text-green-700 text-center">
              <span className="mr-2 inline-block">✅</span>Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold text-gray-900">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold text-gray-900">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 font-semibold text-gray-900">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:border-indigo-500"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="general">General Inquiry</option>
                <option value="support">Mental Health Support</option>
                <option value="technical">Technical Issue</option>
                <option value="feedback">Feedback</option>
                <option value="crisis">Crisis Support</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-semibold text-gray-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message here"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 resize-y focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-md font-semibold text-lg shadow-md hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Office Hours & Emergency Contacts */}
          <div className="mt-10 space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-md p-6">
              <h2 className="text-indigo-800 font-bold mb-2">Office Hours</h2>
              <ul className="text-indigo-700 text-sm space-y-1">
                <li>Monday - Friday: 9 AM – 5 PM</li>
                <li>Saturday: 10 AM – 2 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-md p-6">
              <h2 className="text-red-700 font-bold mb-2">Emergency Contacts</h2>
              <ul className="text-red-600 text-sm space-y-1">
                <li><strong>Emergency Services:</strong> 911</li>
                <li><strong>Crisis Hotline:</strong> 988</li>
                <li><strong>Student Crisis Line:</strong> (555) 123-HELP</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
