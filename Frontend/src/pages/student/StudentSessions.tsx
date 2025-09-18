import React, { useState } from 'react';
import {
  BookOpenIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  CameraIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  PhoneXMarkIcon,
  ComputerDesktopIcon,
  FaceSmileIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  UserIcon,
  LightBulbIcon,
  DocumentTextIcon,
  PlayIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { VideoCameraSlashIcon } from '@heroicons/react/24/solid';

const studentAvatar = "https://randomuser.me/api/portraits/women/44.jpg";
const counselorAvatar = "https://randomuser.me/api/portraits/women/45.jpg";
const plantImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=96&q=80";
const calmImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=96&q=80";

const studentResources = [
  { 
    icon: <DocumentTextIcon className="w-5 h-5" />, 
    label: "Worksheets", 
    type: "worksheet",
    description: "Self-reflection and coping worksheets"
  },
  { 
    icon: <PlayIcon className="w-5 h-5" />, 
    label: "Videos", 
    type: "video",
    description: "Guided meditation and wellness videos"
  },
  { 
    icon: <BookOpenIcon className="w-5 h-5" />, 
    label: "Articles", 
    type: "article",
    description: "Mental health resources and tips"
  },
];

const sessionResources = [
  { 
    icon: <BookOpenIcon className="w-5 h-5" />, 
    label: "Resources"
  },
  { 
    icon: <DocumentTextIcon className="w-5 h-5" />, 
    label: "My Notes"
  },
  { 
    icon: <ComputerDesktopIcon className="w-5 h-5" />, 
    label: "Screenshot"
  },
];

const moodOptions = [
  { emoji: "😊", label: "Great", value: 5 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "😔", label: "Low", value: 2 },
  { emoji: "😢", label: "Struggling", value: 1 },
];

function MicToolbarIcon({ muted }: { muted: boolean }) {
  return (
    <div className="relative inline-block">
      <MicrophoneIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${muted ? 'text-red-500 opacity-40' : 'text-gray-700'}`} />
      {muted && (
        <svg
          className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

export default function StudentSessionPage() {
  const [chat, setChat] = useState([
    {
      sender: "Dr. Emily",
      avatar: counselorAvatar,
      text: "Hi Sarah! How are you feeling today? Ready for our session?",
      self: false,
    },
    {
      sender: "Sarah",
      avatar: studentAvatar,
      text: "Hi Dr. Emily! I'm doing okay, a bit nervous about my upcoming exams.",
      self: true,
    },
    {
      sender: "Dr. Emily",
      avatar: counselorAvatar,
      text: "That's completely normal. Let's work through some strategies to help you manage that anxiety.",
      self: false,
    }
  ]);

  const [input, setInput] = useState('');
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [endCallModal, setEndCallModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Session History modal state and data
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [sessionHistory] = useState([
    { id: 1, date: '2025-09-10', time: '10:00 AM', summary: 'Initial Check-in - Discussed academic stress' },
    { id: 2, date: '2025-09-12', time: '02:30 PM', summary: 'Coping strategies session - Practiced breathing exercises' },
    { id: 3, date: '2025-09-15', time: '11:00 AM', summary: 'Progress review - Improved sleep schedule' },
  ]);

  // Personal Notes modal state and content
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesContent, setNotesContent] = useState('');

  // Resources modal state
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [resources] = useState([
    { title: "Mindfulness Guide", type: "PDF", description: "5-minute daily mindfulness exercises" },
    { title: "Stress Management", type: "Video", description: "Techniques for managing academic pressure" },
    { title: "Sleep Hygiene Tips", type: "Article", description: "Improving your sleep schedule" },
    { title: "Breathing Exercises", type: "Audio", description: "Guided relaxation sessions" },
  ]);

  // Screenshot state
  const [showScreenshotFeedback, setShowScreenshotFeedback] = useState(false);

  // Handler for ending session
  const handleEndSession = () => {
    setEndCallModal(false);
    alert('Session ended! Take care, Sarah.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 font-sans">
      {/* Mobile Navigation Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm border-b">
        <div className="flex items-center space-x-3">
          <img src={studentAvatar} alt="Sarah Miller" className="w-8 h-8 rounded-full object-cover border-2 border-purple-200" />
          <div>
            <div className="text-purple-700 font-semibold text-sm">Sarah Miller</div>
            <div className="text-xs text-gray-500">Session #4</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            aria-label="Toggle Chat"
          >
            <LightBulbIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            aria-label="Toggle Menu"
          >
            {showSidebar ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* End Session Confirmation Modal */}
      {endCallModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" role="dialog" aria-modal="true" aria-labelledby="end-session-title">
            <h2 id="end-session-title" className="font-bold mb-2 text-lg">End Session</h2>
            <p className="mb-4 text-gray-700 text-sm">Are you sure you want to end this session? Your progress will be saved.</p>
            <div className="flex gap-3">
              <button
                onClick={handleEndSession}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium w-full hover:bg-purple-700 transition"
              >
                End Session
              </button>
              <button
                onClick={() => setEndCallModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium w-full hover:bg-gray-300 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Crisis Support Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" role="dialog" aria-modal="true" aria-labelledby="crisis-title">
            <h2 id="crisis-title" className="font-bold mb-2 text-red-600 text-lg">Crisis Support</h2>
            <p className="mb-4 text-gray-700 text-sm">
              If you're having thoughts of self-harm or suicide, please reach out for immediate help:
              <br /><br />
              <strong>National Suicide Prevention Lifeline:</strong> 988<br />
              <strong>Crisis Text Line:</strong> Text HOME to 741741<br />
              <strong>Campus Security:</strong> [Your Campus Number]
            </p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium w-full mb-2 hover:bg-red-700 transition"
              onClick={() => {
                alert('Connecting you with crisis support...');
                setShowCrisisModal(false);
              }}
              aria-label="Get Immediate Help"
            >
              Get Immediate Help
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium w-full hover:bg-gray-300 transition"
              onClick={() => setShowCrisisModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Session History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md" role="dialog" aria-modal="true" aria-labelledby="session-history-title">
            <h2 id="session-history-title" className="font-bold mb-4 text-lg">My Session History</h2>
            <ul className="max-h-60 overflow-y-auto space-y-3">
              {sessionHistory.map(session => (
                <li key={session.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-purple-700">{session.date} - {session.time}</div>
                  <div className="text-sm text-gray-700 mt-1">{session.summary}</div>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
              onClick={() => setShowHistoryModal(false)}
              aria-label="Close Session History"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Personal Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg" role="dialog" aria-modal="true" aria-labelledby="notes-title">
            <h2 id="notes-title" className="font-bold mb-4 text-lg">My Personal Notes</h2>
            <p className="text-gray-600 text-sm mb-3">Jot down thoughts, insights, or things you want to remember from this session.</p>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="What insights did you gain today? How are you feeling?"
              value={notesContent}
              onChange={(e) => setNotesContent(e.target.value)}
              aria-label="Personal notes text area"
            />
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
                onClick={() => setShowNotesModal(false)}
                aria-label="Save and close notes"
              >
                Save Notes
              </button>
              <button
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
                onClick={() => setShowNotesModal(false)}
                aria-label="Close notes"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resources Modal */}
      {showResourcesModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg" role="dialog" aria-modal="true" aria-labelledby="resources-title">
            <h2 id="resources-title" className="font-bold mb-4 text-lg">Helpful Resources</h2>
            <div className="max-h-60 overflow-y-auto space-y-3">
              {resources.map((resource, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-semibold text-purple-700">{resource.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{resource.description}</div>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full ml-2">
                      {resource.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
              onClick={() => setShowResourcesModal(false)}
              aria-label="Close Resources"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Screenshot Feedback */}
      {showScreenshotFeedback && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          <p className="text-sm">📸 Screenshot saved! You can review it later.</p>
        </div>
      )}

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row relative">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowSidebar(false)} />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-72 xl:w-80 bg-white border-r border-gray-200 p-4 lg:p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}>
          {/* Profile Section - Desktop Only */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col items-center space-y-3">
              <img src={studentAvatar} alt="Sarah Miller" className="w-16 h-16 rounded-full object-cover border-4 border-purple-200" />
              <div className="text-center">
                <div className="text-purple-700 font-bold text-lg">Sarah Miller</div>
                <div className="text-sm text-gray-500">Psychology Major</div>
                <div className="text-xs text-gray-400">Session #4</div>
              </div>
            </div>
            <div
              className="mt-4 text-gray-600 text-sm flex items-center gap-2 cursor-pointer select-none hover:text-purple-600 transition"
              onClick={() => {
                setShowHistoryModal(true);
                setShowSidebar(false);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowHistoryModal(true); }}
              aria-label="Open Session History"
            >
              <CalendarDaysIcon className="w-4 h-4" />
              My Sessions
            </div>
            <div
              className="mt-2 text-red-600 font-semibold text-sm flex items-center gap-2 cursor-pointer select-none hover:text-red-700 transition"
              onClick={() => {
                setShowCrisisModal(true);
                setShowSidebar(false);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowCrisisModal(true); }}
              aria-label="Open Crisis Support"
            >
              <ShieldCheckIcon className="w-4 h-4" />
              Crisis Support
            </div>
          </div>

          {/* Session Tools */}
          <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 mb-6">
            <div className="text-gray-700 font-semibold mb-3">Session Tools</div>
            <div className="flex flex-col space-y-3 text-gray-600 text-sm">
              {sessionResources.map(tool => {
                if (tool.label === "Resources") {
                  return (
                    <div
                      key={tool.label}
                      className="flex items-center space-x-2 cursor-pointer hover:text-purple-600 transition"
                      onClick={() => {
                        setShowResourcesModal(true);
                        setShowSidebar(false);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowResourcesModal(true); }}
                      aria-label="Open Resources"
                    >
                      {tool.icon} <span>{tool.label}</span>
                    </div>
                  );
                }
                if (tool.label === "My Notes") {
                  return (
                    <div
                      key={tool.label}
                      className="flex items-center space-x-2 cursor-pointer hover:text-purple-600 transition"
                      onClick={() => {
                        setShowNotesModal(true);
                        setShowSidebar(false);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowNotesModal(true); }}
                      aria-label="Open My Notes"
                    >
                      {tool.icon} <span>{tool.label}</span>
                    </div>
                  );
                }
                if (tool.label === "Screenshot") {
                  return (
                    <div
                      key={tool.label}
                      className="flex items-center space-x-2 cursor-pointer hover:text-purple-600 transition"
                      onClick={() => {
                        setShowScreenshotFeedback(true);
                        setTimeout(() => setShowScreenshotFeedback(false), 3000);
                        setShowSidebar(false);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setShowScreenshotFeedback(true);
                          setTimeout(() => setShowScreenshotFeedback(false), 3000);
                        }
                      }}
                      aria-label="Take Screenshot"
                    >
                      {tool.icon} <span>{tool.label}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="lg:hidden space-y-4">
            <div
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
              onClick={() => {
                setShowHistoryModal(true);
                setShowSidebar(false);
              }}
            >
              <CalendarDaysIcon className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">My Sessions</span>
            </div>
            <div
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
              onClick={() => {
                setShowCrisisModal(true);
                setShowSidebar(false);
              }}
            >
              <ShieldCheckIcon className="w-5 h-5 text-red-600" />
              <span className="text-red-600 font-semibold">Crisis Support</span>
            </div>
          </div>

          {/* Wellness Tip */}
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-lg p-4">
            <div className="flex items-center text-purple-700 font-semibold mb-2">
              <HeartIcon className="w-5 h-5 mr-2" />
              <span>Wellness Reminder</span>
            </div>
            <div className="text-purple-700 text-sm">
              Remember to be gentle with yourself. Progress isn't always linear, and every small step counts.
              <br />
              <span className="font-medium mt-2 block">💙 You're doing great by being here!</span>
            </div>
          </div>
        </div>

        {/* Main Video Section */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 lg:p-6">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8 xl:p-10 w-full">
              {/* Video Area */}
              <div className="aspect-video lg:aspect-[16/10] xl:aspect-[16/9] w-full mb-4 lg:mb-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 relative flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <VideoCameraIcon className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 opacity-30" />
                  <p className="text-sm lg:text-base">Your counselor will appear here</p>
                </div>
                <img
                  src={calmImage}
                  alt="Calming nature view"
                  className="absolute right-2 bottom-2 lg:right-4 lg:bottom-4 w-20 h-12 lg:w-32 lg:h-20 rounded-lg shadow-lg object-cover"
                />
              </div>

              {/* Video Controls */}
              <div className="flex items-center justify-center gap-4 lg:gap-8 w-full py-4 lg:py-6 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 rounded-b-2xl">
                {/* Mic */}
                <button
                  className={`p-2 lg:p-3 rounded-full shadow-md ${micOn ? 'bg-white hover:bg-gray-50' : 'bg-red-500 hover:bg-red-600'} transition`}
                  onClick={() => setMicOn(!micOn)}
                  title={micOn ? "Mute Microphone" : "Unmute Microphone"}
                  aria-label={micOn ? "Mute Microphone" : "Unmute Microphone"}
                >
                  <MicToolbarIcon muted={!micOn} />
                </button>
                {/* Camera */}
                <button
                  className={`p-2 lg:p-3 rounded-full shadow-md ${videoOn ? 'bg-white hover:bg-gray-50' : 'bg-red-500 hover:bg-red-600'} transition`}
                  onClick={() => setVideoOn(!videoOn)}
                  title={videoOn ? "Turn Video Off" : "Turn Video On"}
                  aria-label={videoOn ? "Turn Video Off" : "Turn Video On"}
                >
                  {videoOn ?
                    <VideoCameraIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" /> :
                    <VideoCameraSlashIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  }
                </button>
                {/* Screen Share - Hidden on small screens */}
                <button
                  className="hidden sm:block p-2 lg:p-3 rounded-full bg-white hover:bg-gray-50 shadow-md transition"
                  title="Share Screen"
                  onClick={() => alert("Screen sharing started!")}
                  aria-label="Share Screen"
                >
                  <ComputerDesktopIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
                </button>
                {/* End Session */}
                <button
                  className="p-2 lg:p-3 rounded-full bg-purple-600 hover:bg-purple-700 shadow-md transition"
                  title="End Session"
                  onClick={() => setEndCallModal(true)}
                  aria-label="End Session"
                >
                  <PhoneXMarkIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar - Desktop Only / Mobile Modal */}
        <div className="hidden xl:block w-80 2xl:w-96 border-l border-gray-200">
          <div className="bg-white shadow-lg p-6 h-screen flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
              <span className="text-lg font-semibold text-gray-700">Session Chat</span>
              <LightBulbIcon className="w-5 h-5 text-yellow-500" />
            </div>
            {/* Chat Messages */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-2">
              {chat.map((msg, i) =>
                msg.self ? (
                  <div key={i} className="flex justify-end items-end">
                    <div className="flex items-center gap-2 max-w-[75%]">
                      <div className="bg-purple-500 text-white px-4 py-2 rounded-2xl text-sm shadow-sm">
                        {msg.text}
                      </div>
                      <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border-2 border-purple-200" />
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start items-end">
                    <div className="flex items-center gap-2 max-w-[75%]">
                      <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border-2 border-blue-200" />
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl text-sm shadow-sm border border-gray-200">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            {/* Chat Input */}
            <form
              className="mt-4 flex items-center gap-2"
              onSubmit={e => {
                e.preventDefault();
                if (input.trim()) {
                  setChat([...chat, {
                    sender: "Sarah",
                    avatar: studentAvatar,
                    text: input.trim(),
                    self: true
                  }]);
                  setInput('');
                }
              }}>
              <input
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Share your thoughts..."
                value={input}
                onChange={e => setInput(e.target.value)}
                aria-label="Chat message input"
              />
              <button 
                type="submit" 
                className="bg-purple-500 p-3 rounded-full flex items-center justify-center hover:bg-purple-600 shadow-md transition" 
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Chat Modal */}
        {showChat && (
          <div className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full h-2/3 rounded-t-2xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-700">Session Chat</span>
                  <LightBulbIcon className="w-5 h-5 text-yellow-500" />
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {/* Chat Messages */}
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-2">
                {chat.map((msg, i) =>
                  msg.self ? (
                    <div key={i} className="flex justify-end items-end">
                      <div className="flex items-center gap-2 max-w-[75%]">
                        <div className="bg-purple-500 text-white px-4 py-2 rounded-2xl text-sm shadow-sm">
                          {msg.text}
                        </div>
                        <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border-2 border-purple-200" />
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-start items-end">
                      <div className="flex items-center gap-2 max-w-[75%]">
                        <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border-2 border-blue-200" />
                        <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl text-sm shadow-sm border border-gray-200">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              {/* Chat Input */}
              <form
                className="mt-4 flex items-center gap-2"
                onSubmit={e => {
                  e.preventDefault();
                  if (input.trim()) {
                    setChat([...chat, {
                      sender: "Sarah",
                      avatar: studentAvatar,
                      text: input.trim(),
                      self: true
                    }]);
                    setInput('');
                  }
                }}>
                <input
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Share your thoughts..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  aria-label="Chat message input"
                />
                <button 
                  type="submit" 
                  className="bg-purple-500 p-3 rounded-full flex items-center justify-center hover:bg-purple-600 shadow-md transition" 
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon className="w-5 h-5 text-white" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
