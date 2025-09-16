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
  Clipboard, Shield, Droplets, Leaf, Sun, Coffee,
  Check, Clock, Star, Sparkles, Brain, Gem, Target,
  Send, Bot, Headphones, UserPlus, Mail, Edit3
} from "lucide-react";
import { useAuth } from '../../contexts/AuthContext';
import { moodService, MoodEntry, MoodTrendData } from '../../services/moodService';

// Add custom styles for enhanced animations
const chartAnimationStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }
  
  @keyframes pulse-glow {
    0% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.3); }
    50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
    100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.3); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-shimmer { 
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 2s infinite;
  }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .animate-fade-in { animation: fade-in 0.6s ease-out; }
  .animate-slide-in { animation: slideIn 0.3s ease-out; }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = chartAnimationStyles;
  document.head.appendChild(styleSheet);
}


// Dummy Data for other components (keeping non-mood related data)
const achievementsData = [
  { title: "7-Day Streak", icon: "🔥", progress: 70 },
  { title: "Mindfulness Master", icon: "🧘", progress: 50 },
  { title: "Stress Fighter", icon: "🛡", progress: 90 }
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
  { id: 3, name: "Sleep on Time", icon: "😴", target: 1, completed: 0, streak: 2 }
];


const availableBadges = [
  { id: 1, name: "Consistent Check-in", icon: "⭐", earned: true, description: "5 days in a row" },
  { id: 2, name: "Calm Mind", icon: "🌱", earned: true, description: "10 meditation sessions" },
  { id: 3, name: "Hydrated", icon: "💧", earned: false, description: "7 days of water goals" },
  { id: 4, name: "Early Bird", icon: "🌅", earned: false, description: "Wake up before 7 AM" },
  { id: 5, name: "Mood Master", icon: "😊", earned: true, description: "Track mood for 30 days" },
  { id: 6, name: "Stress Buster", icon: "🛡", earned: false, description: "Complete stress activities" }
];


const mockMoodEntries: MoodEntry[] = [];


const chatbotResponses = {
  "i feel anxious": "Take a deep breath, you are not alone. Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. 🌸",
  "i'm stressed": "I understand. Stress is tough. Consider taking a 5-minute break, step outside if possible, or try a quick meditation. You've got this! 💪",
  "i can't sleep": "Sleep troubles can be frustrating. Try avoiding screens 1 hour before bed, and consider some light stretching or deep breathing exercises. 🌙",
  "i'm sad": "It's okay to feel sad sometimes. Your feelings are valid. Consider reaching out to a friend, writing in a journal, or doing something you enjoy. 💙",
  "help": "I'm here for you! You can talk to me about how you're feeling, get daily wellness tips, or use the SOS button if you need immediate help. What's on your mind? 🤗",
  "default": "Thank you for sharing. I'm here to listen and support you. Can you tell me more about how you're feeling right now? 🌟"
};


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


// UPDATED Reminders Component with Enhanced Design
const Reminders: React.FC<RemindersProps> = ({
  reminders,
  newReminder,
  setNewReminder,
  addReminder,
  toggleReminder,
  deleteReminder
}) => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-blue-500" />
        Reminders
        {reminders.filter(r => !r.completed).length > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {reminders.filter(r => !r.completed).length} active
          </span>
        )}
      </h2>
      {/* Add New Reminder */}
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
        <button
          onClick={addReminder}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md"
        >
          Add
        </button>
      </div>
      {/* Reminders List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {reminders.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No reminders yet. Add one above!</p>
        ) : (
          reminders.map((reminder) => {
            const isUpcoming = reminder.time > currentTime && !reminder.completed;
            const isPast = reminder.time <= currentTime;
            
            return (
              <div
                key={reminder.id}
                className={`flex items-center justify-between p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${
                  reminder.completed 
                    ? 'bg-gray-50 border-gray-200'
                    : isUpcoming 
                    ? 'bg-blue-50 border-blue-200'
                    : isPast
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={reminder.completed}
                    onChange={() => toggleReminder(reminder.id)}
                    className="w-5 h-5 text-blue-500 accent-blue-500 rounded focus:ring-2 focus:ring-blue-300"
                  />
                  <div className={reminder.completed ? "line-through text-gray-400" : "text-gray-700"}>
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">{reminder.activity}</div>
                      {isUpcoming && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Upcoming
                        </span>
                      )}
                      {isPast && !reminder.completed && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Due
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {reminder.time}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="p-2 rounded-full hover:bg-red-100 transition-colors"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


const StudentDashboard = () => {
  const { user, loading } = useAuth(); // Get user data from context
  const [selectedMood, setSelectedMood] = useState("Okay");
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState("");
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [dailyTip, setDailyTip] = useState(dailyTips[0]);
  const [habits, setHabits] = useState(defaultHabits);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState({ time: "", activity: "" });
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [moodTrendData, setMoodTrendData] = useState<MoodTrendData[]>([]);
  const [loadingMood, setLoadingMood] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I am your wellness assistant. How can I help you today?", sender: "bot", timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);

  // Show loading state while user data is being fetched
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }


  const moods = [
    { emoji: "😞", label: "Awful" },
    { emoji: "😔", label: "Bad" },
    { emoji: "🙂", label: "Okay" },
    { emoji: "😀", label: "Good" },
    { emoji: "😁", label: "Great" }
  ];


  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('lastTipDate');
    
    if (storedDate !== today) {
      const randomIndex = Math.floor(Math.random() * dailyTips.length);
      setDailyTip(dailyTips[randomIndex]);
      localStorage.setItem('lastTipDate', today);
    }

    // Load mood data when component mounts
    loadMoodData();

    // Check for reminder notifications every minute
    const reminderInterval = setInterval(checkReminders, 60000);
    
    return () => clearInterval(reminderInterval);
  }, []);

  // Check reminders every minute
  useEffect(() => {
    const reminderInterval = setInterval(checkReminders, 60000);
    return () => clearInterval(reminderInterval);
  }, [reminders]);

  // Function to check if any reminders should trigger
  const checkReminders = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    const currentMinute = now.getMinutes();
    const currentHour = now.getHours();
    
    console.log(`⏰ Current time: ${currentTime} - Checking reminders...`);
    
    reminders.forEach(reminder => {
      // Only check active (not completed) reminders
      if (!reminder.completed && reminder.time === currentTime) {
        // Check if we haven't already shown notification for this exact minute
        const reminderKey = `${reminder.id}-${currentHour}-${currentMinute}`;
        const lastShown = localStorage.getItem(`lastNotification-${reminderKey}`);
        const today = new Date().toDateString();
        
        // Only show if we haven't shown this reminder today at this exact time
        if (lastShown !== today) {
          console.log(`🔔 REMINDER TRIGGERED! ${reminder.activity} at ${reminder.time}`);
          showReminderNotification(reminder);
          
          // Mark this reminder as shown for today at this time
          localStorage.setItem(`lastNotification-${reminderKey}`, today);
        } else {
          console.log(`⏭️ Reminder already shown today: ${reminder.activity}`);
        }
      }
    });
    
    // Special log for your 22:26 reminder
    const paaniReminder = reminders.find(r => r.time === '22:26' && r.activity.toLowerCase().includes('paani'));
    if (paaniReminder && currentTime === '22:26') {
      console.log('💧 PAANI REMINDER TIME REACHED! Notification should show now.');
    }
  };

  // Show reminder notification
  const showReminderNotification = (reminder: Reminder) => {
    const message = `⏰ Reminder: ${reminder.activity}`;
    
    console.log(`Showing notification: ${message}`);
    
    // Add to notifications state (only if not already present)
    setNotifications(prev => {
      // Check if this exact message is already showing
      if (prev.includes(message)) {
        return prev;
      }
      return [...prev, message];
    });
    
    // Show browser notification if permission granted
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("🔔 Wellness Reminder", {
        body: `${reminder.time} - ${reminder.activity}`,
        icon: "/favicon.ico",
        tag: `reminder-${reminder.id}-${reminder.time}`,
        requireInteraction: true // Keep notification visible until user interacts
      });
    }
    
    // Auto-remove notification after 8 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif !== message));
    }, 8000);
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  // Load mood entries and trend data from API
  const loadMoodData = async () => {
    try {
      setLoadingMood(true);
      console.log('Loading mood data from database...');
      
      // Load recent mood entries for journal
      const entries = await moodService.getMoodEntries(10);
      console.log('Loaded mood entries:', entries);
      setMoodEntries(entries);
      
      // Load mood trend for the week (day-wise data)
      const trendData = await moodService.getMoodTrend(7);
      console.log('Loaded mood trend data:', trendData);
      setMoodTrendData(trendData);
      
      // Log chart data for debugging
      if (trendData.length > 0) {
        console.log('Chart will display:', trendData.map(d => ({
          day: d.day,
          mood: d.mood,
          intensity: d.intensity,
          hasEntry: d.hasEntry,
          date: d.date
        })));
      } else {
        console.log('No mood data found - chart will show empty state');
      }
      
    } catch (error) {
      console.error('Error loading mood data:', error);
      // Keep empty arrays instead of mock data as per user requirement
      setMoodEntries([]);
      setMoodTrendData([]);
    } finally {
      setLoadingMood(false);
    }
  };


  const getMoodEmoji = (moodLabel: string) => {
    const mood = moods.find(m => m.label === moodLabel);
    return mood ? mood.emoji : '🙂';
  };


  const saveCheckin = async () => {
    try {
      setLoadingMood(true);
      
      // Save mood entry to database
      const newEntry = await moodService.createMoodEntry({
        mood: selectedMood,
        intensity: intensity, // Already 1-10 scale
        notes: notes.trim() || undefined
      });
      
      // Add to local state
      setMoodEntries([newEntry, ...moodEntries]);
      
      // Reload trend data to get updated chart
      const trendData = await moodService.getMoodTrend(7);
      setMoodTrendData(trendData);
      
      // Reset form
      setNotes("");
      
      alert("Mood check-in saved successfully!");
      
    } catch (error) {
      console.error('Error saving mood check-in:', error);
      alert(`Failed to save mood check-in: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoadingMood(false);
    }
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


  const addReminder = async () => {
    if (newReminder.time && newReminder.activity) {
      const reminder: Reminder = {
        id: Date.now(),
        time: newReminder.time,
        activity: newReminder.activity,
        completed: false
      };
      setReminders([...reminders, reminder]);
      setNewReminder({ time: "", activity: "" });
      
      // Request notification permission when first reminder is added
      await requestNotificationPermission();
      
      // Show success message
      const successMessage = `✅ Reminder set for ${newReminder.time}: ${newReminder.activity}`;
      setNotifications(prev => [...prev, successMessage]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif !== successMessage));
      }, 3000);
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


  const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{
      id: 1,
      text: "Hello! I am your wellness assistant. How can I help you today?",
      sender: "bot",
    }]);
    const [input, setInput] = useState('');


    const handleSend = () => {
      if (input.trim() === '') return;


      const userMessage = { id: Date.now(), text: input, sender: "user" };
      setMessages(prevMessages => [...prevMessages, userMessage]);


      const lowerCaseInput = input.toLowerCase();
      const hardcodedResponse = Object.keys(chatbotResponses).find(key => lowerCaseInput.includes(key));
      const botResponseText = hardcodedResponse ? chatbotResponses[hardcodedResponse] : chatbotResponses.default;
      const botMessage = { id: Date.now() + 1, text: botResponseText, sender: "bot" };


      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 500);


      setInput('');
    };


    const toggleChatbot = () => {
      setIsOpen(!isOpen);
    };


    return (
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={toggleChatbot}
            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300 relative"
          >
            <MessageCircle className="w-8 h-8" />
          </button>
        ) : (
          <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col z-50 animate-fade-in-up">
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-6 h-6 mr-2" />
                <h3 className="font-semibold">Wellness Assistant</h3>
              </div>
              <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                autoComplete="off"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };


  
  const DailyTip = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
      <div className="p-3 bg-purple-100 rounded-full">
        {dailyTip.icon}
      </div>
      <p className="text-gray-700 font-medium">{dailyTip.text}</p>
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
        {leaderboardData.map((user, index) => (
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


  // --- UPDATED ProfileCard Component ---
  const ProfileCard = () => {
    const moodEmoji = getMoodEmoji(selectedMood);

    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center space-y-3">
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-6xl bg-gray-100 border-4 border-purple-200 shadow-md">
          {user?.avatar?.url ? (
            <img 
              src={user.avatar.url} 
              alt={user.fullName} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{moodEmoji}</span>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{user?.fullName || 'Student'}</h3>
        <p className="text-sm text-gray-500">Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}</p>
        <p className="text-sm text-gray-600">Role: {user?.role || 'Student'}</p>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-purple-500" />
          <span className="font-semibold text-gray-700">12-Day Streak</span>
        </div>
        <Badges />
      </div>
    );
  };


  const MoodJournal = () => (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        <Clipboard className="w-6 h-6 mr-2 text-blue-500" />
        Mood Journal Timeline
      </h2>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {moodEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {loadingMood ? "Loading mood entries..." : "No mood entries yet. Start tracking your mood!"}
          </div>
        ) : (
          moodEntries.map((entry, index) => (
            <div key={entry._id || `entry-${index}`} className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex-shrink-0">
                <span className="text-2xl">{moodService.getMoodEmoji(entry.mood)}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{String(entry.mood)}</span>
                  <span className="text-sm text-gray-500">
                    {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'Today'}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs text-gray-600">Intensity:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.min(Number(entry.intensity) * 10, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{entry.intensity}/10</span>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-600 italic">"{String(entry.notes)}"</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
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
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(habit.completed / habit.target) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {habit.completed}/{habit.target}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{habit.streak}🔥</span>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`p-2 rounded-full transition-colors ${
                  habit.completed === habit.target
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  const Badges = () => (
    <div className="mt-6">
      <h4 className="text-lg font-bold text-gray-800 mb-3">Earned Badges</h4>
      <div className="grid grid-cols-3 gap-3">
        {availableBadges.filter(b => b.earned).map((badge) => (
          <div
            key={badge.id}
            className="p-3 rounded-lg text-center bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 shadow-md"
          >
            <div className="text-3xl mb-1">{badge.icon}</div>
            <div className="text-xs font-medium text-gray-800 mb-1">{badge.name}</div>
            <div className="text-xs text-gray-600">{badge.description}</div>
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
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
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
            <button 
              onClick={() => window.open('tel:15551234567')}
              className="w-full bg-red-500 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-lg">Call Crisis Helpline</div>
                  <div className="text-sm opacity-80">24/7 Support</div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <button 
              onClick={() => alert("Connecting you to a counselor...")}
              className="w-full bg-blue-500 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <MessageCircle className="w-6 h-6" />
                </div>
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
                <button
                  key={contact.id}
                  onClick={() => contactEmergency(contact)}
                  disabled={!contact.available}
                  className={`w-full text-left py-2 px-4 rounded-lg bg-white hover:bg-gray-200 transition-colors flex items-center justify-between ${!contact.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>{contact.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              ))}
            </div>
          </div>


          <div className="text-center">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-colors"
            >
              I'm Safe - Close
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      {/* Notification Messages */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow-lg animate-slide-in max-w-sm"
            style={{
              animation: 'slideIn 0.3s ease-out, fadeOut 0.3s ease-in 4.7s'
            }}
          >
            <div className="flex items-center">
              <div className="text-blue-500 mr-3">
                <Bell className="w-5 h-5" />
              </div>
              <div className="text-sm text-gray-800 font-medium">
                {notification}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSosModalOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold transition-all hover:bg-red-600 animate-pulse"
      >

        SOS
      </button>
      {sosModalOpen && <SOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />}
      <Chatbot />


      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md">
          {/* Left: Welcome Text */}
          <div>
            <p className="text-sm text-gray-500">Good Morning,</p>
            <h1 className="text-2xl font-bold text-gray-800">{user?.firstName || 'Student'}! 🌟</h1>
          </div>

          {/* Right: Profile and Status */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user?.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  {user?.firstName?.[0] || 'S'}
                </div>
              )}
              {/* Small online status dot */}
              <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-gray-700 font-medium">{user?.firstName || 'Student'}</span>
              <span className="text-xs text-gray-400">{user?.role || 'Student'}</span>
            </div>
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
                      className={`p-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                        ${selectedMood === mood.label ? "bg-blue-100 border-2 border-blue-500 shadow-md" : "bg-white border-2 border-transparent hover:border-gray-300"}`}
                    >
                      <div className="text-4xl">{mood.emoji}</div>
                      <div className="text-sm mt-2 font-medium text-gray-600">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>


              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">How intense is this feeling?</h2>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Low (1)</span>
                  <span className="font-medium text-blue-600">{intensity}/10</span>
                  <span>High (10)</span>
                </div>
              </div>


              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your thoughts here. What's on your mind?"
                  className="w-full p-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm text-gray-700 placeholder-gray-400"
                  rows={4}
                />
              </div>


              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
                  </div>
                  Mood trend this week
                </h2>
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <span className="text-5xl animate-pulse">{getMoodEmoji(selectedMood)}</span>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {selectedMood}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      {loadingMood ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                          Loading trend...
                        </div>
                      ) : (
                        "Weekly Mood Trends"
                      )}
                      <span className="text-green-500 ml-3 font-medium flex items-center animate-pulse">
                        <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-2 animate-ping"></span>
                        {moodTrendData.length > 0 ? `${moodTrendData.filter(d => d.hasEntry).length} entries` : 'No data'}
                      </span>
                    </div>
                  </div>
                </div>
                {loadingMood ? (
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-4"></div>
                      <div className="text-gray-500 animate-pulse">Loading beautiful chart...</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl -z-10"></div>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart 
                        data={moodTrendData.length > 0 ? moodTrendData : [
                          { day: "MON", mood: 0, intensity: 0, hasEntry: false },
                          { day: "TUE", mood: 0, intensity: 0, hasEntry: false },
                          { day: "WED", mood: 0, intensity: 0, hasEntry: false },
                          { day: "THU", mood: 0, intensity: 0, hasEntry: false },
                          { day: "FRI", mood: 0, intensity: 0, hasEntry: false },
                          { day: "SAT", mood: 0, intensity: 0, hasEntry: false },
                          { day: "SUN", mood: 0, intensity: 0, hasEntry: false }
                        ]} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                      >
                        <defs>
                          <linearGradient id="colorMoodAdvanced" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.7} />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.3} />
                          </linearGradient>
                          <linearGradient id="colorIntensityAdvanced" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                            <stop offset="50%" stopColor="#f97316" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                          </filter>
                        </defs>
                        <CartesianGrid 
                          strokeDasharray="5 5" 
                          stroke="#e2e8f0" 
                          strokeOpacity={0.6}
                          vertical={false}
                        />
                        <XAxis 
                          dataKey="day" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ 
                            fontSize: 14, 
                            fill: '#475569', 
                            fontWeight: '600',
                            textAnchor: 'middle'
                          }}
                          height={60}
                          interval={0}
                          className="animate-fade-in"
                        />
                        <YAxis 
                          domain={[0, 10]} 
                          axisLine={false}
                          tickLine={false}
                          tick={{ 
                            fontSize: 12, 
                            fill: '#64748b',
                            fontWeight: '500'
                          }}
                          label={{ 
                            value: 'Level (1-10)', 
                            angle: -90, 
                            position: 'insideLeft', 
                            style: { 
                              textAnchor: 'middle', 
                              fill: '#64748b', 
                              fontSize: '13px',
                              fontWeight: '500'
                            } 
                          }}
                          tickCount={6}
                          width={60}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            fontSize: '14px',
                            fontWeight: '500',
                            backdropFilter: 'blur(10px)'
                          }}
                          cursor={{
                            stroke: '#8b5cf6',
                            strokeWidth: 2,
                            strokeDasharray: '5 5',
                            filter: 'url(#glow)'
                          }}
                          formatter={(value, name, props) => {
                            if (!props.payload.hasEntry) {
                              return [
                                <span style={{ color: '#94a3b8' }}>No data</span>, 
                                <span style={{ color: '#64748b' }}>No entry for this day</span>
                              ];
                            }
                            const color = name === 'mood' ? '#8b5cf6' : '#f59e0b';
                            return [
                              <span style={{ color, fontWeight: 'bold' }}>
                                {value}{name === 'intensity' ? '/10' : '/5'}
                              </span>,
                              <span style={{ color: '#64748b' }}>
                                {name === 'mood' ? `Mood: ${props.payload.moodLabel || 'Unknown'}` : 'Intensity Level'}
                              </span>
                            ];
                          }}
                          labelFormatter={(label) => (
                            <span style={{ color: '#1e293b', fontWeight: 'bold' }}>📅 {label}</span>
                          )}
                          animationDuration={300}
                        />
                        {moodTrendData.length > 0 && (
                          <>
                            <Area 
                              type="monotone"
                              dataKey="mood" 
                              stroke="#8b5cf6" 
                              strokeWidth={4}
                              fillOpacity={1} 
                              fill="url(#colorMoodAdvanced)" 
                              name="mood"
                              connectNulls={false}
                              filter="url(#glow)"
                              animationBegin={0}
                              animationDuration={2000}
                              animationEasing="ease-out"
                            />
                            <Area 
                              type="monotone"
                              dataKey="intensity" 
                              stroke="#f59e0b" 
                              strokeWidth={3}
                              fillOpacity={0.6} 
                              fill="url(#colorIntensityAdvanced)" 
                              name="intensity"
                              connectNulls={false}
                              filter="url(#shadow)"
                              animationBegin={500}
                              animationDuration={2000}
                              animationEasing="ease-out"
                            />
                          </>
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-center space-x-8">
                    <div className="flex items-center space-x-3 group">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                        Mood Level (1-5)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 group">
                      <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                        Intensity Level (1-10)
                      </span>
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-500 bg-white/50 rounded-lg py-2 px-4">
                    <span className="inline-flex items-center">
                      📊 Your mood tracking progress 
                      <span className="ml-1 font-semibold text-green-600">
                        {moodTrendData.filter(d => d.hasEntry).length} of 7 days
                      </span>
                    </span>
                  </div>
                </div>
              </div>


              <div className="text-center">
                <button
                  onClick={saveCheckin}
                  disabled={loadingMood}
                  className={`font-bold py-4 px-12 rounded-full shadow-lg transition-colors transform hover:scale-105 ${
                    loadingMood 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {loadingMood ? 'Saving...' : 'Save Check-in'}
                </button>
              </div>
            </div>
            
            <MoodJournal />
          </div>


          <div className="space-y-8">
            <ProfileCard />
            <DailyTip />
            <SmartCalendar />
            <Leaderboard />
            <HabitTracker />
            <Reminders
              reminders={reminders}
              newReminder={newReminder}
              setNewReminder={setNewReminder}
              addReminder={addReminder}
              toggleReminder={toggleReminder}
              deleteReminder={deleteReminder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default StudentDashboard;