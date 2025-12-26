import axiosInstance from "./axioaInstance";

export const createOrder = async (planId) => {
  const res = await axiosInstance.post("/payments/create-order", { planId });
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await axiosInstance.post("/payments/verify-payment", data);
  return res.data;
};

// MEMBER / ADMIN: get all payments for a member (or for admin, all payments)
export const getMyPayments = async () => {
  const res = await axiosInstance.get("/payments/my-payments");
  return res.data;
};

export const capturePayment = async (data) => {
  const res = await axiosInstance.post("/payments/capture", data);
  return res.data;
};
