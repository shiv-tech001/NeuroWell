
import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const engagementData = [
  { name: 'Week 1', value: 12 },
  { name: 'Week 2', value: 19 },
  { name: 'Week 3', value: 15 },
  { name: 'Week 4', value: 22 },
];

const completionData = [
  { name: 'Week 1', rate: 88 },
  { name: 'Week 2', rate: 92 },
  { name: 'Week 3', rate: 85 },
  { name: 'Week 4', rate: 89 },
];


const MetricCard: React.FC<{title: string, value: string}> = ({title, value}) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
        <p className="text-text-medium">{title}</p>
        <p className="text-4xl font-bold text-text-dark mt-2">{value}</p>
    </div>
);


const AdminDashboard: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-dark">Admin Dashboard</h1>
                <p className="text-text-medium">High-level overview of platform metrics, engagement statistics, and session graphs by user type.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <MetricCard title="Total Users" value="1,250" />
                <MetricCard title="Active Users" value="980" />
                <MetricCard title="Sessions Completed" value="750" />
            </div>

            <h2 className="text-2xl font-bold text-text-dark mb-4">Engagement Statistics</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                         <div>
                            <h3 className="text-lg font-semibold text-text-dark">User Engagement Over Time</h3>
                            <p className="text-3xl font-bold text-text-dark mt-1">+15%</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full">+15%</span>
                    </div>
                    <div className="h-48 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={engagementData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-text-dark">Session Completion Rates</h3>
                            <p className="text-3xl font-bold text-text-dark mt-1">85%</p>
                        </div>
                        <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-1 rounded-full">-5%</span>
                    </div>
                    <div className="h-48 mt-4">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={completionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#28A745" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#28A745" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} />
                                <YAxis tickLine={false} axisLine={false} domain={[80, 100]} dx={-10} />
                                <Tooltip />
                                <Area type="monotone" dataKey="rate" stroke="#28A745" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
