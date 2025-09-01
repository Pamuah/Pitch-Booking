import React, { createContext, useContext, useState } from "react";

// This is the shape of the deceased info (just comment instead of types)
const globalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const today = new Date().toISOString().split("T")[0];
  const [bookerInfo, setBookerInfo] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState();
  const [Pitchdetails, setPitchdetails] = useState();
  const [adminBookingInfo, setAdminBookingInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <globalContext.Provider
      value={{
        bookerInfo,
        setBookerInfo,
        Pitchdetails,
        setPitchdetails,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        adminBookingInfo,
        setAdminBookingInfo,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
