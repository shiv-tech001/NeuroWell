// src/components/BreathingExercisePage.js

import React, { useState, useRef, useEffect } from 'react';

const PlayIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#9333ea" />
    <polygon points="10,8 16,12 10,16" fill="#fff" />
  </svg>
);

const PauseIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#6b7280" />
    <rect x="8" y="8" width="2" height="8" fill="#fff" />
    <rect x="14" y="8" width="2" height="8" fill="#fff" />
  </svg>
);

const StopIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#ef4444" />
    <rect x="8" y="8" width="8" height="8" fill="#fff" />
  </svg>
);

const MODES = {
  '4-7-8': {
    label: '4-7-8',
    sequence: [
      { phase: 'Inhale', duration: 4 },
      { phase: 'Hold', duration: 7 },
      { phase: 'Exhale', duration: 8 },
    ],
    cycles: 5,
  },
  'Box': {
    label: 'Box',
    sequence: [
      { phase: 'Inhale', duration: 4 },
      { phase: 'Hold', duration: 4 },
      { phase: 'Exhale', duration: 4 },
    ],
    cycles: Infinity,
  },
  'Custom': {
    label: 'Custom',
    sequence: [], // Will be set by user
    cycles: Infinity,
  },
};

const BreathingExercise = () => {
  const [activeMode, setActiveMode] = useState('4-7-8');
  const [customSequence, setCustomSequence] = useState([
    { phase: 'Inhale', duration: 4 },
    { phase: 'Hold', duration: 4 },
    { phase: 'Exhale', duration: 4 },
  ]);
  const [customCycles, setCustomCycles] = useState(5);
  const [customSubmitted, setCustomSubmitted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [phaseIdx, setPhaseIdx] = useState(0);
  
  // Show initial value for timer
  const getInitialSeconds = () => {
    const config = activeMode === 'Custom'
      ? { ...MODES.Custom, sequence: customSequence, cycles: customCycles }
      : MODES[activeMode];
    return config.sequence[0]?.duration || 0;
  };
  
  const [secondsLeft, setSecondsLeft] = useState(getInitialSeconds());
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);

  // Get current mode config
  const modeConfig = activeMode === 'Custom'
    ? { ...MODES.Custom, sequence: customSubmitted ? customSequence : [], cycles: customSubmitted ? customCycles : Infinity }
    : MODES[activeMode];

  // Update timer when mode changes (if not running)
  useEffect(() => {
    if (!isRunning) {
      setPhaseIdx(0);
      setSecondsLeft(getInitialSeconds());
      setProgress(100);
      setCustomSubmitted(false);
    }
    // eslint-disable-next-line
  }, [activeMode, customSequence, customCycles]);

  // Start timer
  const handleStart = () => {
    // Only allow start if custom is submitted or not custom mode
    if (activeMode === 'Custom' && !customSubmitted) return;
    setIsRunning(true);
    setIsPaused(false);
    setCycle(1);
    setPhaseIdx(0);
    setSecondsLeft(modeConfig.sequence[0]?.duration || 0);
    setProgress(100);
  };

  // Pause timer
  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Stop/Reset timer
  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCycle(1);
    setPhaseIdx(0);
    setSecondsLeft(0);
    setProgress(100);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Custom input handlers
  const handleCustomChange = (idx, value) => {
    setCustomSequence(seq => seq.map((step, i) => i === idx ? { ...step, duration: value } : step));
    setCustomSubmitted(false);
  };
  
  const handleCustomCyclesChange = (value) => {
    setCustomCycles(value);
    setCustomSubmitted(false);
  };
  
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    setCustomSubmitted(true);
    setIsRunning(true);
    setIsPaused(false);
    setCycle(1);
    setPhaseIdx(0);
    setSecondsLeft(customSequence[0]?.duration || 0);
    setProgress(100);
  };

  // Timer effect
  useEffect(() => {
    if (!isRunning || isPaused) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds > 1) {
          setProgress((prevSeconds - 1) / modeConfig.sequence[phaseIdx].duration * 100);
          return prevSeconds - 1;
        } else {
          // End of current phase, move to next phase or cycle
          let nextPhaseIdx = phaseIdx;
          let nextCycle = cycle;
          if (phaseIdx < modeConfig.sequence.length - 1) {
            nextPhaseIdx = phaseIdx + 1;
            setPhaseIdx(nextPhaseIdx);
            setProgress(100);
            return modeConfig.sequence[nextPhaseIdx].duration;
          } else {
            // End of cycle
            if (cycle < modeConfig.cycles) {
              nextCycle = cycle + 1;
              setCycle(nextCycle);
              setPhaseIdx(0);
              setProgress(100);
              return modeConfig.sequence[0].duration;
            } else {
              // All cycles done
              setIsRunning(false);
              setProgress(100);
              if (intervalRef.current) clearInterval(intervalRef.current);
              return 0;
            }
          }
        }
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [isRunning, isPaused, phaseIdx, cycle, activeMode, customSequence, customCycles]);

  // Responsive circle size
  const circleSize = 260;
  const strokeWidth = 12;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="min-h-screen bg-[#F9F7FF] font-sans flex flex-col items-center justify-center px-2">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Main Circular Timer & Progress */}
        <div className="w-full flex flex-col items-center">
          <div className="relative flex flex-col items-center justify-center mb-2">
            {/* Circular Progress Bar */}
            <svg width={circleSize} height={circleSize} className="mb-4">
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke="#e9d5ff"
                strokeWidth={strokeWidth}
                fill="#fff"
              />
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke="#9333ea"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            {/* Timer Text */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-purple-700 mb-2">
                {isRunning ? modeConfig.sequence[phaseIdx].phase : 'Ready?'}
              </h2>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {secondsLeft}
              </div>
              {activeMode === '4-7-8' && (
                <div className="text-lg text-gray-500">Cycle {cycle}/{modeConfig.cycles}</div>
              )}
              {isRunning && cycle > modeConfig.cycles && (
                <div className="text-lg text-green-600 font-semibold">Done!</div>
              )}
            </div>
          </div>
          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-2 mb-8">
            <button
              className="rounded-full bg-purple-600 p-4 shadow-lg hover:bg-purple-700 transition-colors"
              onClick={handleStart}
              disabled={isRunning}
              aria-label="Start"
            >
              <PlayIcon className="w-10 h-10" />
            </button>
            <button
              className="rounded-full bg-gray-500 p-4 shadow-lg hover:bg-gray-700 transition-colors"
              onClick={handlePause}
              disabled={!isRunning}
              aria-label="Pause"
            >
              <PauseIcon className="w-10 h-10" />
            </button>
            <button
              className="rounded-full bg-red-500 p-4 shadow-lg hover:bg-red-700 transition-colors"
              onClick={handleStop}
              aria-label="Stop"
            >
              <StopIcon className="w-10 h-10" />
            </button>
          </div>
        </div>
        {/* Mode Selection Cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full mt-2 mb-8">
          {Object.keys(MODES).map(mode => (
            <button
              key={mode}
              className={`flex-1 p-6 rounded-2xl shadow-sm text-center transition-all duration-300 ease-in-out
                ${activeMode === mode ? 'bg-purple-100 border-2 border-purple-600 scale-105' : 'bg-white border-2 border-transparent hover:shadow-md'}`}
              onClick={() => setActiveMode(mode)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{MODES[mode].label}</h3>
              <p className="text-sm text-gray-500">{mode === 'Custom' ? 'Set your own' : 'Guided'}</p>
            </button>
          ))}
        </div>
        {/* Custom Mode Inputs */}
        {activeMode === 'Custom' && !customSubmitted && (
          <form className="mb-8 flex flex-col items-center bg-white rounded-xl shadow p-6 w-full" onSubmit={handleCustomSubmit}>
            <label className="mb-2 text-gray-700 font-medium">Custom Breathing Sequence (seconds):</label>
            {customSequence.map((step, idx) => (
              <div key={step.phase} className="flex items-center gap-2 mb-2">
                <span className="w-20 text-right text-gray-600">{step.phase}:</span>
                <input
                  type="number"
                  min={1}
                  value={step.duration}
                  onChange={e => handleCustomChange(idx, Number(e.target.value))}
                  className="border border-gray-300 rounded px-4 py-2 w-24 text-center"
                />
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-20 text-right text-gray-600">Cycles:</span>
              <input
                type="number"
                min={1}
                value={customCycles}
                onChange={e => handleCustomCyclesChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-4 py-2 w-24 text-center"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
