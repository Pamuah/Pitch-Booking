import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PostData = async (data, endpoint) => {
  try {
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not defined");
    }

    console.log("Sending to:", `${API_BASE_URL}${endpoint}`);
    console.log("Payload:", data);

    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error.response?.data || error.message);
    throw error;
  }
};
