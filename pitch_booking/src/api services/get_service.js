import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendControlData = async (params, endpoint, useAuth = false) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // making auth optional 
    if (useAuth) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage");
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers,
      params,
    });

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error.response?.data || error.message);
    throw error;
  }
};
