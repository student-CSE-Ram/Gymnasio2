import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export const getMyProfile = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};