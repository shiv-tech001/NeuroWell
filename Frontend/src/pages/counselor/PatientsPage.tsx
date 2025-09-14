
import React from 'react';
import { Link } from 'react-router-dom';
import type { Patient } from '../../../types';
import { LogoIcon, HomeIcon, UsersIcon, SearchIcon, ChartBarIcon, ArrowRightIcon } from '@components/icons';

const patientsData: Patient[] = [
    { id: '1', name: 'Sophia Bennett', patientId: '#12345', avatarUrl: 'https://picsum.photos/seed/sophia/40/40', lastSession: '2 weeks ago', moodTrend: 'Improving', status: 'Active' },
    { id: '2', name: 'Ethan Walker', patientId: '#67890', avatarUrl: 'https://picsum.photos/seed/ethan-w/40/40', lastSession: '1 week ago', moodTrend: 'Stable', status: 'Active' },
    { id: '3', name: 'Olivia Hayes', patientId: '#24680', avatarUrl: 'https://picsum.photos/seed/olivia-h/40/40', lastSession: '3 weeks ago', moodTrend: 'Declining', status: 'Inactive' },
    { id: '4', name: 'Noah Carter', patientId: '#13579', avatarUrl: 'https://picsum.photos/seed/noah/40/40', lastSession: '1 week ago', moodTrend: 'Stable', status: 'Active' },
    { id: '5', name: 'Ava Morgan', patientId: '#97531', avatarUrl: 'https://picsum.photos/seed/ava/40/40', lastSession: '2 weeks ago', moodTrend: 'Improving', status: 'Active' },
];

const MoodTrendIndicator: React.FC<{ trend: Patient['moodTrend'] }> = ({ trend }) => {
    const styles = {
        Improving: { icon: <ChartBarIcon className="w-4 h-4 mr-1 text-green-500 transform rotate-45" />, text: 'text-green-600' },
        Stable: { icon: <ArrowRightIcon className="w-4 h-4 mr-1 text-yellow-500" />, text: 'text-yellow-600' },
        Declining: { icon: <ChartBarIcon className="w-4 h-4 mr-1 text-red-500 transform -rotate-45" />, text: 'text-red-600' },
    };
    return (
        <span className={`flex items-center text-sm font-medium ${styles[trend].text}`}>
            {styles[trend].icon}
            {trend}
        </span>
    );
};

const StatusBadge: React.FC<{ status: Patient['status'] }> = ({ status }) => {
    const styles = {
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
            {status}
        </span>
    );
};


const PatientsPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans flex">
            {/* Reusing counselor sidebar structure */}
            <aside className="bg-white w-64 p-6 flex flex-col justify-between fixed h-full border-r">
                <div>
                     <div className="flex items-center space-x-2 mb-10">
                        <LogoIcon className="h-8 w-8" />
                        <span className="font-bold text-2xl text-text-dark">MindfulU</span>
                    </div>
                    <nav className="space-y-2">
                        <Link to="/counselor/dashboard" className="flex items-center space-x-3 text-text-medium hover:bg-gray-100 p-3 rounded-lg">
                            <HomeIcon className="h-6 w-6" />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/counselor/patients" className="flex items-center space-x-3 text-primary bg-primary-light p-3 rounded-lg font-semibold">
                            <UsersIcon className="h-6 w-6" />
                            <span>Patients</span>
                        </Link>
                         {/* Other links */}
                    </nav>
                </div>
                 <div>
                    <div className="mt-4 flex items-center space-x-3">
                         <img src="https://picsum.photos/seed/harper-p/40/40" alt="Dr. Carter" className="h-12 w-12 rounded-full" />
                         <div>
                             <p className="font-bold text-text-dark">Dr. Amelia Carter</p>
                             <p className="text-sm text-text-medium">Psychiatrist</p>
                         </div>
                    </div>
                </div>
            </aside>
            <main className="ml-64 flex-1 p-8">
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-text-dark">Patients</h1>
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Search patients..."
                                className="border rounded-lg py-2 pl-10 pr-4 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-sm text-text-medium border-b">
                                    <th className="py-3 px-4 font-normal">PATIENT</th>
                                    <th className="py-3 px-4 font-normal">LAST SESSION</th>
                                    <th className="py-3 px-4 font-normal">MOOD TREND</th>
                                    <th className="py-3 px-4 font-normal">STATUS</th>
                                    <th className="py-3 px-4 font-normal">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientsData.map(patient => (
                                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <img src={patient.avatarUrl} alt={patient.name} className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <p className="font-semibold text-text-dark">{patient.name}</p>
                                                    <p className="text-xs text-text-medium">ID: {patient.patientId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-text-medium">{patient.lastSession}</td>
                                        <td className="py-4 px-4"><MoodTrendIndicator trend={patient.moodTrend} /></td>
                                        <td className="py-4 px-4"><StatusBadge status={patient.status} /></td>
                                        <td className="py-4 px-4">
                                            <button className="text-primary font-semibold text-sm hover:underline">View Profile</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PatientsPage;
