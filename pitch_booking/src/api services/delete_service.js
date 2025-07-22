import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteData = async (endpoint, token) => {
  const fullUrl = `${BASE_URL}${endpoint}`;
  console.log("🗑️ DELETE URL being hit:", fullUrl);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.delete(fullUrl, { headers });
    return response.data;
  } catch (error) {
    console.error("DELETE error:", error.response?.data || error.message);
    throw error;
  }
};
