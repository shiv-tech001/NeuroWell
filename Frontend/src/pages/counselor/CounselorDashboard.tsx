import React, { useState } from "react";
import { FaCheckCircle, FaUserMd, FaBell } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdCalendarMonth, MdEdit, MdFileDownload, MdLibraryBooks } from "react-icons/md";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useAuth } from '../../contexts/AuthContext';

// Type Definitions
type DoctorProfile = {
  name: string;
  type: string;
  license: string;
  email: string;
  experience: string;
  location: string;
  avatar: string;
};
type Session = {
  name: string;
  type: string;
  date: string;
  status: string;
};
type Task = { text: string; done: boolean };
type Resource = { title: string; type: "PDF" | "Video" | "Worksheet"; url: string };

// Sample Data
const avatars: Record<string, string> = {
  "Sarah Miller": "https://randomuser.me/api/portraits/women/44.jpg",
  "Michael Brown": "https://randomuser.me/api/portraits/men/32.jpg",
  "Emily Chen": "https://randomuser.me/api/portraits/women/65.jpg",
};

const defaultProfile: DoctorProfile = {
  name: "Dr. Amelia Carter",
  type: "Psychologist",
  license: "123456",
  email: "amelia.carter@example.com",
  experience: "12 years",
  location: "San Francisco, CA",
  avatar: "https://randomuser.me/api/portraits/women/48.jpg"
};

const sessionsDataDefault: Session[] = [
  {
    name: "Sarah Miller",
    type: "Individual Therapy",
    date: "July 15, 2024, 10:00 AM",
    status: "Confirmed",
  },
  {
    name: "Michael Brown",
    type: "Couples Counseling",
    date: "July 16, 2024, 2:00 PM",
    status: "Pending",
  },
  {
    name: "Emily Chen",
    type: "Individual Therapy",
    date: "July 17, 2024, 11:00 AM",
    status: "Confirmed",
  },
];

// Crisis Banner
const CrisisBanner: React.FC<{ onRespondNow: () => void }> = ({ onRespondNow }) => (
  <div className="bg-gradient-to-r from-red-100 to-red-200 rounded-xl p-6 flex items-center justify-between shadow mb-8 border-l-4 border-red-400">
    <div>
      <div className="flex items-center mb-2">
        <span style={{ marginRight: "0.5rem" }}>
          <HiOutlineExclamationCircle color="#dc2626" size="1.5rem" />
        </span>
        <span className="font-semibold text-lg text-red-700">Immediate assistance required.</span>
      </div>
      <p className="text-red-700 text-sm max-w-md">
        A client has indicated they are in crisis. Please respond immediately to ensure their safety and well-being.
      </p>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-xs text-red-500 mb-2 font-semibold">Crisis Alert</span>
      <button
        className="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-600 transition"
        onClick={onRespondNow}
      >
        Respond Now
      </button>
    </div>
  </div>
);

// Doctor Details with Edit
const DoctorDetails: React.FC<{
  user: any;
  onEdit: () => void;
}> = ({ user, onEdit }) => (
  <header className="py-7 mb-4 flex items-center">
    {user?.avatar?.url ? (
      <img
        src={user.avatar.url}
        alt={user.fullName}
        className="rounded-full w-16 h-16 mr-6 object-cover border"
      />
    ) : (
      <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl mr-6">
        {user?.firstName?.[0] || 'D'}
      </div>
    )}
    <div>
      <div className="flex gap-2 items-center">
        <h1 className="text-3xl font-bold text-gray-900">{user?.fullName || 'Dr. Counselor'}</h1>
        <button className="p-1 rounded hover:bg-gray-100" onClick={onEdit}>
          <MdEdit size={22} />
        </button>
      </div>
      <p className="text-lg text-gray-600">{user?.role === 'counselor' ? 'Licensed Counselor' : 'Psychologist'}</p>
      <p className="text-md text-gray-500">License No: {user?.licenseNumber || 'N/A'} | {user?.email || 'email@example.com'}</p>
      <p className="text-sm text-gray-400 mt-1">Experience: {user?.experience ? `${user.experience} years` : 'N/A'} | Specialization: {user?.specialization?.join(', ') || 'General'}</p>
    </div>
  </header>
);

// Profile Edit Modal
const ProfileEditModal: React.FC<{
  profile: DoctorProfile;
  onClose: () => void;
  onSave: (p: DoctorProfile) => void;
}> = ({ profile, onClose, onSave }) => {
  const [edited, setEdited] = useState<DoctorProfile>(profile);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h3 className="font-bold mb-4">Edit Profile</h3>
        <input className="mb-2 p-2 w-full border rounded" value={edited.name}
          onChange={e => setEdited({ ...edited, name: e.target.value })} placeholder="Name" />
        <input className="mb-2 p-2 w-full border rounded" value={edited.email}
          onChange={e => setEdited({ ...edited, email: e.target.value })} placeholder="Email" />
        <input className="mb-2 p-2 w-full border rounded" value={edited.avatar}
          onChange={e => setEdited({ ...edited, avatar: e.target.value })} placeholder="Image URL" />
        <input className="mb-2 p-2 w-full border rounded" value={edited.experience}
          onChange={e => setEdited({ ...edited, experience: e.target.value })} placeholder="Experience" />
        <input className="mb-2 p-2 w-full border rounded" value={edited.location}
          onChange={e => setEdited({ ...edited, location: e.target.value })} placeholder="Location" />
        <div className="flex justify-end gap-2 mt-3">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded bg-indigo-600 text-white" onClick={() => onSave(edited)}>Save</button>
        </div>
      </div>
    </div>
  );
};

// Overview Card
const OverviewCard: React.FC<{ icon: React.ReactNode; title: string; value: number }> = ({ icon, title, value }) => (
  <div className="flex flex-col items-center bg-white rounded-2xl shadow p-7 min-w-[200px] w-full">
    <div className="mb-2">{icon}</div>
    <div className="text-4xl font-bold text-black">{value}</div>
    <div className="text-gray-500 text-lg mt-2">{title}</div>
  </div>
);

// Overview
const Overview: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
    <OverviewCard icon={<FaUserMd size={36} color="#5B32F3" />} title="Active Clients" value={25} />
    <OverviewCard icon={<MdCalendarMonth size={36} color="#5B32F3" />} title="Upcoming Sessions" value={5} />
    <OverviewCard icon={<FaCheckCircle size={36} color="#5B32F3" />} title="Completed Sessions" value={150} />
  </div>
);

// Analytics
const sessionTrends = [
  { name: "Mon", sessions: 2 },
  { name: "Tue", sessions: 3 },
  { name: "Wed", sessions: 5 },
  { name: "Thu", sessions: 3 },
  { name: "Fri", sessions: 5 },
];
const sessionTypeData = [
  { name: "Individual", value: 45 },
  { name: "Couples", value: 15 },
  { name: "Family", value: 7 },
];
const COLORS = ["#6366F1", "#A3A3F7", "#38BDF8"];

const DashboardAnalytics: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h3 className="text-md font-semibold mb-4 text-gray-900">Sessions This Week</h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={sessionTrends}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="sessions" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h3 className="text-md font-semibold mb-4 text-gray-900">Session Types</h3>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={sessionTypeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={55}
            innerRadius={30}
            label
          >
            {sessionTypeData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Session Table with Search and Export
const SessionsTable: React.FC<{ sessions: Session[] }> = ({ sessions }) => {
  const exportCSV = () => {
    const header = '"Name","Type","Date & Time","Status"\n';
    const rows = sessions.map(
      s => `"${s.name}","${s.type}","${s.date}","${s.status}" `
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sessions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-900">Upcoming Sessions</h2>
        <button className="flex items-center gap-1 p-2 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          onClick={exportCSV}>
          <MdFileDownload /> Export CSV
        </button>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="text-left py-3">Client</th>
            <th className="text-left py-3">Date & Time</th>
            <th className="text-left py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(({ name, type, date, status }) => (
            <tr key={name} className="border-b last:border-b-0">
              <td className="py-3 flex items-center font-medium">
                <img
                  src={avatars[name]}
                  alt={name}
                  className="w-9 h-9 rounded-full mr-3 object-cover border"
                />
                <div>
                  <div className="text-gray-900">{name}</div>
                  <div className="text-xs text-gray-500">{type}</div>
                </div>
              </td>
              <td className="py-3">{date}</td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SessionsSection: React.FC<{ sessions: Session[] }> = ({ sessions }) => {
  const [search, setSearch] = useState("");
  const filtered = sessions.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase())
      || s.type.toLowerCase().includes(search.toLowerCase())
      || s.status.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <input
        type="text"
        className="mb-2 p-2 rounded border w-full sm:w-1/3 shadow"
        placeholder="Search sessions by client, type, or status..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <SessionsTable sessions={filtered} />
    </>
  );
};

// Recent Activity Timeline
const activityData = [
  {
    desc: "Session with Sarah Miller",
    date: "July 10, 2024",
    color: "indigo",
  },
  {
    desc: "New client added: David Lee",
    date: "July 8, 2024",
    color: "green",
  },
  {
    desc: "Session with Emily Chen",
    date: "July 5, 2024",
    color: "indigo",
  },
];
const RecentActivity: React.FC = () => (
  <div className="bg-white rounded-xl shadow p-6 mt-8 w-full">
    <h2 className="font-semibold text-lg mb-4 text-gray-900">Recent Activity</h2>
    <ul className="space-y-6">
      {activityData.map(({ desc, date, color }, i) => (
        <li key={i} className="flex items-start relative pl-8">
          <span
            className={`absolute left-0 top-1.5 w-4 h-4 rounded-full 
              ${color === "green" ? "bg-green-200" : "bg-indigo-200"}
            `}
          />
          <div>
            <div className="font-medium text-gray-800">{desc}</div>
            <div className="text-xs text-gray-500">{date}</div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// Notification Dropdown
const notificationsDummy = [
  { msg: "Crisis Alert: Immediate Response Needed", time: "1 min ago" },
  { msg: "Session with Michael Brown pending confirmation", time: "10 min ago" },
  { msg: "New client request: David Lee", time: "1 day ago" },
];
const NotificationDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative ml-auto">
      <button onClick={() => setOpen(!open)} className="p-2 rounded-full hover:bg-indigo-100">
        <FaBell size={20} color="#6366F1" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 shadow-2xl rounded-xl bg-white w-72 z-20 p-4 border">
          <h4 className="font-bold mb-2 text-indigo-700">Notifications</h4>
          <ul className="space-y-2">
            {notificationsDummy.map((n, i) => (
              <li key={i} className="text-sm flex justify-between items-center">
                <span>{n.msg}</span>
                <span className="text-gray-400 text-xs">{n.time}</span>
              </li>
            ))}
          </ul>
          <button className="mt-2 text-xs text-indigo-600" onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

// Tasks Widget
const TasksWidget: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Complete session notes for Sarah", done: false },
    { text: "Send resource link to Michael", done: false },
  ]);
  const [value, setValue] = useState("");
  const addTask = () => {
    if (value.trim()) {
      setTasks([...tasks, { text: value, done: false }]);
      setValue("");
    }
  };
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 w-full">
      <h2 className="font-semibold text-lg mb-4 text-gray-900">Tasks</h2>
      <ul className="mb-4">
        {tasks.map((t, i) => (
          <li key={i} className="flex items-center mb-2">
            <input type="checkbox" checked={t.done}
              onChange={() => setTasks(
                tasks.map((tk, j) => j === i ? { ...tk, done: !tk.done } : tk)
              )}
              className="mr-2"
            />
            <span className={t.done ? "line-through text-gray-400" : ""}>{t.text}</span>
          </li>
        ))}
      </ul>
      <div className="flex">
        <input
          className="p-2 border rounded flex-1 mr-2"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Add new task..."
        />
        <button className="px-3 py-1 rounded bg-indigo-500 text-white" onClick={addTask}>Add</button>
      </div>
    </div>
  );
};

// Resources Library with type select dropdown and add resource form
const ResourcesLibrary: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    { title: "Managing Anxiety PDF", type: "PDF", url: "#" },
    { title: "Self Care Video", type: "Video", url: "#" },
    { title: "Mindfulness Worksheet", type: "Worksheet", url: "#" },
    { title: "Depression Guide PDF", type: "PDF", url: "#" },
    { title: "Relaxation Techniques Video", type: "Video", url: "#" },
  ]);

  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<string>("");
  const [newUrl, setNewUrl] = useState("");

  const tabs = ["All", "PDF", "Video", "Worksheet"];

  const filteredResources = selectedTab === "All"
    ? resources
    : resources.filter(r => r.type === selectedTab);

  const addResource = () => {
    if (!newTitle.trim() || !newType.trim() || !newUrl.trim()) {
      alert("Please fill all fields to add a resource.");
      return;
    }
    setResources(prev => [...prev, { title: newTitle, type: newType as Resource["type"], url: newUrl }]);
    setNewTitle("");
    setNewType("");
    setNewUrl("");
    setSelectedTab(newType);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 w-full">
      <div className="flex items-center mb-4">
        <span className="mr-2 text-indigo-600"><MdLibraryBooks size={22} color="#6366F1" /></span>
        <h2 className="font-semibold text-lg text-gray-900">Resources Library</h2>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b border-gray-300">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-3 py-1 font-semibold rounded-t-xl ${
              selectedTab === tab ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Add Resource Form */}
      <div className="mb-6 border rounded p-4 bg-indigo-50">
        <h3 className="font-semibold mb-3 text-indigo-700">Add New Resource</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" className="p-2 border rounded flex-1" placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <select
            className="p-2 border rounded flex-1 bg-white"
            value={newType}
            onChange={e => setNewType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
            <option value="Worksheet">Worksheet</option>
          </select>
          <input type="url" className="p-2 border rounded flex-1" placeholder="URL" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
          <button onClick={addResource} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded py-2 font-semibold">Add</button>
        </div>
      </div>
      {/* Resource List */}
      <ul>
        {filteredResources.length === 0 ? (
          <li className="text-gray-500">No resources found.</li>
        ) : (
          filteredResources.map((r, i) => (
            <li key={i} className="mb-2 flex gap-2">
              <span className="font-bold">{r.title}</span>
              <span className="bg-indigo-100 px-2 py-0.5 rounded text-indigo-600 text-xs">{r.type}</span>
              <a href={r.url} className="ml-auto text-xs text-indigo-500 underline" target="_blank" rel="noopener noreferrer">View</a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// Main Dashboard Component
const CounselorDashboard: React.FC = () => {
  const { user, loading } = useAuth(); // Get user data from context
  const [profile, setProfile] = useState(defaultProfile);
  const [editOpen, setEditOpen] = useState(false);

  const handleRespondNow = () => {
    alert("Opening crisis intervention workflow!");
  };

  // Show loading state while user data is being fetched
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex justify-between items-center">
          <DoctorDetails user={user} onEdit={() => setEditOpen(true)} />
          <NotificationDropdown />
        </div>
        {editOpen &&
          <ProfileEditModal
            profile={profile}
            onClose={() => setEditOpen(false)}
            onSave={edited => { setProfile(edited); setEditOpen(false); }}
          />
        }
        <CrisisBanner onRespondNow={handleRespondNow} />
        <Overview />
        <DashboardAnalytics />
        <SessionsSection sessions={sessionsDataDefault} />
        <RecentActivity />
        <TasksWidget />
        <ResourcesLibrary />
      </main>
    </div>
  );
};

export default CounselorDashboard;
