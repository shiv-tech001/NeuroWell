import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  VideoCameraIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const patientPics = [
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/11.jpg',
  'https://randomuser.me/api/portraits/women/45.jpg',
  'https://randomuser.me/api/portraits/men/52.jpg',
  'https://randomuser.me/api/portraits/women/33.jpg',
  'https://randomuser.me/api/portraits/men/34.jpg',
  'https://randomuser.me/api/portraits/women/71.jpg',
  'https://randomuser.me/api/portraits/men/18.jpg',
];

const initialAppointments = [
  {
    id: 1,
    studentName: 'Priya Sharma',
    avatar: patientPics[0],
    bookedAt: '2025-09-12 14:32',
    appointmentDate: '2025-09-15',
    time: '4:00 PM',
    status: 'Confirmed',
    type: 'Consultation',
    sessionType: 'Video',
    duration: 50,
    notes: 'Wants to discuss anxiety management and productivity.',
  },
  {
    id: 2,
    studentName: 'John Doe',
    avatar: patientPics[1],
    bookedAt: '2025-09-13 09:11',
    appointmentDate: '2025-09-15',
    time: '11:00 AM',
    status: 'Pending',
    type: 'Follow-up',
    sessionType: 'Audio',
    duration: 40,
    notes: 'Follows up regarding medication and sleep patterns.',
  },
  {
    id: 3,
    studentName: 'Anjali Verma',
    avatar: patientPics[2],
    bookedAt: '2025-09-10 17:45',
    appointmentDate: '2025-09-17',
    time: '3:30 PM',
    status: 'Confirmed',
    type: 'Counseling',
    sessionType: 'Chat',
    duration: 30,
    notes: 'First-time session for stress at work.',
  },
  {
    id: 4,
    studentName: 'Samir Kapoor',
    avatar: patientPics[3],
    bookedAt: '2025-09-14 10:05',
    appointmentDate: '2025-09-19',
    time: '5:00 PM',
    status: 'Confirmed',
    type: 'Consultation',
    sessionType: 'Audio',
    duration: 30,
    notes: 'Consultation on public speaking anxiety.',
  },
  {
    id: 5,
    studentName: 'Lisa Wang',
    avatar: patientPics[4],
    bookedAt: '2025-09-14 10:10',
    appointmentDate: '2025-09-21',
    time: '1:45 PM',
    status: 'Pending',
    type: 'Assessment',
    sessionType: 'Video',
    duration: 30,
    notes: 'Assessment for exam stress and family concerns.',
  },
  {
    id: 6,
    studentName: 'Henry Grant',
    avatar: patientPics[5],
    bookedAt: '2025-09-15 15:12',
    appointmentDate: '2025-09-15',
    time: '10:00 AM',
    status: 'Confirmed',
    type: 'Counseling',
    sessionType: 'Chat',
    duration: 25,
    notes: 'Resilience training for handling workplace setbacks.',
  },
  {
    id: 7,
    studentName: 'Emma Roy',
    avatar: patientPics[6],
    bookedAt: '2025-09-15 16:25',
    appointmentDate: '2025-09-22',
    time: '2:00 PM',
    status: 'Confirmed',
    type: 'Follow-up',
    sessionType: 'Audio',
    duration: 45,
    notes: 'Reviewing progress since last month.',
  },
  {
    id: 8,
    studentName: 'Rahul Singh',
    avatar: patientPics[7],
    bookedAt: '2025-09-13 19:01',
    appointmentDate: '2025-09-16',
    time: '3:00 PM',
    status: 'Pending',
    type: 'Assessment',
    sessionType: 'Video',
    duration: 60,
    notes: 'Initial assessment for academic planning.',
  },
];

const appointmentsPerPage = 5;

const sessionIcon = (type: string) => {
  switch (type) {
    case 'Video':
      return <VideoCameraIcon className="w-5 h-5 text-blue-600 inline-block mr-1" />;
    case 'Audio':
      return <PhoneIcon className="w-5 h-5 text-green-600 inline-block mr-1" />;
    case 'Chat':
      return <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600 inline-block mr-1" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  while (days.length % 7 !== 0) {
    days.push(null);
  }
  return days;
};

const formatMonth = (date: Date) =>
  date.toLocaleString('default', { month: 'long', year: 'numeric' });

const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth()+1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const todayStr = () => toLocalDateString(new Date());

const getPatientRows = (appointments: typeof initialAppointments) => {
  const map = new Map<string, typeof initialAppointments[0]>();
  appointments.forEach(appt => {
    if (
      !map.has(appt.studentName) ||
      new Date(appt.appointmentDate) > new Date(map.get(appt.studentName)!.appointmentDate)
    ) {
      map.set(appt.studentName, appt);
    }
  });
  return Array.from(map.values());
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [tab, setTab] = useState<'appointments' | 'patients' | 'approval'>('appointments');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedDay(todayStr());
  }, []);

  const appointmentsByDate = appointments.reduce((acc, appt) => {
    const apptDate = appt.appointmentDate;
    if (!acc[apptDate]) acc[apptDate] = [];
    acc[apptDate].push(appt);
    return acc;
  }, {} as Record<string, typeof appointments>);

  const filteredAppointments = appointments
    .filter(appt =>
      appt.status === 'Confirmed' &&
      (selectedDay ? appt.appointmentDate === selectedDay : true) &&
      (typeFilter === 'All' || appt.sessionType === typeFilter) &&
      appt.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
  const pageAppointments = filteredAppointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );

  const handleCalendarDayClick = (date: Date) => {
    const dstr = toLocalDateString(date);
    setSelectedDay(dstr === selectedDay ? null : dstr);
    setCurrentPage(1);
  };

  const navigateMonth = (dir: number) => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(prev.getMonth() + dir);
      return d;
    });
  };

  const handleApprove = (id: number) => {
    setAppointments(prev =>
      prev.map(appt => (appt.id === id ? { ...appt, status: 'Confirmed' } : appt))
    );
    setCurrentPage(1);
  };

  const handleReject = (id: number) => {
    setAppointments(prev =>
      prev.map(appt => (appt.id === id ? { ...appt, status: 'Cancelled' } : appt))
    );
    setCurrentPage(1);
  };

  const approvalAppointments = appointments.filter(appt => appt.status === 'Pending');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto py-12 px-2 sm:px-8">
        <div className="mb-8 flex gap-4 border-b">
          <button
            className={`py-2 px-4 outline-none flex items-center gap-2 font-semibold border-b-2 ${
              tab === 'appointments'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setTab('appointments')}
          >
            <ClipboardDocumentListIcon className="w-5 h-5" />
            Appointments
          </button>
          <button
            className={`py-2 px-4 outline-none flex items-center gap-2 font-semibold border-b-2 ${
              tab === 'approval'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-purple-600'
            }`}
            onClick={() => setTab('approval')}
          >
            <ClockIcon className="w-5 h-5" />
            Appointment Approval
          </button>
          <button
            className={`py-2 px-4 outline-none flex items-center gap-2 font-semibold border-b-2 ${
              tab === 'patients'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setTab('patients')}
          >
            <UsersIcon className="w-5 h-5" />
            All Patients
          </button>
        </div>

        {tab === 'appointments' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Booked Appointments</h1>
                <p className="text-gray-600 mt-1">View today's appointments or select a date to filter. Calendar marks dates with appointments.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search client..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Type</span>
                <select
                  value={typeFilter}
                  onChange={e => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="All">All</option>
                  <option value="Video">Video Call</option>
                  <option value="Audio">Audio Call</option>
                  <option value="Chat">Chat</option>
                </select>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap max-w-[180px]">Patient</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Date &amp; Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Session</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Duration</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Profile (Notes)</th>
                    <th className="px-2 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pageAppointments.map(appt => (
                    <tr key={appt.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap max-w-[180px]">
                        <div className="flex items-center">
                          <img src={appt.avatar} alt={appt.studentName} className="w-9 h-9 rounded-full flex-shrink-0" />
                          <span className="ml-3 font-medium truncate max-w-[140px] block">{appt.studentName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{appt.appointmentDate} {appt.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap flex items-center gap-1">{sessionIcon(appt.sessionType)}{appt.sessionType}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{appt.duration} min</td>
                      <td className="px-4 py-3 whitespace-nowrap">{appt.notes}</td>
                      <td className="px-2 py-3 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <EllipsisHorizontalIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pageAppointments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{filteredAppointments.length === 0 ? 0 : (currentPage - 1) * appointmentsPerPage + 1}</span>
                {' '}to{' '}
                <span className="font-medium">{Math.min(currentPage * appointmentsPerPage, filteredAppointments.length)}</span>
                {' '}of{' '}
                <span className="font-medium">{filteredAppointments.length}</span> appointments
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totalPages).keys()].map(i => (
                  <button
                    key={i}
                    className={`px-3 py-2 text-sm rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {tab === 'approval' && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Appointment Requests</h2>
              <p className="text-gray-600">Approve or reject pending appointment requests below.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase">Patient</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase">Booked At</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase">Date &amp; Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase">Session</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase">Duration</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase">Profile (Notes)</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvalAppointments.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-400">No appointment requests pending approval.</td>
                    </tr>
                  )}
                  {approvalAppointments.map(appt => (
                    <tr key={appt.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={appt.avatar} alt={appt.studentName} className="w-9 h-9 rounded-full flex-shrink-0" />
                          <span className="ml-3 font-medium">{appt.studentName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{appt.bookedAt}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{appt.appointmentDate} {appt.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap flex items-center gap-1">
                        {sessionIcon(appt.sessionType)}
                        {appt.sessionType}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{appt.duration} min</td>
                      <td className="px-4 py-3 whitespace-nowrap">{appt.notes}</td>
                      <td className="px-4 py-3 whitespace-nowrap flex gap-2">
                        <button
                          className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                          title="Approve"
                          onClick={() => handleApprove(appt.id)}
                        >
                          <CheckCircleIcon className="w-5 h-5 mr-1" /> Approve
                        </button>
                        <button
                          className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                          title="Reject"
                          onClick={() => handleReject(appt.id)}
                        >
                          <XCircleIcon className="w-5 h-5 mr-1" /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'patients' && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">All Patients</h2>
              <p className="text-gray-600">Browse all patients with their latest appointment & notes.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Patient</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Latest Appointment</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Session</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Profile (Notes)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getPatientRows(appointments).map(patient => (
                    <tr key={patient.studentName}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={patient.avatar} alt={patient.studentName} className="w-9 h-9 rounded-full" />
                          <span className="ml-3 font-medium">{patient.studentName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{patient.appointmentDate} {patient.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap flex items-center gap-1">{sessionIcon(patient.sessionType)}{patient.sessionType}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{patient.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{formatMonth(currentDate)}</h3>
            <div className="flex items-center space-x-1">
              <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              </button>
              <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded">
                <ChevronRightIcon className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="p-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((date, idx) =>
              date ? (
                <button
                  key={idx}
                  className={`p-1 text-xs w-7 h-7 my-0.5 flex flex-col items-center justify-center rounded cursor-pointer ${
                    selectedDay === toLocalDateString(date) ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                  }`}
                  onClick={() => handleCalendarDayClick(date)}
                >
                  {date.getDate()}
                  {appointmentsByDate[toLocalDateString(date)] && (
                    <span
                      className={`w-1.5 h-1.5 mt-[2px] rounded-full block ${
                        selectedDay === toLocalDateString(date) ? 'bg-white' : 'bg-blue-400'
                      }`}
                    ></span>
                  )}
                </button>
              ) : (
                <div key={idx} />
              )
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Today's Appointments</h3>
          <div className="space-y-3">
            {appointments
              .filter(a => a.appointmentDate === todayStr())
              .map(appointment => (
                <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">{sessionIcon(appointment.sessionType)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <p className="text-sm text-gray-600 truncate">{appointment.studentName}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                </div>
              ))}
            {appointments.filter(a => a.appointmentDate === todayStr()).length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 text-sm">No appointments today</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AppointmentsPage;
