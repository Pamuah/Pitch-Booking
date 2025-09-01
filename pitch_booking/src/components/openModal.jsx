import React from "react";
import { useGlobalContext } from "../context/global_context";
import { PostData } from "../api services/post_service";
import { Mail, User, Phone } from "lucide-react";

const PopUpForm = ({ show, onClose }) => {
  const {
    bookerInfo,
    setBookerInfo,
    Pitchdetails,
    selectedDate,
    selectedTime,
  } = useGlobalContext();

  const data = {
    teamName: bookerInfo?.name || "",
    pitchId: Pitchdetails?._id || "",
    email: bookerInfo?.email || "",
    phoneNumber: bookerInfo?.contact || "",
    duration: 2,
    totalCost: Pitchdetails?.pricePerHour || 0,
    date: selectedDate || "",
    startTime: selectedTime || "",
  };

  const triggerApi = async () => {
    try {
      console.log("Booking data being sent:", data);
      const response = await PostData(data, "/api/bookings");

      const success = response.success;
      const message = response.message;
      const paymentUrl = response.paymentUrl;

      if (success && paymentUrl) {
        setBookerInfo({
          name: "",
          email: "",
          contact: "",
        });

        if (success && paymentUrl) {
          console.log("Booking success. Redirecting to:", paymentUrl);
          onClose(); // Close modal before redirecting
          window.location.href = paymentUrl; // Redirect to Paystack
        } else {
          alert("Booking failed: " + message);
        }
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Enter Details to Book</h2>

        {/* Name input with User icon */}
        <div className="relative mb-2">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Your Name"
            value={bookerInfo?.name || ""}
            onChange={(e) =>
              setBookerInfo({ ...bookerInfo, name: e.target.value })
            }
            className="w-full pl-9 p-2 text-sm border border-gray-300 rounded"
          />
        </div>

        {/* Email input with Mail icon */}
        <div className="relative mb-2">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={bookerInfo?.email || ""}
            onChange={(e) =>
              setBookerInfo({ ...bookerInfo, email: e.target.value })
            }
            className="w-full pl-9 p-2 text-sm border border-gray-300 rounded"
          />
        </div>

        {/* Phone input with Phone icon */}
        <div className="relative mb-4">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Phone Number"
            value={bookerInfo?.contact || ""}
            onChange={(e) =>
              setBookerInfo({ ...bookerInfo, contact: e.target.value })
            }
            className="w-full pl-9 p-2 text-sm border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={triggerApi}
          className="w-full bg-lime-400 text-white py-2 rounded-sm hover:bg-lime-600"
        >
          Continue
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-500 hover:underline hover:text-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PopUpForm;
