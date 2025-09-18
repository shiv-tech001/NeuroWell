
import React, { useState, useEffect, useRef } from "react";

// --- SVG Icons for Buttons ---
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h2.25a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75H6.75zm6 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h2.25a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75H12.75z" clipRule="evenodd" />
  </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-3.181-4.991v4.99" />
    </svg>
);

// --- Yoga Poses Data ---
const yogaPoses = [
    { name: "Balasana (Child's Pose)", description: "Calms the mind, reduces stress and fatigue.", image: "/balasana.jpg" },
    { name: "Sukhasana (Easy Pose)", description: "Promotes relaxation and mindfulness.", image: "/sukhasana.jpg" },
    { name: "Viparita Karani (Legs-Up-The-Wall)", description: "Relieves anxiety, improves circulation.", image: "/viparitaKarani.jpg" },
    { name: "Shavasana (Corpse Pose)", description: "Deep relaxation, reduces stress.", image: "/shavasana.jpg" },
    { name: "Padmasana (Lotus Pose)", description: "Enhances focus and restlessness.", image: "/padmasana.jpg" },
    { name: "Setu Bandhasana (Bridge Pose)", description: "Opens chest, energizes mind.", image: "/setuBandhasana.jpg" },
    { name: "Anjaneyasana (Low Lunge)", description: "Relieves mild depression, improves mood.", image: "/Anjaneyasana.jpg" },
    { name: "Tadasana (Mountain Pose)", description: "Improves posture and mental stability.", image: "/tadasana.jpg" },
    { name: "Paschimottanasana (Seated Forward Bend)", description: "Calms the brain, relieves stress and anxiety.", image: "/paschimottanasana.jpg" },
    { name: "Uttanasana (Standing Forward Bend)", description: "Releases tension, soothes the mind.", image: "/uttanasana.jpg" },
    { name: "Matsyasana (Fish Pose)", description: "Opens chest, improves breathing.", image: "/matsyasana.jpg" },
    { name: "Ardha Matsyendrasana (Seated Spinal Twist)", description: "Detoxifies body, relieves stress.", image: "/ardhaMatsyendrasana.jpg" },
];

const YogaPosesPage = () => {
    const [currentPose, setCurrentPose] = useState(0);
    const [duration, setDuration] = useState(15);
    const [timeLeft, setTimeLeft] = useState(15);
    const [customTime, setCustomTime] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    // Circular Progress Bar Calculation
    const radius = 160;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (timeLeft / duration) * circumference;

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (isRunning && timeLeft === 0) {
            handleNext();
        }
        return () => clearTimeout(timerRef.current);
    }, [isRunning, timeLeft]);

    const handleStart = () => {
        const newDuration = customTime ? parseInt(customTime, 10) : 15;
        setDuration(newDuration);
        setTimeLeft(newDuration);
        setIsRunning(true);
    };

    const handlePauseResume = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        const newDuration = customTime ? parseInt(customTime, 10) : 15;
        setDuration(newDuration);
        setTimeLeft(newDuration);
    };

    const handlePrevious = () => {
        if (currentPose > 0) {
            setCurrentPose(currentPose - 1);
            resetTimerForSlideChange();
        }
    };

    const handleNext = () => {
        if (currentPose < yogaPoses.length - 1) {
            setCurrentPose(currentPose + 1);
            resetTimerForSlideChange();
        } else {
             // Optional: Handle session completion
             setIsRunning(false);
        }
    };

    const resetTimerForSlideChange = () => {
        const newDuration = customTime ? parseInt(customTime, 10) : 15;
        setDuration(newDuration);
        setTimeLeft(newDuration);
    };
    
    return (
        <div className="min-h-screen bg-slate-100 font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col items-center">

                {/* --- Pose Image and Timer --- */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 mb-6 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="absolute w-full h-full" viewBox="0 0 360 360">
                        <circle cx="180" cy="180" r={radius} fill="none" stroke="#e6e6e6" strokeWidth="12" />
                    </svg>
                    {/* Progress Circle */}
                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 360 360">
                        <circle
                            cx="180" cy="180" r={radius} fill="none"
                            stroke="#38bdf8" strokeWidth="16" strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={progressOffset}
                            style={{ transition: 'stroke-dashoffset 1s linear' }}
                        />
                    </svg>
                    {/* Image inside */}
                    <div className="relative w-[85%] h-[85%]">
                        <img
                            key={currentPose} // This key helps trigger animations on change
                            src={yogaPoses[currentPose].image}
                            alt={yogaPoses[currentPose].name}
                            className="rounded-full w-full h-full object-cover shadow-lg animate-fade-in"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full">
                            <span className="text-white text-6xl font-bold drop-shadow-lg">{timeLeft}s</span>
                        </div>
                    </div>
                </div>

                {/* --- Pose Info --- */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{yogaPoses[currentPose].name}</h2>
                    <p className="text-slate-500 max-w-sm">{yogaPoses[currentPose].description}</p>
                </div>

                {/* --- Control Panel --- */}
                <div className="w-full flex flex-col items-center gap-6">
                    {/* --- Main Controls: Previous, Play/Pause, Next --- */}
                    <div className="flex items-center justify-center gap-4 w-full">
                        <button onClick={handlePrevious} disabled={currentPose === 0} className="p-4 bg-slate-200 text-slate-600 rounded-full disabled:opacity-50 hover:bg-slate-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>

                        <button onClick={isRunning ? handlePauseResume : handleStart} className="w-20 h-20 bg-sky-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-sky-600 transition-transform transform hover:scale-105">
                            {isRunning ? <PauseIcon /> : <PlayIcon />}
                        </button>

                        <button onClick={handleNext} disabled={currentPose === yogaPoses.length - 1} className="p-4 bg-slate-200 text-slate-600 rounded-full disabled:opacity-50 hover:bg-slate-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                    </div>

                    {/* --- Secondary Controls: Custom Time & Reset --- */}
                    <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl w-full max-w-xs">
                        <input
                            type="number" value={customTime}
                            onChange={(e) => setCustomTime(e.target.value)}
                            placeholder="Secs"
                            className="px-3 py-2 w-20 text-center rounded-lg border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                        <button onClick={handleReset} className="flex items-center justify-center flex-grow bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition-colors">
                           <ResetIcon />
                           Reset Timer
                        </button>
                    </div>

                    <div className="text-slate-500 font-medium">
                        Pose {currentPose + 1} / {yogaPoses.length}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YogaPosesPage;