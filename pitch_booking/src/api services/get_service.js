import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendControlData = async (params, endpoint) => {
  try {
   

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      params: params,
    });
    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
