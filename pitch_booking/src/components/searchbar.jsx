import React from "react";
import { useGlobalContext } from "../context/global_context";

function SearchBar() {
  const { selectedDate, setSelectedDate } = useGlobalContext();
  return (
    <div className="relative z-20 bg-gray-100 px-2 py-1.5 rounded-full flex items-center h-10 justify-center w-full shadow-md">
      {/* Location Input */}
      <input
        type="text"
        placeholder="📍 Location"
        className="bg-transparent  md:text-sm font-medium outline-none text-gray-600 px-2 flex-1 hidden md:flex"
      />

      <input
        type="text"
        placeholder="Location"
        className="bg-transparent text-xs font-normal outline-none text-gray-600 px-2 flex-1 md:hidden"
      />

      {/* Divider (optional) */}
      <span className="mx-2 text-gray-600">|</span>

      {/* Date Input */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="bg-transparent text-xs font-medium outline-none text-gray-500 px-2"
      />

      {/* Search Icon */}
      <button className="ml-4 bg-white p-1.5 rounded-full shadow">🔍</button>
    </div>
  );
}

export default SearchBar;
