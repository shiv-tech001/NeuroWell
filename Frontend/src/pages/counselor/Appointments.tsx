import React, { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

const AppointmentsPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 9)); // July 9, 2024
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      studentName: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      time: '9:00 AM - 10:00 AM',
      date: 'July 15, 2024',
      status: 'Confirmed',
      type: 'Individual Session',
      notes: 'Follow-up on anxiety management techniques'
    },
    {
      id: 2,
      studentName: 'David Lee',
      avatar: '/api/placeholder/40/40',
      time: '10:30 AM - 11:30 AM',
      date: 'July 15, 2024',
      status: 'Pending',
      type: 'Group Therapy',
      notes: 'First session for stress management group'
    },
    {
      id: 3,
      studentName: 'Emily Rodriguez',
      avatar: '/api/placeholder/40/40',
      time: '2:00 PM - 3:00 PM',
      date: 'July 16, 2024',
      status: 'Confirmed',
      type: 'Crisis Intervention',
      notes: 'Emergency consultation requested'
    },
    {
      id: 4,
      studentName: 'Michael Johnson',
      avatar: '/api/placeholder/40/40',
      time: '3:30 PM - 4:30 PM',
      date: 'July 16, 2024',
      status: 'Cancelled',
      type: 'Individual Session',
      notes: 'Student requested reschedule'
    },
    {
      id: 5,
      studentName: 'Lisa Wang',
      avatar: '/api/placeholder/40/40',
      time: '11:00 AM - 12:00 PM',
      date: 'July 17, 2024',
      status: 'Confirmed',
      type: 'Assessment',
      notes: 'Initial psychological assessment'
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      time: '9:00 AM',
      student: 'Sarah Chen',
      type: 'Individual Session'
    },
    {
      id: 2,
      time: '10:30 AM',
      student: 'David Lee',
      type: 'Group Therapy'
    },
    {
      id: 3,
      time: '2:00 PM',
      student: 'Emily Rodriguez',
      type: 'Crisis Intervention'
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, 0 - (startingDayOfWeek - 1 - i));
      days.push({ date: prevDate.getDate(), isCurrentMonth: false });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, isCurrentMonth: true });
    }

    // Add days from next month to complete the grid
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ date: i, isCurrentMonth: false });
    }

    return days;
  };

  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
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

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || appointment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-50">
   
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Appointments List Section */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
              <p className="text-gray-600 mt-1">Manage your student sessions and bookings</p>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <PlusIcon className="w-4 h-4" />
              <span>New Appointment</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={appointment.avatar}
                            alt={appointment.studentName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.studentName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {appointment.notes}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-600">
                          <EllipsisHorizontalIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAppointments.length}</span> of{' '}
              <span className="font-medium">{appointments.length}</span> appointments
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          {/* Mini Calendar */}
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
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="p-1">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`p-1 text-xs text-center cursor-pointer rounded hover:bg-gray-100 ${
                    day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  } ${day.date === 9 && day.isCurrentMonth ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                >
                  {day.date}
                </div>
              ))}
            </div>
          </div>

          {/* Today's Appointments */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Today's Appointments</h3>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <p className="text-sm text-gray-600 truncate">{appointment.student}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                </div>
              ))}
            </div>

            {upcomingAppointments.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 text-sm">No appointments today</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Profile */}
      <div className="fixed bottom-4 left-4">
        <div className="flex items-center space-x-3 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <img
            src="/api/placeholder/40/40"
            alt="Dr. Ramirez"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">Dr. Ramirez</p>
            <p className="text-sm text-gray-600">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;