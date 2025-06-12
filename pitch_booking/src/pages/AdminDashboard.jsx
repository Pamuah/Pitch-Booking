
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import {
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
  ClipboardCheck
} from "lucide-react";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showBankForm, setShowBankForm] = useState(false);
  
  // Mock data for the dashboard
  const mockStats = {
    revenue: { today: 1240, week: 8420, month: 32500 },
    bookings: { today: 8, week: 42, month: 186 },
    occupancy: { today: "65%", week: "72%", month: "68%" },
    reviews: { average: 4.5, total: 128 }
  };

  const upcomingBookings = [
    { id: 1, team: "SoftMasters Team", date: "Today, 3:30 PM", pitch: "Pitch A", duration: "2 hours" },
    { id: 2, team: "Local Youth Team", date: "Tomorrow, 10:00 AM", pitch: "Pitch B", duration: "1.5 hours" },
    { id: 3, team: "Corporate Event", date: "Friday, 6:00 PM", pitch: "Pitch A", duration: "3 hours" },
    { id: 4, team: "University League", date: "Saturday, 2:00 PM", pitch: "Main Pitch", duration: "4 hours" },
  ];

  const recentReviews = [
    { id: 1, user: "Samuel Addo", rating: 5, comment: "Great facilities and well-maintained pitches!", date: "2 days ago" },
    { id: 2, user: "Kofi Boateng", rating: 4, comment: "Good experience but changing rooms could be cleaner", date: "5 days ago" },
    { id: 3, user: "Sika Brown", rating: 5, comment: "Perfect for our weekly games. Will book again!", date: "1 week ago" },
  ];

  const pitchStatus = [
    { name: "Pitch A", status: "Available", nextBooking: "Today, 3:30 PM" },
    { name: "Pitch B", status: "In Use", nextBooking: "Tomorrow, 10:00 AM" },
    { name: "Main Pitch", status: "Maintenance", nextBooking: "Saturday, 2:00 PM" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AdminLayout>
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Pitch Owner!</h2>
            <p className="text-gray-600 mb-4">
              Here's what's happening with your pitches today.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/admin/bookings" className="flex items-center space-x-2 px-4 py-2 hover:text-white text-black rounded-lg hover:bg-black">
                <Plus size={18} />
                <span>New Booking</span>
              </Link>

              <Link to="/admin/pitches" className="flex items-center space-x-2 px-4 py-2 hover:text-white text-black rounded-lg hover:bg-black">
                <Edit size={18} />
                <span>Manage Pitches</span>
              </Link>

              <Link to="/admin/reviews" className="flex items-center space-x-2 px-4 py-2 hover:text-white text-black rounded-lg hover:bg-black">
                <FileText size={18} />
                <span>Reviews</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Today's Revenue</h3>
                <CreditCard className="text-green-300" size={20} />
              </div>
              <p className="text-2xl font-bold">${mockStats.revenue.today.toLocaleString()}</p>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Today</span>
                <span className="text-green-500 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +12%
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Today's Bookings</h3>
                <Calendar className="text-blue-500" size={20} />
              </div>
              <p className="text-2xl font-bold">{mockStats.bookings.today}</p>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Today</span>
                <span className="text-blue-500 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +5%
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Occupancy Rate</h3>
                <ClipboardCheck className="text-purple-500" size={20} />
              </div>
              <p className="text-2xl font-bold">{mockStats.occupancy.today}</p>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Today</span>
                <span className="text-purple-500 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +8%
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-yellow-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Average Rating</h3>
                <Star className="text-yellow-500" size={20} />
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-bold">{mockStats.reviews.average}</p>
                <span className="text-sm text-gray-500 ml-2">({mockStats.reviews.total} reviews)</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Overall</span>
                <span className="text-yellow-500 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +0.2
                </span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Bookings */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="mr-2 text-green-300" size={20} />
                Upcoming Bookings
              </h2>

              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <h3 className="font-medium">{booking.team}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <Clock size={14} className="mr-2" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin size={14} className="mr-2" />
                      <span>{booking.pitch}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span className="mr-2">⏱️</span>
                      <span>{booking.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/admin/bookings" className="text-green-300 text-sm mt-4 hover:underline flex items-center">
                View all bookings
                <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Star className="mr-2 text-green-300" size={20} />
                Recent Reviews
              </h2>

              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="flex items-start">
                    <div className="bg-gray-100 rounded-full p-2 mr-3">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/admin/reviews" className="text-green-300 text-sm mt-4 hover:underline flex items-center">
                View all reviews
                <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>

            {/* Pitch Status */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="mr-2 text-green-300" size={20} />
                Pitch Status
              </h2>

              <div className="space-y-3">
                {pitchStatus.map((pitch, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium">{pitch.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Status: <span className={pitch.status === "Available" ? "text-green-500" : pitch.status === "In Use" ? "text-blue-500" : "text-yellow-500"}>{pitch.status}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Next booking:</p>
                      <p className="text-sm">{pitch.nextBooking}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/admin/pitches" className="text-green-300 text-sm mt-4 hover:underline flex items-center">
                View all pitches
                <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Revenue Chart Section */}
          <div className="bg-white rounded-lg p-6 shadow mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <BarChart className="mr-2 text-green-300" size={20} />
                Revenue Overview
              </h2>
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last year</option>
              </select>
            </div>

            {/* Placeholder for chart */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400">
              Revenue Chart Placeholder
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-600 text-sm">Today's Revenue</p>
                <p className="font-bold text-lg">${mockStats.revenue.today.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-600 text-sm">This Week</p>
                <p className="font-bold text-lg">${mockStats.revenue.week.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-600 text-sm">This Month</p>
                <p className="font-bold text-lg">${mockStats.revenue.month.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;