import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {

  const response =
    await axiosInstance.get(
      "/users/me"
    );

  return response.data;
};