import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Calendar, Clock, MapPin, Users, CheckCircle, X, MessageSquare, FileText, Edit } from "lucide-react";

const BookingsPage = () => {
  // Mock bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      team: "SoftMasters Team",
      customer: "Kofi Boateng",
      contact: "+234 123 456 7890",
      email: "john@example.com",
      date: "2025-05-21",
      time: "15:30",
      duration: "2 hours",
      pitch: "Pitch A",
      status: "Upcoming",
      payment: "Paid",
      amount: 240
    },
    {
      id: 2,
      team: "Local Youth Team",
      customer: "Baah Johnson",
      contact: "+234 987 654 3210",
      email: "sarah@example.com",
      date: "2025-05-22",
      time: "10:00",
      duration: "1.5 hours",
      pitch: "Pitch B",
      status: "Upcoming",
      payment: "Pending",
      amount: 150
    },
    {
      id: 3,
      team: "Corporate Event",
      customer: "Samuel Addo",
      contact: "+234 555 123 4567",
      email: "mike@example.com",
      date: "2025-05-23",
      time: "18:00",
      duration: "3 hours",
      pitch: "Pitch A",
      status: "Upcoming",
      payment: "Paid",
      amount: 360
    },
    {
      id: 4,
      team: "University League",
      customer: "Sika Brown",
      contact: "+234 111 222 3333",
      email: "emily@example.com",
      date: "2025-05-25",
      time: "14:00",
      duration: "4 hours",
      pitch: "Main Pitch",
      status: "Upcoming",
      payment: "Paid",
      amount: 800
    },
    {
      id: 5,
      team: "Weekend Tournament",
      customer: "Owen Gyasi",
      contact: "+234 444 555 6666",
      email: "alex@example.com",
      date: "2025-05-18",
      time: "09:00",
      duration: "6 hours",
      pitch: "Main Pitch",
      status: "Completed",
      payment: "Paid",
      amount: 1200
    },
    {
      id: 6,
      team: "NPA Team A",
      customer: "Ben Opoku",
      contact: "+234 777 888 9999",
      email: "james@example.com",
      date: "2025-05-19",
      time: "16:00",
      duration: "2 hours",
      pitch: "Pitch B",
      status: "Cancelled",
      payment: "Refunded",
      amount: 200
    }
  ]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [showBookingDetails, setShowBookingDetails] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");


  const filteredBookings = activeFilter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status.toLowerCase() === activeFilter);

  const handleMarkAsCompleted = (id) => {
    setBookings(
      bookings.map(booking =>
        booking.id === id ? { ...booking, status: "Completed" } : booking
      )
    );
    setShowBookingDetails(null);
  };

  const handleCancelBooking = (id) => {
    setBookings(
      bookings.map(booking =>
        booking.id === id ? { ...booking, status: "Cancelled" } : booking
      )
    );
    setShowBookingDetails(null);
  };

  const initiateReschedule = (booking) => {
    setRescheduleBooking(booking);
    setNewDate(booking.date);
    setNewTime(booking.time);
    setShowRescheduleModal(true);
  };

  const handleReschedule = () => {
    setBookings(
      bookings.map(booking =>
        booking.id === rescheduleBooking.id 
          ? { ...booking, date: newDate, time: newTime, status: "Rescheduled" } 
          : booking
      )
    );
    setShowRescheduleModal(false);
    setRescheduleBooking(null);
  };

  return (
    <AdminLayout>
      <div className="flex flex-1 overflow-hidden">
    
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">Booking Management</h1>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "all"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Bookings
                </button>
                <button
                  onClick={() => setActiveFilter("upcoming")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "upcoming"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveFilter("completed")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "completed"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setActiveFilter("cancelled")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "cancelled"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancelled
                </button>
                <button
                  onClick={() => setActiveFilter("rescheduled")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "rescheduled"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Rescheduled
                </button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team/Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pitch
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.team}</div>
                              <div className="text-sm text-gray-500">{booking.customer}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="text-sm text-gray-500">{booking.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.pitch}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${booking.status === "Upcoming" ? "bg-blue-100 text-blue-800" : 
                              booking.status === "Completed" ? "bg-green-100 text-green-800" : 
                              booking.status === "Cancelled" ? "bg-red-100 text-red-800" : 
                              "bg-yellow-100 text-yellow-800"}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${booking.payment === "Paid" ? "bg-green-100 text-green-800" : 
                              booking.payment === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                              "bg-gray-100 text-gray-800"}`}>
                            {booking.payment}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">${booking.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setShowBookingDetails(booking)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </button>
                          {booking.status === "Upcoming" && (
                            <button
                              onClick={() => handleMarkAsCompleted(booking.id)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Complete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Booking Details Modal */}
            {showBookingDetails && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Booking Details</h2>
                    <button
                      onClick={() => setShowBookingDetails(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Team</p>
                        <p className="font-medium">{showBookingDetails.team}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Customer</p>
                        <p className="font-medium">{showBookingDetails.customer}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Contact</p>
                        <p className="font-medium">{showBookingDetails.contact}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="font-medium">{showBookingDetails.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="font-medium">
                          {new Date(showBookingDetails.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Time</p>
                        <p className="font-medium">{showBookingDetails.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Duration</p>
                        <p className="font-medium">{showBookingDetails.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Pitch</p>
                        <p className="font-medium">{showBookingDetails.pitch}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Status</p>
                        <p className="font-medium">{showBookingDetails.status}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Payment</p>
                        <p className="font-medium">{showBookingDetails.payment}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Amount</p>
                        <p className="font-medium">${showBookingDetails.amount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 justify-end pt-4 border-t border-gray-200">
                    {showBookingDetails.status === "Upcoming" && (
                      <>
                        <button
                          onClick={() => {
                            initiateReschedule(showBookingDetails);
                            setShowBookingDetails(null);
                          }}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleMarkAsCompleted(showBookingDetails.id)}
                          className="px-3 py-1.5 bg-green-300 text-black rounded hover:bg-green-400 text-sm flex items-center"
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleCancelBooking(showBookingDetails.id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center"
                        >
                          <X size={16} className="mr-1" />
                          Cancel Booking
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setShowBookingDetails(null)}
                      className="px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Reschedule Modal */}
            {showRescheduleModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Reschedule Booking</h2>
                    <button
                      onClick={() => setShowRescheduleModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 mb-2">Current booking:</p>
                    <p className="font-medium">{rescheduleBooking?.team}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(rescheduleBooking?.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at {rescheduleBooking?.time}
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">New Date</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">New Time</label>
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex space-x-3 justify-end">
                    <button
                      onClick={() => setShowRescheduleModal(false)}
                      className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReschedule}
                      className="px-3 py-1.5 bg-green-300 text-black rounded hover:bg-green-400"
                    >
                      Confirm Reschedule
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default BookingsPage;
