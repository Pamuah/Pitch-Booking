// components/Header.js
import React from "react";
import SearchBar from "./searchbar";
import CustomButton from "./customButton";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="flex flex-row items-center bg-white shadow-xl sticky top-0 z-20 h-16 w-full rounded-lg px-6 py-2 justify-between">
      {/* Left - Logo */}
      <div className="flex-1">
        <h1 className="font-bold text-2xl">PitchBooking</h1>
      </div>

      {/* Center - Search */}
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      {/* Right - Button */}
      <div className="flex-1 flex justify-end">
        <CustomButton
          title={"Become a Partner"}
          trailingIcon={faUser}
          onPress={() => {
            console.log("clicked");
          }}
          className="min-h-10 min-w-42 text-sm font-mono shadow-md"
        />
      </div>
    </div>
  );
};

export default Header;
