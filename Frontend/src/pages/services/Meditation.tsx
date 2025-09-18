
import React, { useState } from 'react';

// --- Icon Components ---
const ZenithIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4C11.1333 6.01633 9.5 9.11767 4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const PlayIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M6.3 3.7C5.5 3.2 4.5 3.7 4.5 4.6V15.4C4.5 16.3 5.5 16.8 6.3 16.3L15.3 10.9C16.1 10.4 16.1 9.4 15.3 8.9L6.3 3.7Z" />
    </svg>
);

const PauseIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.5 3.5C5.5 2.9 6 2.5 6.5 2.5H8.5C9.1 2.5 9.5 2.9 9.5 3.5V16.5C9.5 17.1 9.1 17.5 8.5 17.5H6.5C6 17.5 5.5 17.1 5.5 16.5V3.5ZM11.5 3.5C11.5 2.9 12 2.5 12.5 2.5H14.5C15.1 2.5 15.5 2.9 15.5 3.5V16.5C15.5 17.1 15.1 17.5 14.5 17.5H12.5C12 17.5 11.5 17.1 11.5 16.5V3.5Z" />
    </svg>
);

const ReplayIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M15.312 11.344A5.5 5.5 0 1 1 10 4.5a1 1 0 0 1 1 1v1.034a.25.25 0 0 0 .41.192l1.64-1.464a.25.25 0 0 0-.01-0.42A7.5 7.5 0 1 0 17.5 10a.75.75 0 0 1-1.5 0c0-.462-.036-.917-.107-1.362a.75.75 0 0 1 .838-.818c.03.002.06.005.09.008a6.99 6.99 0 0 1 .19 1.516Z" clipRule="evenodd" />
    </svg>
);

// --- Main Page Component ---
const MeditationPage = () => {
  const [activeTime, setActiveTime] = useState(10);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(activeTime * 60);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Update timer when activeTime changes
  React.useEffect(() => {
    setSecondsLeft(activeTime * 60);
    setIsRunning(false);
    setIsPaused(false);
  }, [activeTime]);

  // Timer effect
  React.useEffect(() => {
    if (!isRunning || isPaused) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          setIsRunning(false);
          setIsPaused(false);
          return 0;
        }
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isPaused]);

  // Progress calculation
  const totalSeconds = activeTime * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  // Timer display MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Controls
  const handleStart = () => {
    if (secondsLeft === 0) setSecondsLeft(activeTime * 60);
    setIsRunning(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSecondsLeft(activeTime * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] font-sans text-gray-800 flex flex-col">
      {/* Navigation Bar removed as requested */}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-2">Meditation</h1>
          <p className="text-gray-500 text-center mb-6">Find peace and focus with our guided meditation sessions.</p>

          {/* Time Selection */}
          <div className="flex space-x-3 mb-8">
            {[5, 10, 15].map((time) => (
              <button
                key={time}
                onClick={() => setActiveTime(time)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  activeTime === time ? 'bg-purple-200 text-purple-800' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                }`}
              >
                {time} min
              </button>
            ))}
          </div>

          {/* Timer Circle */}
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#E9D5FF" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="339.29"
                strokeDashoffset={339.29 - (progress / 100) * 339.29}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold tracking-wider">{formatTime(secondsLeft)}</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              className="p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
              onClick={handlePause}
              disabled={!isRunning}
              aria-label="Pause"
            >
              <PauseIcon className="w-5 h-5" />
            </button>
            <button
              className="bg-purple-600 text-white rounded-2xl px-10 py-4 font-semibold flex items-center space-x-2 hover:bg-purple-700 transition-colors shadow-md shadow-purple-200"
              onClick={handleStart}
              disabled={isRunning && !isPaused}
              aria-label="Start"
            >
              <PlayIcon className="w-5 h-5"/>
              <span>Start</span>
            </button>
            <button
              className="p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
              onClick={handleReset}
              aria-label="Reset"
            >
              <ReplayIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Guiding Text */}
          <p className="text-gray-500 text-center text-sm mb-8">Close your eyes... Focus on your breath... Let thoughts pass.</p>

          {/* Divider */}
          <div className="w-full border-t border-gray-200 mb-6"></div>

          {/* Background Sound Toggle */}
          <div className="w-full flex justify-between items-center">
            <span className="font-semibold">Background Sound</span>
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                isSoundOn ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  isSoundOn ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeditationPage;