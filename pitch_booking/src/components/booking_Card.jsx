import React from "react";
import CustomButton from "./customButton";

const Booking_Card = ({
  startTime = "6:00am - 8:00am",
  minutesPerBooking = "2hrs/120mins",
  amount = "400.00 GHC",
  onBookClick,
}) => {
  return (
    <div className="relative z-10 rounded-md p-3 bg-white shadow-md ">
      <div className="flex flex-row justify-between">
        <img
          src="../assets/stopwatch.png"
          alt="Stop Watch"
          className="w-10 h-10"
        />
        <div className="flex flex-col gap-y-0.5 text-gray-600 text-sm ">
          <h2>{startTime}</h2>
          <p>{minutesPerBooking}</p>
          <p className="text-normal font-semibold text-gray-800">{amount}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <CustomButton
          title={"Book Pitch"}
          onPress={onBookClick}
          className="min-h-10 min-w-32 text-sm font-mono rounded-none shadow-md bg-lime-300 "
        />
      </div>
    </div>
  );
};

export default Booking_Card;
