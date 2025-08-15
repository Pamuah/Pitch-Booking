import React from "react";
import { useGlobalContext } from "../context/global_context";
import { PostData } from "../api services/post_service";

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

      console.log("Booking response:", response, success, message, paymentUrl);

      if (success && paymentUrl) {
        console.log("Booking success. Redirecting to:", paymentUrl);
        onClose(); // Close modal before redirecting
        window.location.href = paymentUrl; // Redirect to Paystack
      } else {
        alert("Booking failed: " + message);
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
        <h2 className="text-xl font-semibold mb-4">Enter Your Info</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={bookerInfo?.name || ""}
          onChange={(e) =>
            setBookerInfo({ ...bookerInfo, name: e.target.value })
          }
          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={bookerInfo?.email || ""}
          onChange={(e) =>
            setBookerInfo({ ...bookerInfo, email: e.target.value })
          }
          className="w-full p-2 mb-2 border text-sm border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={bookerInfo?.contact || ""}
          onChange={(e) =>
            setBookerInfo({ ...bookerInfo, contact: e.target.value })
          }
          className="w-full p-2 mb-4 border text-sm border-gray-300 rounded"
        />
        <button
          onClick={() => {
            triggerApi();
          }}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PopUpForm;
