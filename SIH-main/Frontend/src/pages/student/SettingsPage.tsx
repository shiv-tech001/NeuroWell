import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, BellIcon, CameraIcon } from '@components/icons';

// Header component specific to this page to match the image
const SettingsHeader: React.FC = () => (
    <header className="bg-white/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-4xl">
            <Link to="/student/dashboard" className="flex items-center space-x-2">
                <LogoIcon className="h-8 w-8" />
                <span className="font-bold text-2xl text-text-dark">MindfulU</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
                <Link to="/student/dashboard" className="text-text-medium hover:text-primary">Home</Link>
                <a href="#" className="text-text-medium hover:text-primary">Wellness</a>
                <Link to="/student/appointments" className="text-text-medium hover:text-primary">Appointments</Link>
                <Link to="/student/community" className="text-text-medium hover:text-primary">Community</Link>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-text-dark">
                    <BellIcon className="h-6 w-6" />
                </button>
                <img src="https://picsum.photos/seed/sophia-b/40/40" alt="User Avatar" className="h-9 w-9 rounded-full" />
            </div>
        </div>
    </header>
);

const SettingsInput: React.FC<{ label: string, id: string, value: string, type?: string }> = ({ label, id, value, type = "text" }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-medium mb-1">{label}</label>
        <input type={type} id={id} defaultValue={value} className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-text-dark focus:ring-primary focus:border-primary transition" />
    </div>
);

const SettingsRow: React.FC<{ title: string, description: string, children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="flex items-center justify-between py-5">
        <div>
            <h4 className="font-semibold text-text-dark">{title}</h4>
            <p className="text-sm text-text-medium max-w-sm">{description}</p>
        </div>
        <div>{children}</div>
    </div>
);

const SettingsPage: React.FC = () => {
    return (
        <div className="bg-[#F8F9FA] min-h-screen font-sans">
             <div 
                className="absolute top-0 left-0 w-full h-96"
                style={{
                    background: 'radial-gradient(circle at 50% 0, #E8F4FD 0%, rgba(255,255,255,0) 40%)'
                }}
            ></div>
            <SettingsHeader />
            <main className="max-w-4xl mx-auto p-8 relative">
                <h1 className="text-3xl font-bold text-text-dark mb-10">Account Settings</h1>
                <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
                        <div className="text-center flex-shrink-0">
                            <img src="https://picsum.photos/seed/sophia-b/120/120" alt="Sophia Bennett" className="w-32 h-32 rounded-full mb-3 mx-auto shadow-md" />
                            <h2 className="text-xl font-bold text-text-dark">Sophia Bennett</h2>
                            <p className="text-sm text-text-medium">sophia.bennett@email.com</p>
                            <button className="text-sm text-primary hover:underline flex items-center justify-center gap-2 mt-2 mx-auto">
                                <CameraIcon className="w-4 h-4" />
                                <span>Upload new photo</span>
                            </button>
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 w-full">
                            <SettingsInput label="Full Name" id="fullName" value="Sophia Bennett" />
                            <SettingsInput label="Email" id="email" value="sophia.bennett@email.com" type="email" />
                            <SettingsInput label="Phone Number" id="phone" value="+1 (555) 123-4567" />
                            <SettingsInput label="University" id="university" value="Mindful University" />
                            <SettingsInput label="Major" id="major" value="Psychology" />
                            <SettingsInput label="Year" id="year" value="3rd Year" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-text-dark mb-2">Settings</h3>
                    <div className="divide-y divide-gray-200">
                        <SettingsRow title="Enable Notifications" description="Receive notifications for new messages, appointment reminders, and community updates.">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </SettingsRow>
                         <SettingsRow title="Privacy Settings" description="Control who can see your profile information and activity.">
                            <button className="font-semibold bg-gray-100 text-text-dark px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">Manage</button>
                        </SettingsRow>
                        <SettingsRow title="Change Password" description="Change your password to keep your account secure.">
                            <button className="font-semibold bg-gray-100 text-text-dark px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">Change</button>
                        </SettingsRow>
                        <SettingsRow title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
                            <button className="font-semibold bg-gray-100 text-text-dark px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">Set Up</button>
                        </SettingsRow>
                    </div>

                    <div className="text-right mt-10">
                        <button className="bg-[#2DD4BF] hover:bg-[#14B8A6] text-white font-bold py-3 px-8 rounded-lg transition shadow-md hover:shadow-lg">Save Changes</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;