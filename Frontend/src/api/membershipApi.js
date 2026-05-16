import axios from "axios";

const API = "http://localhost:5000/api/membership";

export const createMembership = async (data) => {

  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getMyMemberships = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};