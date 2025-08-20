import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { sendControlData } from "../api services/get_service";
import { useGlobalContext } from "../context/global_context";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  X,
  MessageSquare,
  FileText,
  Edit,
} from "lucide-react";

const BookingsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showBookingDetails, setShowBookingDetails] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const { bookings, setBookings } = useGlobalContext();
  const { adminBookingInfo, setAdminBookingInfo } = useGlobalContext();

  useEffect(() => {
    const fetch_Bookings = async () => {
      try {
        const response = await sendControlData({}, "/api/owner/bookings", true);
        console.log("Bookings response:", response);
        setAdminBookingInfo(response.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetch_Bookings();
  }, []);

  // const filteredBookings =
  //   activeFilter === "all"
  //     ? bookings
  //     : bookings.filter(
  //         (booking) => booking.status.toLowerCase() === activeFilter
  //       );

  const handleMarkAsCompleted = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Completed" } : booking
      )
    );
    setShowBookingDetails(null);
  };

  const handleCancelBooking = (id) => {
    setBookings(
      bookings.map((booking) =>
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
      bookings.map((booking) =>
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
              <h1 className="text-2xl font-bold mb-4 md:mb-0">
                Booking Management
              </h1>
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Team/Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date & Time
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Payment
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adminBookingInfo.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {booking.pitchId.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking.teamName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(booking.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${
                              booking.status === "pending"
                                ? "bg-blue-100 text-blue-600"
                                : booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : booking.status === "expired"
                                ? "bg-gray-100 text-gray-800"
                                : booking.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 mt-1">
                            ${booking.totalCost}
                          </div>
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
                        <p className="font-medium">
                          {showBookingDetails.teamName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Booking Code</p>
                        <p className="font-medium">
                          {showBookingDetails.bookingCode}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Contact</p>
                        <p className="font-medium">
                          {showBookingDetails.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="font-medium">
                          {showBookingDetails.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="font-medium">
                          {new Date(showBookingDetails.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Time</p>
                        <p className="font-medium">
                          {showBookingDetails.startTime} -{" "}
                          {showBookingDetails.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Duration</p>
                        <p className="font-medium">
                          {showBookingDetails.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Pitch</p>
                        <p className="font-medium">
                          {showBookingDetails.pitchId.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Status</p>
                        <p className="font-medium">
                          {showBookingDetails.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Payment</p>
                        <p className="font-medium">
                          {showBookingDetails.paystackRef}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Amount</p>
                        <p className="font-medium">
                          ${showBookingDetails.totalCost}
                        </p>
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
                          onClick={() =>
                            handleMarkAsCompleted(showBookingDetails.id)
                          }
                          className="px-3 py-1.5 bg-green-300 text-black rounded hover:bg-green-400 text-sm flex items-center"
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Mark Completed
                        </button>
                        <button
                          onClick={() =>
                            handleCancelBooking(showBookingDetails.id)
                          }
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
                      {new Date(rescheduleBooking?.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}{" "}
                      at {rescheduleBooking?.time}
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
