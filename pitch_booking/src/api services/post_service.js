import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PostData = async (data, endpoint, useAuth = false) => {
  try {
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not defined");
    }

    const isFormData = data instanceof FormData;

    const headers = {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };

    // optionally adding auth header if neccessary
    if (useAuth) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage");
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers,
    });

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error.response?.data || error.message);
    throw error;
  }
};
