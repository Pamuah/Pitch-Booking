import React from "react";

const CustomCard = ({
  imageSrc = "https://via.placeholder.com/150",
  pitchName = "Pitch Perfect",
  pitchType = "Standard",
  ratingText = "Highly Rated",
  reviews = "1,999 reviews",
  price = "40GHC",
  showBookButton = true,
  onBookClick,
}) => {
  return (
    <div className="bg-black opacity-70 rounded-xl shadow-md p-2 flex gap-2 items-center w-full hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <img
        src={imageSrc}
        alt="pitch"
        className="w-35 h-28 object-cover rounded-md"
      />

      {/* Info Section */}
      <div className="flex flex-col justify-between flex-grow gap-y-1">
        <h2 className="text-lg font-normal text-white text">{pitchName}</h2>
        <p className="text-xs font-light text-gray-100">Type: {pitchType}</p>
        <p className="text-xs font-light text-gray-100">
          {ratingText} • {reviews}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-2">
        {showBookButton ? (
          <button
            onClick={onBookClick}
            className="bg-lime-300 text-black px-4 py-1.5 rounded-md text-sm hover:bg-lime-500"
          >
            Book
          </button>
        ) : null}
        <span className="bg-gray-200 text-black font-normal px-2 py-1 rounded-full text-sm">
          {price}
        </span>
      </div>
    </div>
  );
};

export default CustomCard;
