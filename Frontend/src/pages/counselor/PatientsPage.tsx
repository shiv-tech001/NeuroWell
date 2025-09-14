import React, { useState } from "react";

type Patient = {
  id: number;
  name: string;
  email: string;
  lastSession: string;
  moodTrend: "Stable" | "Improving" | "Declining";
  status: "Active" | "Inactive" | "Risk Alert";
  avatar?: string;
};

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Ashish Kushwaha",
    email: "aashishkushwaha724@gmail.com",
    lastSession: "1 week ago",
    moodTrend: "Stable",
    status: "Risk Alert",
    avatar: "",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    lastSession: "2 weeks ago",
    moodTrend: "Improving",
    status: "Active",
    avatar:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    lastSession: "1 week ago",
    moodTrend: "Stable",
    status: "Active",
    avatar:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "David Chen",
    email: "david.chen@example.com",
    lastSession: "3 weeks ago",
    moodTrend: "Declining",
    status: "Risk Alert",
    avatar:
      "https://randomuser.me/api/portraits/men/11.jpg",
  },
];

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [activeTab, setActiveTab] = useState<"all" | "risk">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [moodFilter, setMoodFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    lastSession: "",
    moodTrend: "Stable",
    status: "Active",
  });

  const [deleteCandidate, setDeleteCandidate] = useState<Patient | null>(null);

  function confirmDelete(id: number) {
    setDeleteCandidate(patients.find((p) => p.id === id) || null);
  }

  function handleDelete() {
    if (deleteCandidate) {
      setPatients((prev) => prev.filter((p) => p.id !== deleteCandidate.id));
      setDeleteCandidate(null);
    }
  }

  function filterPatients() {
    return patients.filter((patient) => {
      if (activeTab === "risk" && patient.status !== "Risk Alert") return false;
      if (
        searchTerm &&
        !patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (moodFilter !== "All" && patient.moodTrend !== moodFilter) return false;
      if (statusFilter !== "All" && patient.status !== statusFilter) return false;
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

  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === "Active").length;
  const inactivePatients = patients.filter((p) => p.status === "Inactive").length;
  const atRiskPatients = patients.filter((p) => p.status === "Risk Alert").length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow relative">
      <h2 className="font-bold text-xl mb-4">Patient Management</h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          Total Patients: {totalPatients}
        </span>
        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          Active: {activePatients}
        </span>
        <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
          Inactive: {inactivePatients}
        </span>
        <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
          At Risk: {atRiskPatients}
        </span>
        <button
          className="ml-auto bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          onClick={() => setShowAddForm(true)}
        >
          + Add Patient
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <input
            type="text"
            placeholder="Name"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newPatient.email}
            onChange={(e) =>
              setNewPatient({ ...newPatient, email: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Last Session"
            value={newPatient.lastSession}
            onChange={(e) =>
              setNewPatient({ ...newPatient, lastSession: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <select
            value={newPatient.moodTrend}
            onChange={(e) =>
              setNewPatient({ ...newPatient, moodTrend: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          >
            <option value="Stable">Stable</option>
            <option value="Improving">Improving</option>
            <option value="Declining">Declining</option>
          </select>
          <select
            value={newPatient.status}
            onChange={(e) =>
              setNewPatient({ ...newPatient, status: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Risk Alert">Risk Alert</option>
          </select>
          <button
            onClick={() => {
              if (!newPatient.name || !newPatient.email) {
                alert("Please enter name and email");
                return;
              }
              const newId =
                patients.length > 0 ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
              setPatients([...patients, { id: newId, ...newPatient }]);
              setNewPatient({
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
          placeholder="Search patients..."
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
          All Patients
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
            <th className="pb-2">Patient</th>
            <th className="pb-2">Last Session</th>
            <th className="pb-2">Mood Trend</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterPatients().map((patient) => (
            <tr
              key={patient.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="py-2 flex items-center gap-3">
                {patient.avatar ? (
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                    {patient.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold">{patient.name}</div>
                  <div className="text-sm text-gray-500">{patient.email}</div>
                </div>
              </td>
              <td className="py-2">{patient.lastSession}</td>
              <td className="py-2">{getMoodLabel(patient.moodTrend)}</td>
              <td className="py-2">{getStatusLabel(patient.status)}</td>
              <td className="py-2 text-purple-700 space-x-4">
                <button
                  onClick={() => confirmDelete(patient.id)}
                  className="underline text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filterPatients().length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No patients found.
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
              Are you sure you want to delete patient <b>{deleteCandidate.name}</b>?
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
