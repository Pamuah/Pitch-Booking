import React from "react";
import Header from "../components/navBar";
import { useNavigate } from "react-router-dom";
// import {motion} from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-h-screen w-full pt-4 px-3"
      style={{
        backgroundImage: "url('/assets/landing_image.jpeg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* black overlay over the image */}
      <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
      {/* Navbar */}
      <Header />

      {/* text on the background */}
      <div className="relative z-10 text-center justify-center items-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-5 mt-16 ">
          Easy Pitch Booking
        </h1>
        <p className="text-sm md:text-xl font-light px-8 mb-5 ">
          It's time to simplify your sports booking. Easy for users to book,
          easy for you to manage. Online booking software trusted by many sports
          facilities in Ghana
        </p>
        <button
          onClick={() => navigate("/homepage")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
