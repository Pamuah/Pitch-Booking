import React, { useState, useEffect } from "react";
import Header from "../components/navBar";
import CustomDropdown from "../components/customDropDown";
import Booking_Card from "../components/booking_Card";
import PopUpForm from "../components/openModal";
import { useGlobalContext } from "../context/global_context";
import { sendControlData } from "../api services/get_service";
import timeSlots from "../utils/TimeSlots";

const BookingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const closeModal = () => setShowModal(false);
  const { Pitchdetails, selectedDate, setSelectedTime, setSelectedDate } =
    useGlobalContext();

  const sportOptions = ["All Sports", "Football Pitch", "Tennis Volley Court"];

  const openModal = (selectedStartTime) => {
    setSelectedTime(selectedStartTime);
    setShowModal(true);
  };

  useEffect(() => {
    const fetch_Availability = async () => {
      try {
        const response = await sendControlData(
          { pitchId: Pitchdetails._id, date: selectedDate },
          `/api/bookings/availability?pitchId=${Pitchdetails._id}&date=${selectedDate}`
        );
        console.log("Raw availability response:", response);
        setBookedSlots(response.bookedSlots || []);
      } catch (err) {
        console.error("Failed to fetch availability:", err);
      }
    };

    if (Pitchdetails?._id && selectedDate) {
      fetch_Availability();
    }
  }, [Pitchdetails?._id, selectedDate]);

  // 🔍 Helper function to check overlap
  const isSlotBooked = (slotStart, slotEnd) => {
    const match = bookedSlots.some(({ startTime, endTime }) => {
      const slotMatch =
        startTime.trim() === slotStart.trim() &&
        endTime.trim() === slotEnd.trim();

      return slotMatch;
    });

    return match;
  };

  return (
    <div className="w-full text-gray-700">
      {/* Hero section... (unchanged) */}
      <div
        className="relative pt-4 px-3 w-full h-[60vh]"
        style={{
          backgroundImage: Pitchdetails?.imageUrl
            ? `url(${Pitchdetails.imageUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
        <Header />
        <div className="absolute bottom-0 z-10 text-white px-8 mb-4">
          <h1 className="text-2xl md:text-4xl font-semibold mt-16">
            Pitch Name
          </h1>
          <div className="flex items-center mb-6 mt-2">
            <p className="text-sm font-medium mr-2">Pitch location</p>
            <img
              src="../assets/call-chat.png"
              alt="call chat"
              className="w-5 h-5 mx-2"
            />
            <p className="text-sm font-medium">Contact info</p>
          </div>
        </div>
      </div>

      {/* Date + Sport Filters */}
      <div className="mt-8 px-6 max-w-5xl mx-auto flex flex-row items-center justify-center mb-6 gap-x-8">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-gray-100 text-sm border border-gray-300 px-2 py-2 rounded-md shadow-sm w-48"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Sport
          </label>
          <CustomDropdown
            options={sportOptions}
            defaultOption="All Sports"
            onSelect={(option) => console.log(option)}
          />
        </div>

        <div className="flex flex-row items-center gap-x-1.5">
          <div className="w-2 h-2 rounded-full bg-lime-400"></div>
          <p className="text-xs font-medium">Available Slots</p>
        </div>

        <div className="flex flex-row items-center gap-x-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <p className="text-xs font-medium">Unavailable Slots</p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="bg-gray-100 p-6 rounded-md shadow-sm">
        <p className="text-lg font-semibold mb-2">Choose a Specific Time</p>

        {selectedDate ? (
          <div className="grid grid-cols-4 gap-4">
            {timeSlots.map((time) => {
              const isBooked = isSlotBooked(time.startTime, time.endTime);
              return (
                <Booking_Card
                  key={time.id}
                  startTime={time.startTime}
                  endTime={time.endTime}
                  minutesPerBooking={time.minutesPerBooking}
                  amount={time.amount}
                  disabled={isBooked}
                  onBookClick={() => !isBooked && openModal(time.startTime)}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Please select a date to view time slots.
          </p>
        )}

        <PopUpForm show={showModal} onClose={closeModal} />
      </div>
    </div>
  );
};

export default BookingPage;
