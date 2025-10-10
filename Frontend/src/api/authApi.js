// src/api/authApi.js
import axiosInstance from "./axioaInstance";

export const ownerLogin = async (data) => {
  const res = await axiosInstance.post("/auth/owner/login", data);
  return res.data;
};


export const trainerLogin = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};
