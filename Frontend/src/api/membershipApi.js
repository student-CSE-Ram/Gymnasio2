import axiosInstance from "../api/axiosInstance";

// Create membership
export const createMembership = async (data) => {
  const res = await axiosInstance.post(
    "/membership/create",
    data
  );

  return res.data;
};

// Get logged-in user's memberships
export const getMyMemberships = async () => {
  const res = await axiosInstance.get("/membership");

  return res.data;
};