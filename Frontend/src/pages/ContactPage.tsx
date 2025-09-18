import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const subjectOptions = [
  "General Inquiry",
  "Feedback",
  "Request Callback",
  "Report Issue",
  "Other",
];

const ContactPageBody = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: subjectOptions[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API delay
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        email: "",
        subject: subjectOptions[0],
        message: "",
      });
      toast.success("Thank you for contacting us! We'll get back to you soon.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#fafbfc] pb-20 pt-10 px-2 md:px-0 flex flex-col items-center">
      {/* Hero Card */}
      <div className="w-full max-w-3xl mx-auto rounded-2xl p-8 mb-8 bg-gradient-to-tr from-[#f3e8ff] via-[#d0e3fa] to-[#f5eaff] flex flex-col items-center shadow transition">
        <div className="flex flex-col items-center">
          <img 
            src="/Logo.png" 
            alt="MindfulU Logo" 
            className="h-24 w-auto mb-4" 
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">
            We're here for you.
          </h2>
        </div>
        <p className="text-lg text-gray-600 text-center">
          Your mental health matters.
        </p>
      </div>

      {/* Contact Us Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mb-10">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contact Us</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              type="text"
              name="name"
              value={form.name}
              placeholder="Enter your name"
              required
              onChange={handleChange}
              disabled={submitted}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              type="email"
              name="email"
              value={form.email}
              required
              placeholder="Enter your email"
              onChange={handleChange}
              disabled={submitted}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              disabled={submitted}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 bg-white"
            >
              {subjectOptions.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none min-h-[120px]"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
              disabled={submitted}
            />
          </div>
          <button
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition disabled:opacity-50"
            type="submit"
            disabled={submitted}
          >
            {submitted ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Bottom Info Cards */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Office Hours */}
        <div className="flex-1 bg-[#edefff] rounded-2xl p-7 shadow items-start">
          <div className="text-lg font-semibold mb-2 text-gray-800">NeuroWell Office Hours</div>
          <p className="text-gray-600 text-sm mb-4">Our team is available to assist you during the following hours:</p>
          <table className="w-full text-left text-sm">
            <tbody>
              <tr>
                <td className="py-1 text-gray-700 font-medium">Monday - Friday</td>
                <td className="py-1 text-gray-600">9:00 AM - 5:00 PM</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-700 font-medium">Saturday</td>
                <td className="py-1 text-gray-600">10:00 AM - 2:00 PM</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-700 font-medium">Sunday</td>
                <td className="py-1 text-gray-600">Closed</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Emergency Contacts */}
        <div className="flex-1 bg-[#fff0f3] rounded-2xl p-7 shadow">
          <div className="text-lg font-semibold mb-2 text-gray-800">Emergency Contacts</div>
          <p className="text-gray-600 text-sm mb-4">
            If you are in immediate danger, please contact one of the following resources:
          </p>
          <ul className="text-sm space-y-2">
            <li>
              <span className="font-medium">National Crisis &amp; Suicide Lifeline</span> &mdash;{" "}
              <span className="text-[#e53e3e] font-semibold">Call or text 988</span>
            </li>
            <li>
              <span className="font-medium">Crisis Text Line</span> &mdash;{" "}
              <span className="text-[#ed64a6] font-semibold">Text HOME to 741741</span>
            </li>
            <li>
              <span className="font-medium">The Trevor Project</span> &mdash;{" "}
              <span className="text-[#d53f8c] font-semibold">Call 866-488-7386</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ContactPageBody;
