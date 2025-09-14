
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, HomeIcon, UsersIcon, CalendarIcon, DocumentReportIcon, CogIcon } from '@components/icons';

const CounselorSidebar: React.FC = () => (
    <aside className="bg-white w-64 p-6 flex flex-col justify-between fixed h-full border-r">
        <div>
            <div className="flex items-center space-x-2 mb-10">
                <LogoIcon className="h-8 w-8" />
                <span className="font-bold text-2xl text-text-dark">MindfulU</span>
            </div>
            <nav className="space-y-2">
                 <Link to="/counselor/dashboard" className="flex items-center space-x-3 text-primary bg-primary-light p-3 rounded-lg font-semibold">
                    <HomeIcon className="h-6 w-6" />
                    <span>Home</span>
                </Link>
                <Link to="/counselor/patients" className="flex items-center space-x-3 text-text-medium hover:bg-gray-100 p-3 rounded-lg">
                    <UsersIcon className="h-6 w-6" />
                    <span>Patients</span>
                </Link>
                <Link to="#" className="flex items-center space-x-3 text-text-medium hover:bg-gray-100 p-3 rounded-lg">
                    <CalendarIcon className="h-6 w-6" />
                    <span>Sessions</span>
                </Link>
                <Link to="#" className="flex items-center space-x-3 text-text-medium hover:bg-gray-100 p-3 rounded-lg">
                    <DocumentReportIcon className="h-6 w-6" />
                    <span>Resources</span>
                </Link>
            </nav>
        </div>
        <div>
            <Link to="#" className="flex items-center space-x-3 text-text-medium hover:bg-gray-100 p-3 rounded-lg">
                <CogIcon className="h-6 w-6" />
                <span>Settings</span>
            </Link>
            <div className="mt-4 flex items-center space-x-3">
                 <img src="https://picsum.photos/seed/harper/40/40" alt="Dr. Harper" className="h-12 w-12 rounded-full" />
                 <div>
                     <p className="font-bold text-text-dark">Dr. Amelia Harper</p>
                     <p className="text-sm text-text-medium">Counsellor</p>
                 </div>
            </div>
        </div>
    </aside>
);

const StatCard: React.FC<{title: string, value: string, change: string, changeType: 'up' | 'down', color: string}> = ({ title, value, change, changeType, color }) => (
    <div className={`p-6 rounded-xl ${color}`}>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-4xl font-bold text-text-dark my-2">{value}</p>
        <p className={`text-sm ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {changeType === 'up' ? '↑' : '↓'} {change}
        </p>
    </div>
);

const CalendarWidget: React.FC = () => {
    const [date, setDate] = useState(new Date(2024, 9, 1)); // October 2024
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const days = Array.from({length: 31}, (_, i) => i + 1);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <button className="text-gray-500">&lt;</button>
                <h3 className="font-semibold">{monthName} {year}</h3>
                <button className="text-gray-500">&gt;</button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-gray-500">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="py-2">{d}</div>)}
                {days.map(d => <div key={d} className={`py-2 rounded-full cursor-pointer hover:bg-primary-light ${d === 25 ? 'bg-primary text-white' : ''}`}>{d}</div>)}
            </div>
        </div>
    );
};

const CounselorDashboard: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans flex">
            <CounselorSidebar />
            <main className="ml-64 flex-1 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-text-dark">Welcome, Dr. Harper</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <h2 className="text-xl font-semibold text-text-dark mb-4">Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard title="Active Patients" value="45" change="10% vs last month" changeType="up" color="bg-green-100" />
                            <StatCard title="Sessions This Week" value="12" change="5% vs last week" changeType="down" color="bg-blue-100" />
                            <StatCard title="Crisis Alerts" value="2" change="20% vs last month" changeType="up" color="bg-red-100" />
                        </div>

                         <h2 className="text-xl font-semibold text-text-dark mt-10 mb-4">Collaborative Case Review</h2>
                         <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-text-medium">Next session: Oct 25, 2024</p>
                                <h3 className="text-2xl font-bold text-text-dark">Review Case: Sarah Bennett</h3>
                            </div>
                            <img src="https://picsum.photos/seed/sarah-b/120/80" alt="Sarah Bennett" className="rounded-lg"/>
                         </div>

                        <h2 className="text-xl font-semibold text-text-dark mt-10 mb-4">Recent Activity</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <img src="https://picsum.photos/seed/ethan-c/40/40" alt="Ethan Carter" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-text-dark">Ethan Carter</p>
                                        <p className="text-sm text-text-medium">Checked in at 9:00 AM</p>
                                    </div>
                                </div>
                                <button className="text-gray-400">⋮</button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <CalendarWidget />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CounselorDashboard;
