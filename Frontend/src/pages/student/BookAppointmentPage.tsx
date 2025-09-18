import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  GraduationCap,
  Star,
  Lightbulb,
  MapPin,
  Clock,
  CheckCircle2,
  Hourglass,
  XCircle,
  Video,
} from "lucide-react";

// ---------------- Counselor Data ----------------
const counselors = [
  {
    name: "Dr. Sarah Miller",
    availability: "Mon & Wed, 2 PM - 5 PM",
    status: "Available",
    experience: "8+ years",
    specialization: "Stress, Anxiety, Depression",
    education: "PhD in Clinical Psychology",
    location: "New York, USA",
    responseTime: "Usually replies in 2 hrs",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mr. David Chen",
    availability: "Tue & Thu, 10 AM - 1 PM",
    status: "Available",
    experience: "5+ years",
    specialization: "Career Counseling, Student Guidance",
    education: "M.A. Counseling Psychology",
    location: "San Francisco, USA",
    responseTime: "Usually replies in 4 hrs",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ms. Emily Rodriguez",
    availability: "Fridays, 9 AM - 12 PM",
    status: "Busy",
    experience: "6+ years",
    specialization: "Relationships, Motivation",
    education: "M.Sc. Psychology",
    location: "Miami, USA",
    responseTime: "Usually replies in 6 hrs",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Dr. James Wilson",
    availability: "Mon-Fri, 3 PM - 6 PM",
    status: "Available",
    experience: "10+ years",
    specialization: "Work-life Balance, Burnout",
    education: "PhD Organizational Psychology",
    location: "Chicago, USA",
    responseTime: "Usually replies in 3 hrs",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Ms. Priya Sharma",
    availability: "Sat & Sun, 11 AM - 4 PM",
    status: "Available",
    experience: "7+ years",
    specialization: "Family Issues, Relationships",
    education: "M.A. Counseling Psychology",
    location: "Delhi, India",
    responseTime: "Usually replies in 5 hrs",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Mr. John Anderson",
    availability: "Tue & Thu, 5 PM - 8 PM",
    status: "Busy",
    experience: "9+ years",
    specialization: "Trauma, PTSD",
    education: "M.Sc. Clinical Psychology",
    location: "Los Angeles, USA",
    responseTime: "Usually replies in 8 hrs",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Dr. Mei Ling",
    availability: "Mon-Fri, 10 AM - 1 PM",
    status: "Available",
    experience: "12+ years",
    specialization: "Mindfulness, Meditation",
    education: "PhD Psychology",
    location: "Singapore",
    responseTime: "Usually replies in 2 hrs",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    name: "Mr. Carlos Martinez",
    availability: "Wed & Fri, 1 PM - 5 PM",
    status: "Available",
    experience: "4+ years",
    specialization: "Student Guidance, Exam Stress",
    education: "M.A. Psychology",
    location: "Madrid, Spain",
    responseTime: "Usually replies in 6 hrs",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Ms. Linda Brown",
    availability: "Tue & Sat, 2 PM - 6 PM",
    status: "Busy",
    experience: "15+ years",
    specialization: "Grief Counseling, Depression",
    education: "PhD in Counseling",
    location: "London, UK",
    responseTime: "Usually replies in 12 hrs",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Mr. Ahmed Khan",
    availability: "Mon-Fri, 4 PM - 7 PM",
    status: "Available",
    experience: "6+ years",
    specialization: "Career Change, Motivation",
    education: "M.Sc. Psychology",
    location: "Dubai, UAE",
    responseTime: "Usually replies in 3 hrs",
    image: "https://randomuser.me/api/portraits/men/83.jpg",
  },
  {
    name: "Dr. Sophia Rossi",
    availability: "Wed & Fri, 9 AM - 12 PM",
    status: "Available",
    experience: "11+ years",
    specialization: "Couples Therapy, Stress",
    education: "PhD Psychology",
    location: "Rome, Italy",
    responseTime: "Usually replies in 7 hrs",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    name: "Mr. William Scott",
    availability: "Mon & Wed, 1 PM - 5 PM",
    status: "Available",
    experience: "8+ years",
    specialization: "Youth Guidance, Addiction",
    education: "M.A. Clinical Psychology",
    location: "Toronto, Canada",
    responseTime: "Usually replies in 5 hrs",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Ms. Hannah Kim",
    availability: "Tue & Thu, 10 AM - 2 PM",
    status: "Available",
    experience: "9+ years",
    specialization: "Self-esteem, Motivation",
    education: "M.Sc. Counseling Psychology",
    location: "Seoul, South Korea",
    responseTime: "Usually replies in 4 hrs",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "Dr. Robert Evans",
    availability: "Fri & Sun, 3 PM - 7 PM",
    status: "Busy",
    experience: "14+ years",
    specialization: "Addiction Recovery, Trauma",
    education: "PhD Psychology",
    location: "Sydney, Australia",
    responseTime: "Usually replies in 9 hrs",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    name: "Ms. Aisha Ali",
    availability: "Mon-Fri, 9 AM - 12 PM",
    status: "Available",
    experience: "5+ years",
    specialization: "Teen Issues, Study Pressure",
    education: "M.A. Counseling",
    location: "Cairo, Egypt",
    responseTime: "Usually replies in 6 hrs",
    image: "https://randomuser.me/api/portraits/women/71.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

export default function FindCounselor() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      counselorName: "Dr. Sarah Miller",
      status: "approved",
      date: "2025-09-17",
      time: "3:00 PM",
    },
    {
      id: 2,
      counselorName: "Mr. David Chen",
      status: "approved",
      date: "2025-09-17",
      time: "1:00 PM",
    },
  ]);

  const handleBook = (counselorName) => {
    const newAppt = {
      id: Date.now(),
      counselorName,
      status: "pending",
    };
    setAppointments([...appointments, newAppt]);
  };

  const handleCancel = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const filteredCounselors = counselors.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCounselors.length / ITEMS_PER_PAGE);
  const paginatedCounselors = filteredCounselors.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const now = new Date();

  const isJoinAvailable = (date, time) => {
    const appointmentDateTime = new Date(`${date} ${time}`);
    return appointmentDateTime <= now;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Find a Counselor
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Browse our team of experienced counselors and book a session easily.
        </p>
      </div>

      {/* ---------------- Top Blocks ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Pending Requests */}
        <div className="flex-1 bg-yellow-100 border border-yellow-300 rounded-xl p-4">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <Hourglass className="w-4 h-4" /> Pending Requests
          </h3>
          {appointments.filter((a) => a.status === "pending").length === 0 ? (
            <p className="text-sm text-gray-500">No pending requests</p>
          ) : (
            <ul className="space-y-2">
              {appointments
                .filter((a) => a.status === "pending")
                .map((appt) => (
                  <li
                    key={appt.id}
                    className="flex justify-between items-center text-sm bg-white p-2 rounded shadow"
                  >
                    <span>{appt.counselorName}</span>
                    <span className="text-yellow-700 font-medium">
                      Pending Approval
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Approved Appointments */}
        <div className="flex-1 bg-green-100 border border-green-300 rounded-xl p-4">
          <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Approved Appointments
          </h3>
          {appointments.filter((a) => a.status === "approved").length === 0 ? (
            <p className="text-sm text-gray-500">No approved appointments</p>
          ) : (
            <ul className="space-y-2">
              {appointments
                .filter((a) => a.status === "approved")
                .map((appt) => (
                  <li
                    key={appt.id}
                    className="flex justify-between items-center text-sm bg-white p-2 rounded shadow"
                  >
                    <span>{appt.counselorName}</span>
                    <span className="text-green-700 font-medium">
                      {appt.date}, {appt.time}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Join Video Calls */}
        <div className="flex-1 bg-blue-100 border border-blue-300 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Video className="w-4 h-4" /> Join Video Calls
          </h3>
          {appointments.filter(
            (a) => a.status === "approved" && isJoinAvailable(a.date, a.time)
          ).length === 0 ? (
            <p className="text-sm text-gray-500">No active video calls</p>
          ) : (
            <ul className="space-y-2">
              {appointments
                .filter(
                  (a) => a.status === "approved" && isJoinAvailable(a.date, a.time)
                )
                .map((appt) => (
                  <li
                    key={appt.id}
                    className="flex justify-between items-center text-sm bg-white p-2 rounded shadow"
                  >
                    <span>{appt.counselorName}</span>
                    <button
                      onClick={() => navigate("/student/sessions")}
                      className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Video className="w-3 h-3" /> Join Now
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* ---------------- Search Bar ---------------- */}
      <div className="flex items-center gap-3 mb-10 max-w-lg mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ---------------- Counselor Cards ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCounselors.map((counselor, idx) => {
          const appointment = appointments.find(
            (a) => a.counselorName === counselor.name
          );

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col items-center p-6 space-y-4 text-center"
            >
              {/* Profile Image */}
              <img
                src={counselor.image}
                alt={counselor.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 shadow-md"
              />

              {/* Name + Availability */}
              <div>
                <h2 className="text-xl font-semibold">{counselor.name}</h2>
                <p className="text-gray-500 text-sm">{counselor.availability}</p>
              </div>

              {/* More Info */}
              <div className="text-sm text-gray-600 space-y-2 w-full text-left">
                <p className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-600" />{" "}
                  {counselor.education}
                </p>
                <p className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />{" "}
                  {counselor.experience} experience
                </p>
                <p className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />{" "}
                  {counselor.specialization}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />{" "}
                  {counselor.location}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />{" "}
                  {counselor.responseTime}
                </p>
              </div>

              {/* Status */}
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  counselor.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {counselor.status}
              </span>

              {/* Appointment Actions */}
              {appointment ? (
                <div className="flex flex-col gap-2 w-full">
                  {appointment.status === "pending" ? (
                    <span className="flex items-center gap-2 text-yellow-600 font-medium">
                      <Hourglass className="w-4 h-4" /> Pending Approval
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> Approved
                    </span>
                  )}
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" /> Cancel Appointment
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleBook(counselor.name)}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 shadow-md transition"
                >
                  Book Now
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* ---------------- Pagination ---------------- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}