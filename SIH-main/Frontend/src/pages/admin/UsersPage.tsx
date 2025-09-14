
import React, { useState } from 'react';
import type { User } from '../../../types';
import { Link } from 'react-router-dom';
import { SearchIcon, ChevronDownIcon } from '@components/icons';

const usersData: { name: string, email: string, role: string, status: 'New' | 'Returning' | 'Power' | 'Inactive' }[] = [
  { name: 'Sophia Clark', email: 'sophia.clark@email.com', role: 'Student', status: 'New' },
  { name: 'Ethan Bennett', email: 'ethan.bennett@email.com', role: 'Student', status: 'Returning' },
  { name: 'Olivia Carter', email: 'olivia.carter@email.com', role: 'Counselor', status: 'Power' },
  { name: 'Liam Davis', email: 'liam.davis@email.com', role: 'Student', status: 'Inactive' },
];

const StatusBadge: React.FC<{ status: 'New' | 'Returning' | 'Power' | 'Inactive' }> = ({ status }) => {
  const styles = {
    New: 'bg-green-100 text-green-800',
    Returning: 'bg-blue-100 text-blue-800',
    Power: 'bg-purple-100 text-purple-800',
    Inactive: 'bg-gray-200 text-gray-800',
  };
  return (
    <span className={`flex items-center text-sm font-medium px-2.5 py-0.5 rounded-full`}>
      <span className={`h-2 w-2 mr-2 rounded-full ${styles[status].replace('text', 'bg').replace('-100', '-500')}`}></span>
      {status}
    </span>
  );
};

const UsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Students', 'Counselors', 'Admins'];

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-dark">Users</h1>
            <p className="text-text-medium">Manage all users within the MindfulU platform.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Search users..." className="border rounded-lg py-2 pl-10 pr-4 w-64" />
            </div>
            <button className="bg-primary text-white font-semibold px-4 py-2 rounded-lg">+ Add New User</button>
          </div>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md ${activeTab === tab ? 'bg-white shadow' : 'text-text-medium hover:bg-gray-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-text-medium">
              <button className="flex items-center gap-1">Status <ChevronDownIcon className="w-4 h-4" /></button>
              <button className="flex items-center gap-1">Date Joined <ChevronDownIcon className="w-4 h-4" /></button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-text-medium uppercase">
                <th className="font-semibold p-3"><input type="checkbox" /></th>
                <th className="font-semibold p-3">User</th>
                <th className="font-semibold p-3">Status</th>
                <th className="font-semibold p-3">Role</th>
                <th className="font-semibold p-3"></th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3"><input type="checkbox" /></td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={`https://picsum.photos/seed/user${index}/40/40`} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-semibold text-text-dark">{user.name}</p>
                        <p className="text-sm text-text-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3"><StatusBadge status={user.status} /></td>
                  <td className="p-3 text-text-dark">{user.role}</td>
                  <td className="p-3 text-right"><Link to="#" className="text-primary font-semibold">Edit user</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center pt-4 mt-4 text-sm text-text-medium">
            <p>Showing 1-4 of 100</p>
            <div className="flex items-center gap-2">
              <button className="border px-3 py-1 rounded-lg hover:bg-gray-100">Previous</button>
              <button className="border px-3 py-1 rounded-lg bg-gray-100">1</button>
              <button className="border px-3 py-1 rounded-lg hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
