import React, { useState } from "react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  BarChart, Bar
} from "recharts";

// --- Analytics Data ---
const statCards = [
  { label: "Appointment Attendance Rate", value: "92%" },
  { label: "Counseling Outcomes", value: "75%", sub: "Improvement", color: "text-green-600" },
  { label: "Mood/Symptom Trends", value: "Anxiety", sub: "Decreasing", color: "text-blue-600" },
  { label: "Popular Session Types", value: "Individual" },
];
// Student Progress (area chart, dummy data)
const progressData = [
  { week: "W1", value: 65 },
  { week: "W2", value: 72 },
  { week: "W3", value: 68 },
  { week: "W4", value: 75 },
  { week: "W5", value: 73 },
  { week: "W6", value: 80 },
  { week: "W7", value: 74 },
  { week: "W8", value: 85 },
  { week: "W9", value: 82 },
  { week: "W10", value: 87 },
  { week: "W11", value: 84 },
  { week: "W12", value: 90 },
];
// Missed Appointments (bar chart)
const missedData = [
  { week: "W1", missed: 3 },
  { week: "W2", missed: 4 },
  { week: "W3", missed: 2 },
  { week: "W4", missed: 3 }
];
const missedPct = -5;

type Student = {
  id: number;
  name: string;
  email: string;
  lastSession: string;
  moodTrend: "Stable" | "Improving" | "Declining";
  status: "Active" | "Inactive" | "Risk Alert";
  avatar?: string;
};

// --- Ashish Kushwaha removed! ---
const initialStudents: Student[] = [
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    lastSession: "2 weeks ago",
    moodTrend: "Improving",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    lastSession: "1 week ago",
    moodTrend: "Stable",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "David Chen",
    email: "david.chen@example.com",
    lastSession: "3 weeks ago",
    moodTrend: "Declining",
    status: "Risk Alert",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
];

// --- Analytics Section as a component ---
function AnalyticsDashboard() {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500 mb-4">
          Track and improve student mental health outcomes with real-time data and insights.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col gap-1 items-start">
            <span className="text-xs text-gray-500">{stat.label}</span>
            <span className="text-2xl font-bold">{stat.value}</span>
            {stat.sub && <span className={`text-xs font-semibold ${stat.color}`}>{stat.sub}</span>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Overall Student Progress</div>
            <div className="text-green-600 text-sm font-semibold">+15%</div>
          </div>
          <span className="text-xs text-gray-400 mb-2 block">Last 3 Months</span>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={progressData}>
              <defs>
                <linearGradient id="progress-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#6366F1" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="week" hide />
              <YAxis hide domain={[60, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#6366F1" fill="url(#progress-gradient)" strokeWidth={3} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <span className="text-sm text-gray-500">By Week</span>
          <span className="text-xs text-gray-400 mb-3 block">Last 4 Weeks</span>
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={missedData}>
              <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{fontSize:12}} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="missed" fill="#DC2626" radius={[5,5,0,0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
          <span className="text-red-600 mt-2 text-sm font-semibold">{missedPct}%</span>
        </div>
      </div>
    </div>
  );
}

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [activeTab, setActiveTab] = useState<"all" | "risk">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [moodFilter, setMoodFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    lastSession: "",
    moodTrend: "Stable",
    status: "Active",
  });

  const [deleteCandidate, setDeleteCandidate] = useState<Student | null>(null);

  function confirmDelete(id: number) {
    setDeleteCandidate(students.find((s) => s.id === id) || null);
  }

  function handleDelete() {
    if (deleteCandidate) {
      setStudents((prev) => prev.filter((s) => s.id !== deleteCandidate.id));
      setDeleteCandidate(null);
    }
  }

  function filterStudents() {
    return students.filter((student) => {
      if (activeTab === "risk" && student.status !== "Risk Alert") return false;
      if (
        searchTerm &&
        !student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (moodFilter !== "All" && student.moodTrend !== moodFilter) return false;
      if (statusFilter !== "All" && student.status !== statusFilter) return false;
      return true;
    });
  }

  function getMoodLabel(mood: string) {
    switch (mood) {
      case "Stable":
        return (
          <span className="text-yellow-600 font-semibold">
            &rarr; Stable
          </span>
        );
      case "Improving":
        return (
          <span className="text-green-600 font-semibold">
            &uarr; Improving
          </span>
        );
      case "Declining":
        return (
          <span className="text-red-600 font-semibold">
            &darr; Declining
          </span>
        );
      default:
        return mood;
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case "Active":
        return (
          <span className="bg-green-200 text-green-800 px-2 rounded-full text-xs font-semibold">
            Active
          </span>
        );
      case "Inactive":
        return (
          <span className="bg-gray-300 text-gray-800 px-2 rounded-full text-xs font-semibold">
            Inactive
          </span>
        );
      case "Risk Alert":
        return (
          <span className="bg-red-200 text-red-800 px-2 rounded-full text-xs font-semibold">
            Risk Alert
          </span>
        );
      default:
        return status;
    }
  }

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const inactiveStudents = students.filter((s) => s.status === "Inactive").length;
  const atRiskStudents = students.filter((s) => s.status === "Risk Alert").length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow relative">
      <AnalyticsDashboard />
      <h2 className="font-bold text-xl mb-4">Student Management</h2>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          Total Students: {totalStudents}
        </span>
        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          Active: {activeStudents}
        </span>
        <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
          Inactive: {inactiveStudents}
        </span>
        <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
          At Risk: {atRiskStudents}
        </span>
        <button
          className="ml-auto bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          onClick={() => setShowAddForm(true)}
        >
          + Add Student
        </button>
      </div>
      {showAddForm && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Last Session"
            value={newStudent.lastSession}
            onChange={(e) =>
              setNewStudent({ ...newStudent, lastSession: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <select
            value={newStudent.moodTrend}
            onChange={(e) =>
              setNewStudent({ ...newStudent, moodTrend: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          >
            <option value="Stable">Stable</option>
            <option value="Improving">Improving</option>
            <option value="Declining">Declining</option>
          </select>
          <select
            value={newStudent.status}
            onChange={(e) =>
              setNewStudent({ ...newStudent, status: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Risk Alert">Risk Alert</option>
          </select>
          <button
            onClick={() => {
              if (!newStudent.name || !newStudent.email) {
                alert("Please enter name and email");
                return;
              }
              const newId =
                students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
              setStudents([...students, { id: newId, ...newStudent }]);
              setNewStudent({
                name: "",
                email: "",
                lastSession: "",
                moodTrend: "Stable",
                status: "Active",
              });
              setShowAddForm(false);
            }}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="ml-2 px-3 py-1 rounded border"
          >
            Cancel
          </button>
        </div>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 flex-grow min-w-[200px]"
        />
        <select
          className="border border-gray-300 rounded px-3 py-1"
          onChange={(e) => setMoodFilter(e.target.value)}
          value={moodFilter}
        >
          <option value="All">Mood: All</option>
          <option value="Stable">Stable</option>
          <option value="Improving">Improving</option>
          <option value="Declining">Declining</option>
        </select>
        <select
          className="border border-gray-300 rounded px-3 py-1"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="All">Status: All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Risk Alert">Risk Alert</option>
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-1 rounded ${
            activeTab === "all"
              ? "border-b-2 border-purple-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          All Students
        </button>
        <button
          onClick={() => setActiveTab("risk")}
          className={`ml-4 px-4 py-1 rounded ${
            activeTab === "risk"
              ? "border-b-2 border-red-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          Risk Alert
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="pb-2">Student</th>
            <th className="pb-2">Last Session</th>
            <th className="pb-2">Mood Trend</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterStudents().map((student) => (
            <tr
              key={student.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="py-2 flex items-center gap-3">
                {student.avatar ? (
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                    {student.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </div>
              </td>
              <td className="py-2">{student.lastSession}</td>
              <td className="py-2">{getMoodLabel(student.moodTrend)}</td>
              <td className="py-2">{getStatusLabel(student.status)}</td>
              <td className="py-2 text-purple-700 space-x-4">
                <button
                  onClick={() => confirmDelete(student.id)}
                  className="underline text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filterStudents().length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {deleteCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Deletion
            </h3>
            <p className="mb-6">
              Are you sure you want to delete student <b>{deleteCandidate.name}</b>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
