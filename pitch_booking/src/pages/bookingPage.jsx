import React, { useState } from "react";
import Header from "../components/navBar";
import CustomDropdown from "../components/customDropDown";
import Booking_Card from "../components/booking_Card";
import PopUpForm from "../components/openModal";

const BookingPage = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const sportOptions = ["All Sports", "Football Pitch", "Tennis Volley Court"];
  return (
    <div className="w-full text-gray-700">
      {/* 🔷 Section 1: Hero with background */}
      <div
        className="relative pt-4 px-3 w-full h-[60vh]"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* black overlay */}
        <div className="absolute inset-0 z-0 bg-black opacity-60"></div>

        {/* Navbar */}
        <Header />

        {/* Text content on image */}
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

      {/* 🔷 Section 2: Content area below */}

      <div className="mt-8 px-6 max-w-5xl mx-auto flex flex-row mb-6 gap-x-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Date
          </label>
          <input
            type="date"
            className="bg-gray-100 text-sm border border-gray-300 px-2 py-2 rounded-md shadow-sm w-48"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Date
          </label>
          <CustomDropdown
            options={sportOptions}
            defaultOption="All Sports"
            onSelect={(option) => console.log(option)}
          />
        </div>
      </div>

      {/* Add more components below */}

      <div className="bg-gray-100 p-6 rounded-md shadow-sm">
        <p className="text-lg font-semibold mb-2">Choose a Specific Time</p>

        <div className="grid grid-cols-4 gap-4">
          <Booking_Card onBookClick={openModal} />
          <Booking_Card onBookClick={openModal} />
          <Booking_Card onBookClick={openModal} />
          <Booking_Card />
          <Booking_Card />
          <Booking_Card />
          <Booking_Card />
          <Booking_Card />
          <Booking_Card />
          <Booking_Card />
          <Booking_Card />
          <Booking_Card />
        </div>
        <PopUpForm show={showModal} onClose={closeModal} />
      </div>
    </div>
  );
};

export default BookingPage;
