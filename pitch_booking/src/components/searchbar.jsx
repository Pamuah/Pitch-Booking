import React from "react";

function SearchBar() {
  return (
    <div className="relative z-20 bg-gray-100 px-2 py-1.5 rounded-full flex items-center h-10 justify-center w-full shadow-md">
      {/* Location Input */}
      <input
        type="text"
        placeholder="📍 Location"
        className="bg-transparent text-sm font-medium outline-none text-gray-600 px-2 flex-1"
      />

      {/* Divider (optional) */}
      <span className="mx-2 text-gray-600">|</span>

      {/* Date Input */}
      <input
        type="date"
        className="bg-transparent text-xs font-medium outline-none text-gray-500 px-2"
      />

      {/* Search Icon */}
      <button className="ml-4 bg-white p-1.5 rounded-full shadow">🔍</button>
    </div>
  );
}

export default SearchBar;
