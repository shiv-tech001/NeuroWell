import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    UserIcon, 
    SettingsIcon, 
    BellIcon, 
    ShieldIcon, 
    DocumentIcon,
    TrendingUpIcon,
    CalendarIcon,
    EyeIcon,
    EyeOffIcon,
    EditIcon,
    SaveIcon
} from '@components/icons';


const StudentProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('personal-info');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: 'Sophia Clark',
        email: 'sophia.clark@example.com',
        phoneNumber: '',
        dateOfBirth: '',
        gender: 'Female',
        major: 'Psychology',
        yearOfStudy: '3'
    });

    const student = {
        id: '123456789',
        name: 'Sophia Clark',
        email: 'sophia.clark@example.com',
        avatar: 'https://picsum.photos/seed/sophia/200/200',
        moodTrend: 'improving',
        moodChange: '+15%',
        joinDate: 'September 2023',
        totalSessions: 12,
        currentStreak: 7
    };

    const moodData = [
        { week: 'Week 1', value: 65 },
        { week: 'Week 2', value: 70 },
        { week: 'Week 3', value: 60 },
        { week: 'Week 4', value: 75 }
    ];

    const tabs = [
        { id: 'personal-info', label: 'Personal Info', icon: UserIcon },
        { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
        { id: 'privacy', label: 'Privacy', icon: ShieldIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon }
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Save logic here
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            

            <div className="container mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info & Wellness */}
                    <div className="lg:col-span-2">
                        {/* Profile Header */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <div className="flex items-start space-x-6">
                                <div className="relative">
                                    <img 
                                        src={student.avatar} 
                                        alt={student.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
                                    />
                                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700">
                                        <EditIcon className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
                                    <p className="text-gray-600 mb-1">Student ID: {student.id}</p>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <span className="text-sm text-gray-600">Mood Trend:</span>
                                        <div className="flex items-center space-x-1">
                                            <TrendingUpIcon className="h-4 w-4 text-green-500" />
                                            <span className="text-green-600 font-semibold capitalize">{student.moodTrend}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8 px-6">
                                    {tabs.map(tab => {
                                        const IconComponent = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`py-4 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                                    activeTab === tab.id
                                                        ? 'border-purple-500 text-purple-600'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                <IconComponent className="h-4 w-4" />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'personal-info' && (
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                                            <button
                                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                                            >
                                                {isEditing ? <SaveIcon className="h-4 w-4" /> : <EditIcon className="h-4 w-4" />}
                                                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                                            </button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                    disabled={!isEditing}
                                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                                        !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                                    }`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    disabled={!isEditing}
                                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                                        !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                                    }`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                                    disabled={!isEditing}
                                                    placeholder="Enter phone number"
                                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                                        !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                                    }`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Date of Birth
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.dateOfBirth}
                                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                                    disabled={!isEditing}
                                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                                        !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                                    }`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Gender
                                                </label>
                                                <select
                                                    value={formData.gender}
                                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                                    disabled={!isEditing}
                                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                                        !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                                    }`}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Non-binary">Non-binary</option>
                                                    <option value="Prefer not to say">Prefer not to say</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Major
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.major}
                                                    onChange={(e) => handleInputChange('major', e.target.value)}
                                                    disabled={!isEditing}
                                                    placeholder="Psychology"
                                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                                        !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                                    }`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Year of Study
                                                </label>
                                                <select
                                                    value={formData.yearOfStudy}
                                                    onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                                                    disabled={!isEditing}
                                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                                        !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                                    }`}
                                                >
                                                    <option value="">Select Year</option>
                                                    <option value="1">1st Year</option>
                                                    <option value="2">2nd Year</option>
                                                    <option value="3">3rd Year</option>
                                                    <option value="4">4th Year</option>
                                                    <option value="Graduate">Graduate</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'preferences' && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Language & Region</h3>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Language
                                                        </label>
                                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                                            <option value="en">English</option>
                                                            <option value="es">Spanish</option>
                                                            <option value="fr">French</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Time Zone
                                                        </label>
                                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                                            <option value="pst">Pacific Standard Time</option>
                                                            <option value="est">Eastern Standard Time</option>
                                                            <option value="cst">Central Standard Time</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t pt-6">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Session Preferences</h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-medium text-gray-900">Reminder Notifications</span>
                                                            <p className="text-sm text-gray-600">Get reminders before scheduled sessions</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-medium text-gray-900">Auto-join Sessions</span>
                                                            <p className="text-sm text-gray-600">Automatically join video sessions at scheduled time</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'privacy' && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                                        <div className="space-y-6">
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <div className="flex">
                                                    <ShieldIcon className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-blue-900">Your Data is Protected</h3>
                                                        <p className="text-blue-700 text-sm mt-1">
                                                            All your personal information and session data is encrypted and stored securely according to HIPAA standards.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-medium text-gray-900">Profile Visibility</span>
                                                        <p className="text-sm text-gray-600">Control who can see your profile information</p>
                                                    </div>
                                                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                                        <option value="private">Private</option>
                                                        <option value="therapists">Therapists Only</option>
                                                        <option value="community">Community Members</option>
                                                    </select>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-medium text-gray-900">Session Recording</span>
                                                        <p className="text-sm text-gray-600">Allow therapists to record sessions for review</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-medium text-gray-900">Data Analytics</span>
                                                        <p className="text-sm text-gray-600">Help improve our services by sharing anonymous usage data</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notifications' && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-medium text-gray-900">Appointment Reminders</span>
                                                            <p className="text-sm text-gray-600">Get email reminders before scheduled sessions</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-medium text-gray-900">Weekly Progress Reports</span>
                                                            <p className="text-sm text-gray-600">Receive summary of your wellness journey progress</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t pt-6">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-medium text-gray-900">Daily Check-ins</span>
                                                            <p className="text-sm text-gray-600">Gentle reminders to log your daily mood</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-medium text-gray-900">Community Updates</span>
                                                            <p className="text-sm text-gray-600">New posts and replies from community members</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Wellness Journey & Settings */}
                    <div className="lg:col-span-1">
                        {/* Wellness Journey */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Wellness Journey</h3>
                            
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-600">Mood Trend</span>
                                    <span className="text-green-600 font-bold text-2xl">Improving</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <span className="text-green-600 font-semibold">+15%</span>
                                    <span>vs last 30 days</span>
                                </div>
                            </div>

                            {/* Mood Chart Placeholder */}
                            <div className="mb-6">
                                <div className="h-32 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-end justify-center p-4">
                                    <svg className="w-full h-full" viewBox="0 0 200 80">
                                        <polyline
                                            fill="none"
                                            stroke="#7c3aed"
                                            strokeWidth="3"
                                            points="10,60 60,50 110,65 160,40"
                                            className="drop-shadow-sm"
                                        />
                                        <circle cx="10" cy="60" r="4" fill="#7c3aed" />
                                        <circle cx="60" cy="50" r="4" fill="#7c3aed" />
                                        <circle cx="110" cy="65" r="4" fill="#7c3aed" />
                                        <circle cx="160" cy="40" r="4" fill="#7c3aed" />
                                    </svg>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Week 1</span>
                                    <span>Week 2</span>
                                    <span>Week 3</span>
                                    <span>Week 4</span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-purple-50 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600">{student.totalSessions}</div>
                                    <div className="text-xs text-gray-600">Total Sessions</div>
                                </div>
                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">{student.currentStreak}</div>
                                    <div className="text-xs text-gray-600">Day Streak</div>
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <span className="font-medium text-gray-900">Password</span>
                                        <p className="text-sm text-gray-600">Update your password</p>
                                    </div>
                                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                                        Change
                                    </button>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <span className="font-medium text-gray-900">Notifications</span>
                                        <p className="text-sm text-gray-600">Manage preferences</p>
                                    </div>
                                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                                        Manage
                                    </button>
                                </div>

                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <span className="font-medium text-gray-900">Data Export</span>
                                        <p className="text-sm text-gray-600">Download your data</p>
                                    </div>
                                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            
        </div>
    );
};

export default StudentProfilePage;
