import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sendControlData } from "../api services/get_service";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [paymentData, setPaymentData] = useState();

  // ✅ Time formatter (24hr -> 12hr with AM/PM)
  const formatTimeWithAmPm = (time24) => {
    if (!time24) return "N/A";

    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minutes = minuteStr || "00";

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;

    return `${hour}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    if (!reference) return;

    const fetchBooking = async () => {
      try {
        const response = await sendControlData(
          {},
          `/api/bookings/reference/${reference}`
        );
        setPaymentData(response.data);
        console.log("Payment data:", response.data);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
      }
    };

    fetchBooking();
  }, [reference]);

  console.log("Payment data222:", paymentData);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">
          Payment Successful
        </h2>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase! A confirmation email has been sent to
          your inbox.
        </p>

        <div className="mt-6 border-t pt-4 text-left text-sm text-gray-500 space-y-1">
          <p>
            <strong>Booker's Name:</strong> {paymentData?.teamName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {paymentData?.email || "N/A"}
          </p>
          <p>
            <strong>Transaction Reference:</strong>{" "}
            {paymentData?.bookingCode || "N/A"}
          </p>
          <p>
            <strong>Time:</strong> {formatTimeWithAmPm(paymentData?.startTime)}{" "}
            - {formatTimeWithAmPm(paymentData?.endTime)}
          </p>
          <p>
            <strong>Amount:</strong> {paymentData?.totalCost || "N/A"}
          </p>
          <p>
            <strong>Date:</strong> {paymentData?.date || "N/A"}
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
