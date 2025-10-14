import axiosInstance from "./axioaInstance";


// Member APIs
export const getAllMembers = async () => {
  const res = await axiosInstance.get("/owner/all-members");
  return res.data;
};

export const createMember = async (data) => {
  const res = await axiosInstance.post("/owner/create-member", data);
  return res.data;
};

// Trainer APIs
export const getAllTrainers = async () => {
  const res = await axiosInstance.get("/owner/all-trainers");
  return res.data;
};

export const createTrainer = async (data) => {
  const res = await axiosInstance.post("/owner/create-trainer", data);
  return res.data;
};

// Delete any user (member or trainer)
export const deleteUser = async (data) => {
  const res = await axiosInstance.delete("/owner/delete-user", { data });
  return res.data;
};
