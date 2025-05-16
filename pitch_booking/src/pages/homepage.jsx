import React from "react";

import CustomDropdown from "../components/customDropDown";
import CustomCard from "../components/pitch_card";
import Header from "../components/navBar";

const HomePage = () => {
  const sportOptions = ["All Sports", "Football Pitch", "Tennis Volley Court"];
  return (
    <div className="relative min-h-screen w-full pt-4 px-3">
      {/* navbar */}
      <Header />
      {/* the dropdown for filtering */}
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-col gap-y-2 bg-white shadow-xl sticky top-0 z-20 min-h-48 w-64 rounded-lg p-4  ">
          <h5 className="text-sm font-medium text mb-2">Filter results</h5>
          <CustomDropdown
            options={sportOptions}
            defaultOption="All Sports"
            onSelect={(option) => console.log(option)}
          />
          <CustomDropdown
            options={sportOptions}
            defaultOption="All Sports"
            onSelect={(option) => console.log(option)}
          />
          <CustomDropdown
            options={sportOptions}
            defaultOption="All Sports"
            onSelect={(option) => console.log(option)}
          />
        </div>
        {/* search results  */}
        <div className="flex flex-col">
          <h1 className="font-medium text-2xl mb-5">Pitches Near You</h1>

          <div className="grid grid-cols-2 gap-3">
            <CustomCard
              imageSrc="https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              pitchName="Old Trafford Pitch"
              pitchType="5-A-Side"
              ratingText="Top Rated"
              reviews="120 reviews"
              price="35 GHC"
              showBookButton={true}
              onBookClick={() => alert("Booked!")}
            />

            <CustomCard
              imageSrc="https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              pitchName="Stamford Bridge"
              pitchType="5-A-Side"
              ratingText="Top Rated"
              reviews="120 reviews"
              price="35 GHC"
              showBookButton={true}
              onBookClick={() => alert("Booked!")}
            />

            <CustomCard
              imageSrc="https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              pitchName="Emirates Stadium"
              pitchType="5-A-Side"
              ratingText="Top Rated"
              reviews="120 reviews"
              price="35 GHC"
              showBookButton={true}
              onBookClick={() => alert("Booked!")}
            />
            <CustomCard
              imageSrc="https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              pitchName="Spotify Campnou"
              pitchType="5-A-Side"
              ratingText="Top Rated"
              reviews="120 reviews"
              price="35 GHC"
              showBookButton={true}
              onBookClick={() => alert("Booked!")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
