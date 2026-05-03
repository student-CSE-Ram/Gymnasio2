import axiosInstance from "./axiosInstance";

// Owner Login
export const ownerLogin = async (data) => {
  const res = await axiosInstance.post("/auth/owner/login", data);
  return res.data;
};

// User Login (trainer + member)
export const userLogin = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

// Forgot Password (send email)
export const forgotPassword = async (email) => {
  const res = await axiosInstance.post("/auth/forgot-password", {
    email,
  });
  return res.data;
};

// Reset Password (token + new password)
export const resetPassword = async ({ token, password }) => {
  const res = await axiosInstance.post("/auth/reset-password", {
    token,
    password,
  });
  return res.data;
};