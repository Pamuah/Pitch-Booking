import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import {
  Users,
  Calendar,
  Clock,
  CreditCard,
  BarChart,
  User,
  ChevronRight,
  MapPin,
  FileText,
  Plus,
  Edit,
  Star,
  TrendingUp,
  ClipboardCheck,
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Settings,
  Mail,
  MessageSquare
} from "lucide-react";

const MainAdminPage = () => {
  const [activeTab, setActiveTab] = useState("userControl");
  const [userFilter, setUserFilter] = useState("all");
  const [pitchFilter, setPitchFilter] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [requestFilter, setRequestFilter] = useState("pending");

  // Mock data
  const allUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active", joinDate: "2023-05-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "pitch_owner", status: "active", joinDate: "2023-04-22" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "user", status: "active", joinDate: "2023-06-10" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "pitch_owner", status: "pending", joinDate: "2023-07-01" },
    { id: 5, name: "David Brown", email: "david@example.com", role: "user", status: "suspended", joinDate: "2023-03-18" },
  ];

  const allPitches = [
    { id: 1, name: "Pitch A", owner: "Jane Smith", status: "available", location: "North Area", lastBooking: "2023-07-20" },
    { id: 2, name: "Pitch B", owner: "Jane Smith", status: "in_use", location: "Central Area", lastBooking: "2023-07-21" },
    { id: 3, name: "Main Pitch", owner: "Sarah Williams", status: "maintenance", location: "South Area", lastBooking: "2023-07-15" },
    { id: 4, name: "Pitch C", owner: "Sarah Williams", status: "available", location: "East Area", lastBooking: "2023-07-18" },
  ];

  const allBookings = [
    { id: 1, user: "John Doe", pitch: "Pitch A", date: "2023-07-22", time: "14:00 - 16:00", status: "confirmed" },
    { id: 2, user: "Mike Johnson", pitch: "Pitch B", date: "2023-07-23", time: "10:00 - 12:00", status: "completed" },
    { id: 3, user: "David Brown", pitch: "Main Pitch", date: "2023-07-25", time: "18:00 - 20:00", status: "pending" },
    { id: 4, user: "John Doe", pitch: "Pitch C", date: "2023-07-26", time: "15:00 - 17:00", status: "cancelled" },
  ];

  const allRequests = [
    { id: 1, user: "John Doe", pitch: "Pitch A", currentDate: "2023-07-22", newDate: "2023-07-24", reason: "Team unavailable", status: "pending" },
    { id: 2, user: "Mike Johnson", pitch: "Pitch B", currentDate: "2023-07-23", newDate: "2023-07-24", reason: "Weather concerns", status: "approved" },
    { id: 3, user: "Sarah Williams", pitch: "Main Pitch", currentDate: "2023-07-25", newDate: "2023-07-26", reason: "Pitch maintenance", status: "rejected" },
  ];

  const adminComments = [
    { id: 1, admin: "System Admin", comment: "User John Doe has been warned about late cancellations", date: "2023-07-18" },
    { id: 2, admin: "System Admin", comment: "Pitch A maintenance scheduled for next week", date: "2023-07-15" },
    { id: 3, admin: "Super Admin", comment: "All pitch owners need to update their contact information", date: "2023-07-10" },
  ];

  const filteredUsers = allUsers.filter(user => {
    if (userFilter === "all") return true;
    if (userFilter === "users") return user.role === "user";
    if (userFilter === "owners") return user.role === "pitch_owner";
    if (userFilter === "pending") return user.status === "pending";
    if (userFilter === "suspended") return user.status === "suspended";
    return true;
  });

  const filteredPitches = allPitches.filter(pitch => {
    if (pitchFilter === "all") return true;
    if (pitchFilter === "available") return pitch.status === "available";
    if (pitchFilter === "in_use") return pitch.status === "in_use";
    if (pitchFilter === "maintenance") return pitch.status === "maintenance";
    return true;
  });

  const filteredBookings = allBookings.filter(booking => {
    if (bookingFilter === "all") return true;
    return booking.status === bookingFilter;
  });

  const filteredRequests = allRequests.filter(request => {
    if (requestFilter === "all") return true;
    return request.status === requestFilter;
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "userControl":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">User Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <Filter size={16} className="text-gray-600" />
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="bg-transparent text-sm focus:outline-none"
                  >
                    <option value="all">All Users</option>
                    <option value="users">Regular Users</option>
                    <option value="owners">Pitch Owners</option>
                    <option value="pending">Pending Approval</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User size={16} className="text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "pitch_owner" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {user.role === "pitch_owner" ? "Pitch Owner" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "active" ? "bg-green-100 text-green-800" :
                          user.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Settings size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertCircle className="mr-2 text-yellow-500" size={20} />
                  Pending Requests
                </h3>
                <div className="space-y-4">
                  {filteredRequests.filter(r => r.status === "pending").map(request => (
                    <div key={request.id} className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{request.user}</p>
                          <p className="text-sm text-gray-600">{request.pitch}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-green-600 hover:text-green-800">
                            <CheckCircle2 size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Current:</span> {request.currentDate}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Requested:</span> {request.newDate}
                      </p>
                      <p className="text-sm mt-1 text-gray-600">
                        <span className="font-medium">Reason:</span> {request.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="mr-2 text-blue-500" size={20} />
                  Admin Comments
                </h3>
                <div className="space-y-4">
                  {adminComments.map(comment => (
                    <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                      <div className="flex justify-between">
                        <p className="font-medium">{comment.admin}</p>
                        <p className="text-sm text-gray-500">{comment.date}</p>
                      </div>
                      <p className="text-sm mt-1 text-gray-700">{comment.comment}</p>
                    </div>
                  ))}
                  <div className="mt-4">
                    <textarea
                      className="w-full border rounded-lg p-2 text-sm"
                      placeholder="Add a new comment..."
                      rows={2}
                    ></textarea>
                    <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "managePitches":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Pitch Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search pitches..."
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <Filter size={16} className="text-gray-600" />
                  <select
                    value={pitchFilter}
                    onChange={(e) => setPitchFilter(e.target.value)}
                    className="bg-transparent text-sm focus:outline-none"
                  >
                    <option value="all">All Pitches</option>
                    <option value="available">Available</option>
                    <option value="in_use">In Use</option>
                    <option value="maintenance">Under Maintenance</option>
                  </select>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  Add New Pitch
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pitch Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Booking</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPitches.map((pitch) => (
                    <tr key={pitch.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <MapPin size={16} className="text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{pitch.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitch.owner}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitch.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          pitch.status === "available" ? "bg-green-100 text-green-800" :
                          pitch.status === "in_use" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {pitch.status === "available" ? "Available" :
                           pitch.status === "in_use" ? "In Use" : "Maintenance"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitch.lastBooking}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Calendar size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Pitch Schedule</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400">
                Calendar/Schedule View Placeholder
              </div>
            </div>
          </div>
        );
      case "manageBookings":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Booking Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <Filter size={16} className="text-gray-600" />
                  <select
                    value={bookingFilter}
                    onChange={(e) => setBookingFilter(e.target.value)}
                    className="bg-transparent text-sm focus:outline-none"
                  >
                    <option value="all">All Bookings</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pitch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User size={16} className="text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.user}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.pitch}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                          booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          booking.status === "completed" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Booking Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">Total Bookings</p>
                    <p className="text-2xl font-bold">142</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800">Confirmed</p>
                    <p className="text-2xl font-bold">118</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">Pending</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-800">Cancelled</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center text-gray-400">
                  Revenue Chart Placeholder
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    
     <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
  {/* Horizontal Top Panel */}
  <div className="w-full bg-white border-b border-gray-200">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-xl font-bold">Admin Control Panel</h2>
    </div>
    <nav className="flex flex-wrap px-4 py-2 space-x-4">
      <button
        onClick={() => setActiveTab("userControl")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${
          activeTab === "userControl" ? "bg-black text-white" : "hover:bg-gray-100"
        }`}
      >
        <Users size={18} />
        <span>User Control</span>
      </button>
      <button
        onClick={() => setActiveTab("managePitches")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${
          activeTab === "managePitches" ? "bg-black text-white" : "hover:bg-gray-100"
        }`}
      >
        <MapPin size={18} />
        <span>Manage Pitches</span>
      </button>
      <button
        onClick={() => setActiveTab("manageBookings")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${
          activeTab === "manageBookings" ? "bg-black text-white" : "hover:bg-gray-100"
        }`}
      >
        <Calendar size={18} />
        <span>Manage Bookings</span>
      </button>
      <button
        onClick={() => setActiveTab("systemSettings")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${
          activeTab === "systemSettings" ? "bg-black text-white" : "hover:bg-gray-100"
        }`}
      >
        <Settings size={18} />
        <span>System Settings</span>
      </button>
    </nav>
  </div>

  {/* Main Content */}
  <main className="flex-1 overflow-y-auto p-4 md:p-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
        {activeTab === "userControl" && "User Control"}
        {activeTab === "managePitches" && "Pitch Management"}
        {activeTab === "manageBookings" && "Booking Management"}
        {activeTab === "systemSettings" && "System Settings"}
      </h1>
      <div className="flex items-center space-x-4">
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center">
          <Mail size={16} className="mr-1" />
          Messages
        </button>
      </div>
    </div>

    {/* Tab Content */}
    {renderTabContent()}
  </main>
</div>


  );
};

export default MainAdminPage;