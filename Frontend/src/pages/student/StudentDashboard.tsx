import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  Bell, Smile, Heart, Zap, Award, Users, MessageCircle,
  Phone, Video, LifeBuoy, BookOpen, Wind, Calendar,
  Trophy, ChevronRight, User, Plus, X, AlertTriangle,
  Shield, Droplets, Leaf, Sun, Coffee,
  Check, Clock, Star, Sparkles, Brain, Gem, Target,
  Send, Bot, Headphones, UserPlus, Mail, Edit3, Briefcase, Home, Bed
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

// --- DUMMY DATA ---
const moodData = [
    { day: "MON", mood: 4, intensity: 6 },
    { day: "TUE", mood: 5, intensity: 7 },
    { day: "WED", mood: 3, intensity: 5 },
    { day: "THU", mood: 6, intensity: 8 },
    { day: "FRI", mood: 7, intensity: 9 },
    { day: "SAT", mood: 5, intensity: 6 },
    { day: "SUN", mood: 8, intensity: 9 }
];
const leaderboardData = [
    { rank: 1, name: "You", streak: 12 },
    { rank: 2, name: "Sarah J.", streak: 11 },
    { rank: 3, name: "Alex C.", streak: 9 },
    { rank: 4, name: "Emily R.", streak: 8 },
];
const upcomingEvents = [
    { title: "Therapy Session", time: "2:00 PM", color: "purple" },
    { title: "Mindfulness Group", time: "4:30 PM", color: "blue" },
    { title: "Mood Check-in", time: "8:00 PM", color: "green" },
];
const dailyTips = [
    { text: "Take a 5-min walk between classes 🌿", icon: <Leaf className="w-5 h-5 text-green-600" /> },
    { text: "Drink a glass of water to stay hydrated 💧", icon: <Droplets className="w-5 h-5 text-blue-600" /> },
    { text: "Practice a simple 2-minute breathing exercise.", icon: <Sun className="w-5 h-5 text-yellow-600" /> },
    { text: "Try stretching to relieve muscle tension.", icon: <Coffee className="w-5 h-5 text-orange-600" /> }
];
const emergencyContacts = [
    { id: 1, name: "Dr. Emily Carter", role: "Counselor", phone: "555-0123", available: true },
    { id: 2, name: "Mom", role: "Parent", phone: "555-0456", available: true },
    { id: 3, name: "Alex Thompson", role: "Best Friend", phone: "555-0789", available: false },
    { id: 4, name: "Campus Security", role: "Security", phone: "555-0999", available: true }
];
const defaultHabits = [
    { id: 1, name: "Drink Water", icon: "💧", target: 8, completed: 5, streak: 3 },
    { id: 2, name: "Meditate", icon: "🧘", target: 1, completed: 1, streak: 7 },
    { id: 3, name: "Sleep on Time", icon: "😴", target: 1, completed: 0, streak: 2 },
    { id: 4, name: "Study Session", icon: "📚", target: 2, completed: 1, streak: 5 },
    { id: 5, name: "30-min Exercise", icon: "🏃", target: 1, completed: 0, streak: 1 },
];
const availableBadges = [
    { id: 1, name: "Consistent Check-in", icon: "⭐", earned: true, description: "5 days in a row" },
    { id: 2, name: "Calm Mind", icon: "🌱", earned: true, description: "10 meditation sessions" },
    { id: 3, name: "Hydrated", icon: "💧", earned: false, description: "7 days of water goals" },
    { id: 4, name: "Early Bird", icon: "🌅", earned: false, description: "Wake up before 7 AM" },
    { id: 5, name: "Mood Master", icon: "😊", earned: true, description: "Track mood for 30 days" },
    { id: 6, name: "Stress Buster", icon: "🛡", earned: false, description: "Complete stress activities" }
];
const moodInfluencers = [
    { name: "Academics", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Social", icon: <Users className="w-5 h-5" /> },
    { name: "Sleep", icon: <Bed className="w-5 h-5" /> },
    { name: "Health", icon: <Heart className="w-5 h-5" /> },
    { name: "Work", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Family", icon: <Home className="w-5 h-5" /> },
];

// --- TYPE DEFINITIONS ---
interface Reminder {
  id: number;
  time: string;
  activity: string;
  completed: boolean;
}
interface RemindersProps {
  reminders: Reminder[];
  newReminder: { time: string; activity: string };
  setNewReminder: React.Dispatch<React.SetStateAction<{ time: string; activity: string }>>;
  addReminder: () => void;
  toggleReminder: (id: number) => void;
  deleteReminder: (id: number) => void;
}

// Reminders Component
const Reminders: React.FC<RemindersProps> = ({ reminders, newReminder, setNewReminder, addReminder, toggleReminder, deleteReminder }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-blue-500" />
            Reminders
        </h2>
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 mb-6">
            <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Activity (e.g., Take a walk)"
                value={newReminder.activity}
                onChange={(e) => setNewReminder({ ...newReminder, activity: e.target.value })}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={addReminder} className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md">
                Add
            </button>
        </div>
        <div className="space-y-3 max-h-80 overflow-y-auto">
            {reminders.length === 0 ? (
                <p className="text-gray-400 text-center py-6">No reminders yet. Add one above!</p>
            ) : (
                reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={reminder.completed}
                                onChange={() => toggleReminder(reminder.id)}
                                className="w-5 h-5 text-blue-500 accent-blue-500 rounded focus:ring-2 focus:ring-blue-300"
                            />
                            <div className={reminder.completed ? "line-through text-gray-400" : "text-gray-700"}>
                                <div className="font-medium">{reminder.activity}</div>
                                <div className="text-sm text-gray-500">{reminder.time}</div>
                            </div>
                        </div>
                        <button onClick={() => deleteReminder(reminder.id)} className="p-2 rounded-full hover:bg-red-100 transition-colors">
                            <X className="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                ))
            )}
        </div>
    </div>
);


const StudentDashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [selectedMood, setSelectedMood] = useState("Okay");
    const [sosModalOpen, setSosModalOpen] = useState(false);
    const [dailyTip, setDailyTip] = useState(dailyTips[0]);
    const [habits, setHabits] = useState(defaultHabits);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [newReminder, setNewReminder] = useState({ time: "", activity: "" });
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await authService.getProfile();
                setUser(res.data.user);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    const moods = [
        { emoji: "😞", label: "Awful" },
        { emoji: "😔", label: "Bad" },
        { emoji: "🙂", label: "Okay" },
        { emoji: "😀", label: "Good" },
        { emoji: "😁", label: "Great" }
    ];

    useEffect(() => {
        const today = new Date().toDateString();
        
        const storedTipDate = localStorage.getItem('lastTipDate');
        if (storedTipDate !== today) {
            const randomIndex = Math.floor(Math.random() * dailyTips.length);
            setDailyTip(dailyTips[randomIndex]);
            localStorage.setItem('lastTipDate', today);
        }
    }, []);

    const getMoodEmoji = (moodLabel: string) => {
        const mood = moods.find(m => m.label === moodLabel);
        return mood ? mood.emoji : '🙂';
    };

    const handleTagSelection = (tagName: string) => {
        setSelectedTags(prevTags => 
            prevTags.includes(tagName) 
                ? prevTags.filter(tag => tag !== tagName) 
                : [...prevTags, tagName]
        );
    };

    const saveCheckin = () => {
        alert(`Check-in saved:\nMood: ${selectedMood}\nInfluencers: ${selectedTags.join(', ') || 'None selected'}`);
        // In a real app, you would save this data to a backend.
        setSelectedTags([]); // Reset tags after saving
    };

    const toggleHabit = (habitId: number) => {
        setHabits(habits.map(habit => {
            if (habit.id === habitId) {
                const newCompleted = habit.completed === habit.target ? 0 : habit.completed + 1;
                return {
                    ...habit,
                    completed: newCompleted,
                    streak: newCompleted === habit.target ? habit.streak + 1 : habit.streak
                };
            }
            return habit;
        }));
    };

    const addReminder = () => {
        if (newReminder.time && newReminder.activity) {
            const reminder: Reminder = {
                id: Date.now(),
                time: newReminder.time,
                activity: newReminder.activity,
                completed: false
            };
            setReminders([...reminders, reminder]);
            setNewReminder({ time: "", activity: "" });
        }
    };

    const toggleReminder = (id: number) => {
        setReminders(reminders.map(reminder =>
            reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
        ));
    };

    const deleteReminder = (id: number) => {
        setReminders(reminders.filter(reminder => reminder.id !== id));
    };

    const contactEmergency = (contact: any) => {
        alert(`Contacting ${contact.name} at ${contact.phone}...`);
    };

    // --- SUB-COMPONENTS for Dashboard ---
    const MoodInfluencers = () => (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">What's influencing your mood?</h2>
            <div className="flex flex-wrap gap-3">
                {moodInfluencers.map((tag) => (
                    <button 
                        key={tag.name} 
                        onClick={() => handleTagSelection(tag.name)}
                        className={`flex items-center space-x-2 py-2 px-4 rounded-full text-sm font-medium transition-colors ${selectedTags.includes(tag.name)
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        {tag.icon}
                        <span>{tag.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const BookAppointment = () => (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                    <UserPlus className="w-8 h-8 text-green-600" />
                </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Book an Appointment</h2>
            <p className="text-gray-500 mb-6">Schedule a session with a professional counselor.</p>
            <button 
                onClick={() => navigate("/student/book-appointment")}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md"
            >
                Book Now
            </button>
        </div>
    );

    const SmartCalendar = () => (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-blue-500" />
                Upcoming Sessions
            </h2>
            <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${event.color}-500`}></div>
                        <span className="font-medium text-gray-800">{event.title}</span>
                        <span className="text-sm text-gray-500">{event.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const Leaderboard = () => (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                Community Streaks
            </h2>
            <div className="space-y-3">
                {leaderboardData.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between py-2 px-4 rounded-lg bg-white shadow-sm">
                        <div className="flex items-center space-x-3">
                            <span className="font-bold text-gray-800 w-6">{user.rank}.</span>
                            <span className="text-gray-700">{user.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{user.streak} days</span>
                            <span className="text-xl">🔥</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-4 w-full bg-gray-100 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                View Full Leaderboard
            </button>
        </div>
    );
    
    const Badges = () => (
        <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-800 mb-3">Earned Badges</h4>
            <div className="grid grid-cols-3 gap-3">
                {availableBadges.filter(b => b.earned).map((badge) => (
                    <div key={badge.id} className="p-3 rounded-lg text-center bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 shadow-md">
                        <div className="text-3xl mb-1">{badge.icon}</div>
                        <div className="text-xs font-medium text-gray-800 mb-1">{badge.name}</div>
                        <div className="text-xs text-gray-600">{badge.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    const ProfileCard = () => (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-6xl bg-gray-100 border-4 border-purple-200 shadow-md">
                {getMoodEmoji(selectedMood)}
            </div>
            <h3 className="text-xl font-bold text-gray-800">Your Avatar</h3>
            <p className="text-sm text-gray-500">Joined: Jan 2025</p>
            <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-gray-700">12-Day Streak</span>
            </div>
            <Badges />
        </div>
    );

    const HabitTracker = () => (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-green-500" />
                Daily Habits
            </h2>
            <div className="space-y-4">
                {habits.map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{habit.icon}</span>
                            <div>
                                <h3 className="font-medium text-gray-800">{habit.name}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(habit.completed / habit.target) * 100}%` }}></div>
                                    </div>
                                    <span className="text-sm text-gray-500">{habit.completed}/{habit.target}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{habit.streak}🔥</span>
                            <button onClick={() => toggleHabit(habit.id)} className={`p-2 rounded-full transition-colors ${habit.completed === habit.target ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                <Check className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const SOSModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative border-4 border-red-200 shadow-2xl animate-modal-slide-in">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto shadow-2xl relative">
                                <AlertTriangle className="w-10 h-10 text-white" />
                                <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-red-600 mb-2">🚨 EMERGENCY ACTIVATED</h3>
                        <p className="text-gray-700 font-medium text-lg">Help is on the way. Choose your immediate action:</p>
                    </div>
                    <div className="space-y-4 mb-6">
                        <button onClick={() => window.open('tel:15551234567')} className="w-full bg-red-500 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl hover:scale-105">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-white/20 rounded-xl"><Phone className="w-6 h-6" /></div>
                                <div>
                                    <div className="font-bold text-lg">Call Crisis Helpline</div>
                                    <div className="text-sm opacity-80">24/7 Support</div>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <button onClick={() => alert("Connecting you to a counselor...")} className="w-full bg-blue-500 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl hover:scale-105">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-white/20 rounded-xl"><MessageCircle className="w-6 h-6" /></div>
                                <div>
                                    <div className="font-bold text-lg">Live Crisis Chat</div>
                                    <div className="text-sm opacity-80">Chat with a counselor now</div>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6" />
                      	</button>
  	                  <div className="p-4 bg-gray-100 rounded-xl space-y-2">
  	                      <h4 className="font-semibold text-gray-700">Message a Contact</h4>
  	                      {emergencyContacts.map((contact) => (
  	                          <button key={contact.id} onClick={() => contactEmergency(contact)} disabled={!contact.available} className={`w-full text-left py-2 px-4 rounded-lg bg-white hover:bg-gray-200 transition-colors flex items-center justify-between ${!contact.available ? 'opacity-50 cursor-not-allowed' : ''}`}>
  	                              <span>{contact.name}</span>
  	                              <ChevronRight className="w-4 h-4 text-gray-500" />
  	                          </button>
  	            	      ))}
  	            	  </div>
  	        	    </div>
  	        	    <div className="text-center">
  	      	        <button onClick={onClose} className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-colors">
  	    	            I'm Safe - Close
  	    	        </button>
  	      	    </div>
  	    	  </div>
  	    </div>
  	);
  };

  	return (
  	    <div className="bg-gray-100 min-h-screen p-8 font-sans">
  	        {/* --- FLOATING BUTTONS --- */}
  	        <button
  	            onClick={() => setSosModalOpen(true)}
  	            className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center font-bold transition-all hover:bg-red-600 hover:scale-110 animate-pulse"
  	        >
  	            SOS
  	        </button>
  	        <button
  	            onClick={() => navigate("/video-call")}
  	            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
  	        >
  	            <Video className="w-8 h-8" />
  	        </button>
  	        
  	        {sosModalOpen && <SOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />}
  	        
  	        <div className="max-w-6xl mx-auto space-y-8">
  	            <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md">
  	            	    <div>
  	            	    	    <p className="text-sm text-gray-500">Welcome</p>
  	            	    	    <h1 className="text-2xl font-bold text-gray-800">{user ? `${user.firstName}! 🌟` : 'Loading...'}</h1>
  	            	    </div>
  	        		  <div className="hidden sm:flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
  	            		  <div className="p-2 bg-purple-100 rounded-full">{dailyTip.icon}</div>
  	            		  <p className="text-sm text-purple-800 font-medium">{dailyTip.text}</p>
  	            		  </div>
  	            	    </div>

  	        		    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  	  	        		  <div className="space-y-8">
  	  	        		      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-200">
  	  	        		      	    <h1 className="text-4xl font-bold text-gray-800 text-center md:text-left">How are you feeling today?</h1>
  	  	        		      	    <p className="mt-2 text-lg text-gray-500 text-center md:text-left">
  	  	        		      	    	    Your daily check-in helps you understand your emotions.
  	  	        		      	    </p>
  	  	        		      	    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
  	  	        		      	    	    <h2 className="text-xl font-semibold text-gray-700 mb-4">Select your mood</h2>
  	  	        		      	    	    <div className="grid grid-cols-5 gap-4">
  	  	        		      	    	    	    {moods.map((mood) => (
  	  	        		      	    	    	    	    <button
  	  	        		      	    	    	    	    	    key={mood.label}
  	  	        		      	    	    	    	    	    onClick={() => setSelectedMood(mood.label)}
  	  	        		      	    	    	    	    	    className={`p-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${selectedMood === mood.label ? "bg-blue-100 border-2 border-blue-500 shadow-md" : "bg-white border-2 border-transparent hover:border-gray-300"}`}
  	  	        		      	    	    	    	    >
  	  	        		      	    	    	    	    	    <div className="text-4xl">{mood.emoji}</div>
  	  	        		      	    	    	    	    	    <div className="text-sm mt-2 font-medium text-gray-600">{mood.label}</div>
  	  	        		      	    	    	    	    </button>
  	  	        		      	    	    	    ))}
  	  	        		      	    	    </div>
  	  	        		      	    	    </div>
                                
                                <MoodInfluencers />

  	  	        		      	    	    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
  	  	        		      	    	    <h2 className="text-xl font-semibold text-gray-700 mb-4">Mood trend this week</h2>
  	  	        		      	    	    <div className="flex items-center mb-4">
  	  	        		      	    	    	    <span className="text-4xl mr-4">{getMoodEmoji(selectedMood)}</span>
  	  	        		      	    	    	    <div>
  	  	        		      	    	    	    	    <div className="text-2xl font-bold text-gray-800">{selectedMood}</div>
  	  	        		      	    	    	    	    <div className="flex items-center text-sm text-gray-500">
  	  	        		      	    	    	    	    	    Average
  	  	        		      	    	    	    	    	    <span className="text-green-500 ml-2 font-medium flex items-center">
  	  	        		      	    	    	    	    	    	    <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-1"></span>
  	  	        		      	    	    	    	    	    	    Last 7 Days
  	  	        		      	    	    	    	    	    </span>
  	  	        		      	    	    	    	    </div>
  	  	        		      	    	    	    </div>
  	  	        		      	    	    </div>
  	  	        		      	    	    </div>
  	  	        		      	    	    <ResponsiveContainer width="100%" height={150}>
  	  	        		      	    	    	    <AreaChart data={moodData}>
  	  	        		      	    	    	    	    <defs>
  	  	        		      	    	    	    	    	    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
  	  	        		      	    	    	    	    	    	    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
  	  	        		      	    	    	    	    	    	    	    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
  	  	        		      	    	    	    	    	    </linearGradient>
  	  	        		      	    	    	    </defs>
  	  	        		      	    	    	    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
  	  	        		      	    	    	    <XAxis dataKey="day" axisLine={false} tickLine={false} />
  	  	        		      	    	    	    <YAxis hide={true} domain={[0, 10]} />
  	  	        		      	    	    	    <Tooltip />
  	  	        		      	    	    	    <Area type="monotone" dataKey="mood" stroke="#8884d8" fillOpacity={1} fill="url(#colorMood)" />
  	  	        		      	    	    </AreaChart>
  	  	        		      	    </ResponsiveContainer>
  	  	        		      	    <div className="text-center">
  	  	        		      	    	    <button
  	  	        		      	    	    	    onClick={saveCheckin}
  	  	        		      	    	    	    className="bg-blue-500 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-600 transition-colors transform hover:scale-105"
  	  	        		      	    	    >
  	  	        		      	    	    	    Save Check-in
  	  	        		      	    	    </button>
  	  	        		      	    </div>
  	  	        		      </div>
  	  	        		      <BookAppointment />
  	  	        		      <Reminders
  	  	        		      	    reminders={reminders}
  	  	        		      	    newReminder={newReminder}
  	  	        		      	    setNewReminder={setNewReminder}
  	  	        		      	    addReminder={addReminder}
  	  	        		      	    toggleReminder={toggleReminder}
  	  	        		      	    deleteReminder={deleteReminder}
  	  	        		      />
  	  	        		  </div>

  	  	        		  <div className="space-y-8">
  	  	        		      <ProfileCard />
  	  	        		      <SmartCalendar />
  	  	        		      <Leaderboard />
  	  	        		      <HabitTracker />
  	  	        		  </div>
  	  	    	    </div>
  	    	</div>
  	</div>
);
};

export default StudentDashboard;