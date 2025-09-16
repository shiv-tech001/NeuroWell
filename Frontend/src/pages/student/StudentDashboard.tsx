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

// Dummy Data
const moodData = [
  { day: "MON", mood: 4, intensity: 6 },
  { day: "TUE", mood: 5, intensity: 7 },
  { day: "WED", mood: 3, intensity: 5 },
  { day: "THU", mood: 6, intensity: 8 },
  { day: "FRI", mood: 7, intensity: 9 },
  { day: "SAT", mood: 5, intensity: 6 },
  { day: "SUN", mood: 8, intensity: 9 }
];

const achievementsData = [
  { title: "7-Day Streak", icon: "🔥", progress: 70 },
  { title: "Mindfulness Master", icon: "🧘", progress: 50 },
  { title: "Stress Fighter", icon: "🛡️", progress: 90 }
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
  { id: 6, name: "Stress Buster", icon: "🛡️", earned: false, description: "Complete stress activities" }
];

const mockMoodEntries = [
  {
    id: 1,
    date: "2025-09-14",
    mood: "Great",
    emoji: "😁",
    intensity: 8,
    notes: "Had a productive day and completed all my assignments!"
  },
  {
    id: 2,
    date: "2025-09-13",
    mood: "Good",
    emoji: "😀",
    intensity: 6,
    notes: "Felt energetic after morning exercise."
  },
  {
    id: 3,
    date: "2025-09-12",
    mood: "Okay",
    emoji: "🙂",
    intensity: 5,
    notes: "Average day, nothing special."
  },
  {
    id: 4,
    date: "2025-09-11",
    mood: "Bad",
    emoji: "😔",
    intensity: 3,
    notes: "Struggled with anxiety before the exam."
  }
];

const chatbotResponses = {
  "i feel anxious": "Take a deep breath, you are not alone. Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. 🌸",
  "i'm stressed": "I understand. Stress is tough. Consider taking a 5-minute break, step outside if possible, or try a quick meditation. You've got this! 💪",
  "i can't sleep": "Sleep troubles can be frustrating. Try avoiding screens 1 hour before bed, and consider some light stretching or deep breathing exercises. 🌙",
  "i'm sad": "It's okay to feel sad sometimes. Your feelings are valid. Consider reaching out to a friend, writing in a journal, or doing something you enjoy. 💙",
  "help": "I'm here for you! You can talk to me about how you're feeling, get daily wellness tips, or use the SOS button if you need immediate help. What's on your mind? 🤗",
  "default": "Thank you for sharing. I'm here to listen and support you. Can you tell me more about how you're feeling right now? 🌟"
};

const Reminders = ({
  reminders,
  newReminder,
  setNewReminder,
  addReminder,
  toggleReminder,
  deleteReminder
}) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
      <Clock className="w-6 h-6 mr-2 text-blue-500" />
      Reminders
    </h2>
    <div className="mb-4 space-y-2">
      <input
        type="time"
        value={newReminder.time}
        onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
      />
      <input
        type="text"
        placeholder="Activity (e.g., Take a walk)"
        value={newReminder.activity}
        onChange={(e) => setNewReminder({...newReminder, activity: e.target.value})}
        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
      />
      <button
        onClick={addReminder}
        className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Add Reminder
      </button>
    </div>
    <div className="space-y-2">
      {reminders.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">No reminders set</p>
      ) : (
        reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={reminder.completed}
                onChange={() => toggleReminder(reminder.id)}
                className="w-4 h-4 text-blue-600"
              />
              <div className={reminder.completed ? 'line-through text-gray-500' : ''}>
                <div className="font-medium text-sm">{reminder.activity}</div>
                <div className="text-xs text-gray-500">{reminder.time}</div>
              </div>
            </div>
            <button
              onClick={() => deleteReminder(reminder.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

const StudentDashboard = () => {
  const [selectedMood, setSelectedMood] = useState("Okay");
  const [intensity, setIntensity] = useState(50);
  const [notes, setNotes] = useState("");
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [dailyTip, setDailyTip] = useState(dailyTips[0]);
  const [habits, setHabits] = useState(defaultHabits);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ time: "", activity: "" });
  const [moodEntries, setMoodEntries] = useState(mockMoodEntries);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I am your wellness assistant. How can I help you today?", sender: "bot", timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState("");

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
  }, []);

  const getMoodEmoji = (moodLabel) => {
    const mood = moods.find(m => m.label === moodLabel);
    return mood ? mood.emoji : '🙂';
  };

  const saveCheckin = () => {
    const newEntry = {
      id: moodEntries.length + 1,
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      emoji: getMoodEmoji(selectedMood),
      intensity: parseInt(intensity),
      notes: notes
    };
    setMoodEntries([newEntry, ...moodEntries]);
    alert("Mood check-in saved!");
  };

  const toggleHabit = (habitId) => {
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
      const reminder = {
        id: Date.now(),
        time: newReminder.time,
        activity: newReminder.activity,
        completed: false
      };
      setReminders([...reminders, reminder]);
      setNewReminder({ time: "", activity: "" });
    }
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const contactEmergency = (contact) => {
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
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${
                      msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                    }`}
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
          {moodEmoji}
        </div>
        <h3 className="text-xl font-bold text-gray-800">Sarah Johnson</h3>
        <p className="text-sm text-gray-500">Joined: Jan 2025</p>
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
        {moodEntries.map((entry) => (
          <div key={entry.id} className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex-shrink-0">
              <span className="text-2xl">{entry.emoji}</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{entry.mood}</span>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </div>
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs text-gray-600">Intensity:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${entry.intensity * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{entry.intensity}/10</span>
                </div>
              </div>
              {entry.notes && (
                <p className="text-sm text-gray-600 italic">"{entry.notes}"</p>
              )}
            </div>
          </div>
        ))}
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

  const SOSModal = ({ isOpen, onClose }) => {
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
                  className={`w-full text-left py-2 px-4 rounded-lg bg-white hover:bg-gray-200 transition-colors flex items-center justify-between ${!contact.available && 'opacity-50 cursor-not-allowed'}`}
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
      <button
        onClick={() => setSosModalOpen(true)}
        className="fixed top-6 right-6 z-50 w-16 h-16 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold transition-all hover:bg-red-600 animate-pulse"
      >
        SOS
      </button>
      {sosModalOpen && <SOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />}
      <Chatbot />

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-800">NeuroWell</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, Sarah! 🌟</span>
            <img src="https://picsum.photos/200" alt="Profile" className="w-10 h-10 rounded-full" />
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
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Not intense</span>
                  <span>Very intense</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your thoughts here. What's on your mind?"
                  className="w-full p-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm text-gray-700 placeholder-gray-400"
                  rows="4"
                />
              </div>

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
              </div>

              <div className="text-center">
                <button
                  onClick={saveCheckin}
                  className="bg-blue-500 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-600 transition-colors transform hover:scale-105"
                >
                  Save Check-in
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
