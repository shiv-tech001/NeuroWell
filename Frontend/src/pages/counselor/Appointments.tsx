import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
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
  ClockIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Appointment {
  id: number;
  studentName: string;
  avatar: string;
  bookedAt: string;
  appointmentDate: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | string;
  type: string;
  sessionType: 'Video' | 'Audio' | 'Chat' | string;
  duration: number;
  notes: string;
}

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

const initialAppointments: Appointment[] = [
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
      return <VideoCameraIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 inline-block mr-1" />;
    case 'Audio':
      return <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 inline-block mr-1" />;
    case 'Chat':
      return <ChatBubbleLeftRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 inline-block mr-1" />;
    default:
      return null;
  }
};

const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get today's date in the demo context (September 15, 2025)
const getTodayDate = () => '2025-09-15';

const getPatientRows = (appointments: Appointment[]) => {
  const map = new Map<string, Appointment>();
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

// Calendar helper functions
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

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // September 2025
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [tab, setTab] = useState<'appointments' | 'patients' | 'approval'>('appointments');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize with today's date but don't lock it
  useEffect(() => {
    setSelectedDay(getTodayDate());
  }, []);

  const appointmentsByDate = appointments.reduce((acc, appt) => {
    const apptDate = appt.appointmentDate;
    if (!acc[apptDate]) acc[apptDate] = [];
    acc[apptDate].push(appt);
    return acc;
  }, {} as Record<string, Appointment[]>);

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

  // Fixed: Allow proper toggling of selected days
  const handleCalendarDayClick = (date: Date) => {
    const dstr = toLocalDateString(date);
    // Toggle selection: if clicking the same date, deselect it; otherwise select the new date
    setSelectedDay(prev => prev === dstr ? null : dstr);
    setCurrentPage(1);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Fixed: Proper month navigation
  const navigateMonth = (dir: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + dir, 1);
      return newDate;
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

  // Helper function to check if a date is today (for demo purposes)
  const isToday = (dateStr: string) => dateStr === getTodayDate();

  // Mobile card component for appointments
  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img 
            src={appointment.avatar} 
            alt={appointment.studentName} 
            className="w-10 h-10 rounded-full border-2 border-gray-200" 
          />
          <div>
            <h3 className="font-semibold text-gray-900">{appointment.studentName}</h3>
            <p className="text-sm text-gray-600">{appointment.type}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Date & Time:</span>
          <span className="font-medium">{appointment.appointmentDate} {appointment.time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Session:</span>
          <div className="flex items-center">
            {sessionIcon(appointment.sessionType)}
            <span className="font-medium">{appointment.sessionType}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">{appointment.duration} min</span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="text-gray-700 text-sm">{appointment.notes}</p>
        </div>
      </div>
    </div>
  );

  // Mobile card component for approval appointments
  const ApprovalCard = ({ appointment }: { appointment: Appointment }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img 
            src={appointment.avatar} 
            alt={appointment.studentName} 
            className="w-10 h-10 rounded-full border-2 border-gray-200" 
          />
          <div>
            <h3 className="font-semibold text-gray-900">{appointment.studentName}</h3>
            <p className="text-sm text-gray-600">{appointment.type}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Date & Time:</span>
          <span className="font-medium">{appointment.appointmentDate} {appointment.time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Session:</span>
          <div className="flex items-center">
            {sessionIcon(appointment.sessionType)}
            <span className="font-medium">{appointment.sessionType}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">{appointment.duration} min</span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="text-gray-700 text-sm">{appointment.notes}</p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 font-medium"
          onClick={() => handleApprove(appointment.id)}
        >
          <CheckCircleIcon className="w-4 h-4 mr-2" />
          Approve
        </button>
        <button
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
          onClick={() => handleReject(appointment.id)}
        >
          <XCircleIcon className="w-4 h-4 mr-2" />
          Reject
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Main content area */}
      <div className="flex-1 flex flex-col max-w-full lg:max-w-7xl mx-auto py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        {/* Tab navigation */}
        <div className="mb-6 sm:mb-8 flex gap-2 sm:gap-4 border-b overflow-x-auto">
          <button
            className={`py-2 px-3 sm:px-4 outline-none flex items-center gap-1 sm:gap-2 font-semibold border-b-2 whitespace-nowrap text-sm sm:text-base ${
              tab === 'appointments'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setTab('appointments')}
          >
            <ClipboardDocumentListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Appointments
          </button>
          <button
            className={`py-2 px-3 sm:px-4 outline-none flex items-center gap-1 sm:gap-2 font-semibold border-b-2 whitespace-nowrap text-sm sm:text-base ${
              tab === 'approval'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-purple-600'
            }`}
            onClick={() => setTab('approval')}
          >
            <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Appointment</span> Approval
          </button>
          <button
            className={`py-2 px-3 sm:px-4 outline-none flex items-center gap-1 sm:gap-2 font-semibold border-b-2 whitespace-nowrap text-sm sm:text-base ${
              tab === 'patients'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setTab('patients')}
          >
            <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">All</span> Patients
          </button>
        </div>

        {tab === 'appointments' && (
          <>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Booked Appointments</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">
                  View today's appointments or select a date to filter. Calendar marks dates with appointments.
                </p>
              </div>
            </div>

            {/* Search and filter controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search client..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">Type</span>
                <select
                  value={typeFilter}
                  onChange={e => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
                >
                  <option value="All">All</option>
                  <option value="Video">Video Call</option>
                  <option value="Audio">Audio Call</option>
                  <option value="Chat">Chat</option>
                </select>
              </div>
            </div>

            {/* Desktop table view - hidden on mobile */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap max-w-[180px]">Patient</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase whitespace-nowrap">Date & Time</th>
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

            {/* Mobile card view - visible on mobile and tablet */}
            <div className="lg:hidden">
              {pageAppointments.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-400 shadow-sm border border-gray-200">
                  No appointments found.
                </div>
              ) : (
                pageAppointments.map(appt => (
                  <AppointmentCard key={appt.id} appointment={appt} />
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
              <div className="text-sm text-gray-700 text-center sm:text-left">
                Showing{' '}
                <span className="font-medium">{filteredAppointments.length === 0 ? 0 : (currentPage - 1) * appointmentsPerPage + 1}</span>
                {' '}to{' '}
                <span className="font-medium">{Math.min(currentPage * appointmentsPerPage, filteredAppointments.length)}</span>
                {' '}of{' '}
                <span className="font-medium">{filteredAppointments.length}</span> appointments
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {totalPages > 0 && [...Array(Math.min(totalPages, 5)).keys()].map(i => {
                  const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      className={`px-3 py-2 text-sm rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Appointment Requests</h2>
              <p className="text-gray-600 text-sm sm:text-base">Approve or reject pending appointment requests below.</p>
            </div>
            
            {/* Desktop approval table */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ minWidth: '800px' }}>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase w-1/5 min-w-[180px]">Patient</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase w-1/5 min-w-[150px]">Date & Time</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase w-1/6 min-w-[120px]">Session</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase w-1/12 min-w-[80px]">Duration</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase w-1/3 min-w-[200px]">Profile (Notes)</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase w-1/6 min-w-[120px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {approvalAppointments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center">
                            <ClockIcon className="w-12 h-12 text-gray-300 mb-3" />
                            <p className="text-lg font-medium">No appointment requests pending approval</p>
                            <p className="text-sm text-gray-500 mt-1">New requests will appear here when submitted</p>
                          </div>
                        </td>
                      </tr>
                    )}
                    {approvalAppointments.map(appt => (
                      <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center min-w-0">
                            <img src={appt.avatar} alt={appt.studentName} className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-gray-200" />
                            <div className="ml-3 min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">{appt.studentName}</p>
                              <p className="text-xs text-gray-500 mt-1">{appt.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-gray-900 font-medium">{appt.appointmentDate}</p>
                            <p className="text-sm text-gray-600">{appt.time}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            {sessionIcon(appt.sessionType)}
                            <span className="text-gray-900">{appt.sessionType}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-gray-900 font-medium">{appt.duration} min</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="max-w-xs">
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2" title={appt.notes}>
                              {appt.notes}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="inline-flex items-center justify-center w-9 h-9 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                              title="Approve"
                              onClick={() => handleApprove(appt.id)}
                            >
                              <CheckCircleIcon className="w-5 h-5" />
                            </button>
                            <button
                              className="inline-flex items-center justify-center w-9 h-9 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              title="Reject"
                              onClick={() => handleReject(appt.id)}
                            >
                              <XCircleIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile approval cards */}
            <div className="lg:hidden">
              {approvalAppointments.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-400 shadow-sm border border-gray-200">
                  <ClockIcon className="w-12 h-12 text-gray-300 mb-3 mx-auto" />
                  <p className="text-lg font-medium">No appointment requests pending approval</p>
                  <p className="text-sm text-gray-500 mt-1">New requests will appear here when submitted</p>
                </div>
              ) : (
                approvalAppointments.map(appt => (
                  <ApprovalCard key={appt.id} appointment={appt} />
                ))
              )}
            </div>
          </>
        )}

        {tab === 'patients' && (
          <>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">All Patients</h2>
              <p className="text-gray-600 text-sm sm:text-base">Browse all patients with their latest appointment & notes.</p>
            </div>

            {/* Desktop patients table */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
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

            {/* Mobile patients cards */}
            <div className="lg:hidden">
              {getPatientRows(appointments).map(patient => (
                <div key={patient.studentName} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src={patient.avatar} 
                      alt={patient.studentName} 
                      className="w-10 h-10 rounded-full border-2 border-gray-200" 
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.studentName}</h3>
                      <p className="text-sm text-gray-600">{patient.type}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Latest Appointment:</span>
                      <span className="font-medium">{patient.appointmentDate} {patient.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Session:</span>
                      <div className="flex items-center">
                        {sessionIcon(patient.sessionType)}
                        <span className="font-medium">{patient.sessionType}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-700 text-sm">{patient.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Calendar Sidebar - FIXED VERSION */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-40 w-80 bg-white border-l border-gray-200 p-4 sm:p-6 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0
      `}>
        {/* Mobile overlay */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setSidebarOpen(false)}
        />
        
        <div className="relative z-10 h-full overflow-y-auto">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{formatMonth(currentDate)}</h3>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => navigateMonth(-1)} 
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                </button>
                <button 
                  onClick={() => navigateMonth(1)} 
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="p-1 font-medium">{d}</div>
              ))}
            </div>
            
            {/* Calendar Grid - FIXED */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((date, idx) =>
                date ? (
                  <button
                    key={idx}
                    className={`p-1 text-xs w-7 h-7 sm:w-8 sm:h-8 my-0.5 flex flex-col items-center justify-center rounded cursor-pointer transition-colors ${
                      selectedDay === toLocalDateString(date) 
                        ? 'bg-blue-600 text-white' 
                        : appointmentsByDate[toLocalDateString(date)]
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : isToday(toLocalDateString(date))
                            ? 'bg-gray-200 text-gray-900 font-semibold'
                            : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => handleCalendarDayClick(date)}
                    title={`${toLocalDateString(date)} ${appointmentsByDate[toLocalDateString(date)] ? `- ${appointmentsByDate[toLocalDateString(date)].length} appointments` : ''}`}
                  >
                    <span className="text-xs">{date.getDate()}</span>
                    {appointmentsByDate[toLocalDateString(date)] && (
                      <span
                        className={`w-1 h-1 rounded-full block mt-0.5 ${
                          selectedDay === toLocalDateString(date) ? 'bg-white' : 'bg-blue-500'
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  <div key={idx} className="w-7 h-7 sm:w-8 sm:h-8" />
                )
              )}
            </div>
            
            {/* Selected Date Info */}
            {selectedDay && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  Selected: {new Date(selectedDay + 'T12:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {appointmentsByDate[selectedDay] && (
                  <p className="text-xs text-blue-700 mt-1">
                    {appointmentsByDate[selectedDay].length} appointment{appointmentsByDate[selectedDay].length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}

            {/* Clear Selection Button */}
            {selectedDay && (
              <div className="mt-3">
                <button
                  onClick={() => setSelectedDay(null)}
                  className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Selection (Show All)
                </button>
              </div>
            )}
          </div>
          
          {/* Today's Appointments */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Today's Appointments</h3>
            <div className="space-y-3">
              {appointments
                .filter(a => a.appointmentDate === getTodayDate() && a.status === 'Confirmed')
                .map(appointment => (
                  <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0">{sessionIcon(appointment.sessionType)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-sm text-gray-600 truncate">{appointment.studentName}</p>
                      <p className="text-xs text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                ))}
              {appointments.filter(a => a.appointmentDate === getTodayDate() && a.status === 'Confirmed').length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-sm">No appointments today</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AppointmentsPage;
