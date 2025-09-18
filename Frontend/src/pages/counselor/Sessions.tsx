import React, { useState } from 'react';
import {
  CalendarDaysIcon,
  ShieldCheckIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  CameraIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  PhoneXMarkIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { VideoCameraSlashIcon } from '@heroicons/react/24/solid';


const patientAvatar = "https://randomuser.me/api/portraits/women/44.jpg";
const doctorAvatar = "https://randomuser.me/api/portraits/women/45.jpg";
const consultantAvatar = "https://randomuser.me/api/portraits/men/46.jpg";
const plantImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=96&q=80";


const sessionTools = [
  { icon: <ClipboardDocumentListIcon className="w-5 h-5" />, label: "Notes" },
  { icon: <RectangleStackIcon className="w-5 h-5" />, label: "Share Screen" },
  { icon: <CameraIcon className="w-5 h-5" />, label: "Record" },
];


function MicToolbarIcon({ muted }: { muted: boolean }) {
  return (
    <div className="relative inline-block">
      <MicrophoneIcon className={`w-6 h-6 ${muted ? 'text-red-500 opacity-40' : 'text-gray-700'}`} />
      {muted && (
        <svg
          className="absolute top-0 left-0 w-6 h-6"
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


export default function MindfulUPage() {
  const [chat, setChat] = useState([
    {
      sender: "David",
      avatar: consultantAvatar,
      text: "Thanks, Sarah! We'll start in a few minutes. Meanwhile, you can ask queries in the chat.",
      self: true,
    },
    {
      sender: "David",
      avatar: consultantAvatar,
      text: "Hello, I'm David. Excited to be here!",
      self: false,
    },
    {
      sender: "Emily",
      avatar: doctorAvatar,
      text: "Hello, I'm Emily. Looking forward to learning about college applications.",
      self: false,
    }
  ]);
  const [input, setInput] = useState('');
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [endCallModal, setEndCallModal] = useState(false);


  // Emergency Protocol modal state
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);


  // Session History modal state and data
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [sessionHistory] = useState([
    { id: 1, date: '2025-09-10', time: '10:00 AM', summary: 'Initial Consultation with Sarah' },
    { id: 2, date: '2025-09-12', time: '02:30 PM', summary: 'Follow-up session with Sarah' },
  ]);


  // Notes modal state and content
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesContent, setNotesContent] = useState('');


  // Record state
  const [isRecording, setIsRecording] = useState(false);


  // Handler for ending call
  const handleEndCall = () => {
    setEndCallModal(false);
    alert('Call ended!');
    // Insert additional call cleanup logic if needed
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* End Call Confirmation Modal */}
      {endCallModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]" role="dialog" aria-modal="true" aria-labelledby="end-call-title">
            <h2 id="end-call-title" className="font-bold mb-2">End Call</h2>
            <p className="mb-4 text-gray-700 text-sm">Are you sure you want to end this call?</p>
            <div className="flex gap-3">
              <button
                onClick={handleEndCall}
                className="px-4 py-2 bg-red-600 text-white rounded font-medium w-full"
              >
                End Call
              </button>
              <button
                onClick={() => setEndCallModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Follow-up Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]" role="dialog" aria-modal="true" aria-labelledby="schedule-title">
            <h2 id="schedule-title" className="font-bold mb-2">Schedule a Follow-up</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                setShowModal(false);
                alert('Follow-up scheduled!');
              }}
              className="mb-4"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="followup-date">Date:</label>
              <input id="followup-date" type="date" className="block w-full border border-gray-300 rounded p-2 mb-2" required />
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="followup-time">Time:</label>
              <input id="followup-time" type="time" className="block w-full border border-gray-300 rounded p-2 mb-3" required />
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded font-medium w-full">Schedule</button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


      {/* Emergency Protocol Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]" role="dialog" aria-modal="true" aria-labelledby="emergency-title">
            <h2 id="emergency-title" className="font-bold mb-2 text-red-600">Emergency Protocol</h2>
            <p className="mb-4 text-gray-700 text-sm">
              In case of emergency, please contact campus security or dial 911 immediately. Stay calm and make sure you are in a safe place.
              <br />
              If you need immediate assistance from your counselor or emergency contact, press the button below.
            </p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded font-medium w-full mb-2"
              onClick={() => {
                alert('Calling emergency contact...');
                setShowEmergencyModal(false);
              }}
              aria-label="Contact Emergency Support"
            >
              Contact Emergency Support
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium w-full"
              onClick={() => setShowEmergencyModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}


      {/* Session History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]" role="dialog" aria-modal="true" aria-labelledby="session-history-title">
            <h2 id="session-history-title" className="font-bold mb-4 text-lg">Session History</h2>
            <ul className="max-h-60 overflow-y-auto">
              {sessionHistory.map(session => (
                <li key={session.id} className="mb-3 border-b border-gray-200 pb-2">
                  <div className="font-semibold">{session.date} - {session.time}</div>
                  <div className="text-sm text-gray-700">{session.summary}</div>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded font-medium"
              onClick={() => setShowHistoryModal(false)}
              aria-label="Close Session History"
            >
              Close
            </button>
          </div>
        </div>
      )}


      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[400px] max-w-lg" role="dialog" aria-modal="true" aria-labelledby="notes-title">
            <h2 id="notes-title" className="font-bold mb-4 text-lg">Session Notes</h2>
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded resize-none"
              placeholder="Write your notes here..."
              value={notesContent}
              onChange={(e) => setNotesContent(e.target.value)}
              aria-label="Session notes text area"
            />
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded font-medium"
                onClick={() => setShowNotesModal(false)}
                aria-label="Save and close notes"
              >
                Save & Close
              </button>
              <button
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium"
                onClick={() => setShowNotesModal(false)}
                aria-label="Close notes without saving"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="grid grid-cols-6 gap-6 px-8 pt-8">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex items-center space-x-4">
              <img src={patientAvatar} alt="Sarah Miller" className="w-16 h-16 rounded-full object-cover border" />
              <div>
                <div className="text-indigo-700 font-bold text-lg">Sarah Miller</div>
                <div className="text-sm text-gray-500">Age: 22</div>
              </div>
            </div>
            <div
              className="mt-4 text-gray-600 text-sm flex items-center gap-1 cursor-pointer select-none"
              onClick={() => setShowHistoryModal(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowHistoryModal(true); }}
              aria-label="Open Session History"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Session History
            </div>
            <div
              className="mt-2 text-red-600 font-semibold text-sm flex items-center gap-1 cursor-pointer select-none"
              onClick={() => setShowEmergencyModal(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowEmergencyModal(true); }}
              aria-label="Open Emergency Protocol"
            >
              <ShieldCheckIcon className="w-5 h-5" />
              Emergency Protocol
            </div>
            {/* Follow-up + Schedule */}
            <div className="mt-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <UserIcon className="w-5 h-5" />
                <span className="whitespace-nowrap">Follow-up</span>
              </div>
              <button
                className="bg-indigo-600 text-white px-4 py-1 rounded text-sm font-medium w-full"
                onClick={() => setShowModal(true)}
                type="button"
              >
                Schedule
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="text-gray-700 font-semibold mb-3">Session Tools</div>
            <div className="flex flex-col space-y-2 text-gray-600 text-sm">
              {sessionTools.map(tool => {
                if (tool.label === "Record") {
                  return (
                    <div
                      key={tool.label}
                      className="flex items-center space-x-2 cursor-pointer hover:text-indigo-600"
                      onClick={() => {
                        setIsRecording(!isRecording);
                        alert(!isRecording ? "Recording started!" : "Recording stopped!");
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && tool.label === "Record") {
                          setIsRecording(!isRecording);
                          alert(!isRecording ? "Recording started!" : "Recording stopped!");
                        }
                      }}
                      aria-label={`${isRecording ? 'Stop' : 'Start'} Recording`}
                    >
                      {tool.icon}
                      <span className="flex items-center space-x-1">
                        <span>{tool.label}</span>
                        {isRecording && (
                          <span
                            className="inline-block w-3 h-3 rounded-full bg-red-600 animate-pulse ml-1"
                            aria-label="Recording"
                          ></span>
                        )}
                      </span>
                    </div>
                  );
                }
                if (tool.label === "Notes") {
                  return (
                    <div
                      key={tool.label}
                      className="flex items-center space-x-2 cursor-pointer hover:text-indigo-600"
                      onClick={() => setShowNotesModal(true)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowNotesModal(true); }}
                      aria-label={`Open ${tool.label}`}
                    >
                      {tool.icon} <span>{tool.label}</span>
                    </div>
                  );
                }
                return (
                  <div key={tool.label} className="flex items-center space-x-2">
                    {tool.icon} <span>{tool.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Support Tip */}
          <div className="bg-indigo-50 rounded-xl shadow p-4 mt-6">
            <div className="flex items-center text-indigo-700 font-semibold mb-2">
              <span className="ml-2">Support Tip</span>
            </div>
            <div className="text-indigo-700 text-sm">
              Sarah mentioned feeling anxious. Try exploring grounding techniques with her. Ask:
              <br />
              <span className="font-medium">"What are three things you can see right now?"</span>
            </div>
          </div>
        </div>


        {/* Main Video Session */}
        <div className="col-span-3 flex flex-col items-center justify-start">
          <div className="bg-white rounded-xl shadow flex flex-col items-center justify-between p-10 w-full relative" style={{ height: "650px" }}>
            <div className="flex items-center justify-center h-[420px] w-full mx-auto mb-6 rounded-lg bg-gray-100 relative">
              <img
                src={plantImage}
                alt="Plant"
                className="absolute right-4 bottom-4 w-32 h-21 rounded shadow-lg object-cover"
              />
            </div>
            {/* Functional Video Conference Toolbar */}
            <div className="flex items-center justify-center gap-8 w-full py-6 border-t border-gray-200 bg-gray-50 rounded-b-xl mt-auto">
              {/* Mic */}
              <button
                className={`p-3 rounded-full ${micOn ? 'bg-white' : 'bg-red-500'} transition`}
                onClick={() => setMicOn(!micOn)}
                title={micOn ? "Mute Microphone" : "Unmute Microphone"}
                aria-label={micOn ? "Mute Microphone" : "Unmute Microphone"}
              >
                <MicToolbarIcon muted={!micOn} />
              </button>
              {/* Camera */}
              <button
                className={`p-3 rounded-full ${videoOn ? 'bg-white' : 'bg-red-500'} transition`}
                onClick={() => setVideoOn(!videoOn)}
                title={videoOn ? "Turn Video Off" : "Turn Video On"}
                aria-label={videoOn ? "Turn Video Off" : "Turn Video On"}
              >
                {videoOn ?
                  <VideoCameraIcon className="w-6 h-6 text-gray-700" /> :
                  <VideoCameraSlashIcon className="w-6 h-6 text-white" />
                }
              </button>
              {/* Screen Share */}
              <button
                className="p-3 rounded-full bg-white hover:bg-gray-200 transition"
                title="Screen Share"
                onClick={() => alert("Screen sharing started!")}
                aria-label="Screen Share"
              >
                <ComputerDesktopIcon className="w-6 h-6 text-gray-700" />
              </button>
              {/* End Call */}
              <button
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition"
                title="End Call"
                onClick={() => setEndCallModal(true)}
                aria-label="End Call"
              >
                <PhoneXMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>


        {/* Chat Sidebar */}
        <div className="col-span-2 flex flex-col">
          <div className="bg-white rounded-xl shadow p-6 h-[650px] flex flex-col w-full max-w-lg">
            {/* Chat Messages */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-2">
              {chat.map((msg, i) =>
                msg.self ? (
                  <div key={i} className="flex justify-end items-end">
                    <div className="flex items-center gap-2 max-w-[75%]">
                      <div className="bg-green-500 text-white px-4 py-2 rounded-3xl text-sm shadow-sm">
                        {msg.text}
                      </div>
                      <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border" />
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start items-end">
                    <div className="flex items-center gap-2 max-w-[75%]">
                      <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border" />
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-3xl text-sm shadow-sm border border-gray-200">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            {/* Chat Input */}
            <form
              className="mt-4 flex items-center"
              onSubmit={e => {
                e.preventDefault();
                if (input.trim()) {
                  setChat([...chat, {
                    sender: "David",
                    avatar: consultantAvatar,
                    text: input.trim(),
                    self: true
                  }]);
                  setInput('');
                }
              }}>
              <input
                className="flex-1 border border-gray-300 rounded-full p-2 text-gray-700 outline-none mr-2"
                placeholder="Type a message"
                value={input}
                onChange={e => setInput(e.target.value)}
                aria-label="Chat message input"
              />
              <button type="submit" className="bg-green-500 p-3 rounded-full flex items-center justify-center hover:bg-green-600" aria-label="Send message">
                <PaperAirplaneIcon className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
