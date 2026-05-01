import axiosInstance from "./axiosInstance";

export const getOwnerOverview = async () => {
  const res = await axiosInstance.get("/owner-dashboard/overview");
  return res.data;
};

export const getRecentPayments = async () => {
  const res = await axiosInstance.get("/owner-dashboard/recent");
  return res.data;
};