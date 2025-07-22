// services/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const patchData = async (endpoint, data, token, isForm = false) => {
  const fullUrl = `${BASE_URL}${endpoint}`;
  console.log("🔗 PATCH URL being hit:", fullUrl);

  // Important: let Axios handle Content-Type if it's FormData
  const headers = {
    Authorization: `Bearer ${token}`,
    ...(isForm ? {} : { "Content-Type": "application/json" }),
  };

  const payload = isForm ? data : JSON.stringify(data);

  try {
    const response = await axios.patch(fullUrl, payload, { headers });
    return response.data;
  } catch (error) {
    console.error("PATCH error:", error.response?.data || error.message);
    throw error;
  }
};
