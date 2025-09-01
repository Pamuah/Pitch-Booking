import React, { useEffect, useState } from "react";
import CustomDropdown from "../components/customDropDown";
import CustomCard from "../components/pitch_card";
import Header from "../components/navBar";
import { sendControlData } from "../api services/get_service";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/global_context";

const HomePage = () => {
  const sportOptions = ["All Sports", "Football Pitch", "Tennis Volley Court"];
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { Pitchdetails, setPitchdetails, searchQuery } = useGlobalContext();

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const res = await sendControlData({}, "/api/pitches");
        setPitches(res.data);
        console.log("Fetched pitches:", res.data);
      } catch (err) {
        console.error("Failed to fetch pitches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, []);

  const handleSelect = (pitch) => {
    console.log("Setting pitch in context:", pitch);
    setPitchdetails(pitch);

    navigate("/bookingPage");
  };

  const filteredPitches = pitches.filter((pitch) =>
    pitch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full pt-4 px-3">
      {/* Navbar */}
      <Header />

      {/* Filter Panel + Pitches */}
      <div className="flex flex-col gap-y-3 md:flex-row gap-x-4 mt-4">
        {/* Filter Sidebar */}
        <div className="flex flex-col justify-center gap-y-2 bg-white shadow-xl md:sticky top-0 z-10 md:h-[45vh] w-64 rounded-lg p-4">
          <h5 className="text-sm font-medium mb-2">Filter results</h5>
          <CustomDropdown
            options={sportOptions}
            defaultOption="All Sports"
            onSelect={(option) => console.log("Selected Sport:", option)}
          />
          <CustomDropdown
            options={sportOptions}
            defaultOption="All Sports"
            onSelect={(option) => console.log("Selected Type:", option)}
          />
          <CustomDropdown
            options={sportOptions}
            defaultOption="All Sports"
            onSelect={(option) => console.log("Selected Location:", option)}
          />
        </div>

        {/* Pitches Section */}
        <div className="flex flex-col w-full">
          <h1 className="font-medium text-2xl mb-5">Pitches Near You</h1>

          {loading ? (
            <p>Loading pitches...</p>
          ) : pitches.length === 0 ? (
            <p>No pitches available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredPitches.map((pitch) => (
                <CustomCard
                  key={pitch._id}
                  imageSrc={pitch.imageUrl}
                  pitchName={pitch.name}
                  pitchType={pitch.type}
                  ratingText="Top Rated"
                  reviews="N/A reviews"
                  price={`${pitch.pricePerHour} GHC`}
                  showBookButton={true}
                  onBookClick={() => {
                    handleSelect(pitch);
                    alert(`Booked ${pitch.name}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
