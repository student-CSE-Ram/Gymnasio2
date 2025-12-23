import axiosInstance from "./axioaInstance";


// Member APIs
export const getAllMembers = async () => {
  const res = await axiosInstance.get("/ownerwork/all-members");
  return res.data;
};

export const createMember = async (data) => {
  const res = await axiosInstance.post("/ownerwork/create-member", data);
  return res.data;
};

// Trainer APIs
export const getAllTrainers = async () => {
  const res = await axiosInstance.get("/ownerwork/all-trainers");
  return res.data;
};

export const createTrainer = async (data) => {
  const res = await axiosInstance.post("/ownerwork/create-trainer", data);
  return res.data;
};

// Delete any user (member or trainer)
export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/ownerwork/delete-user/${id}`, { id });
  return res.data;
};

export const assignMemberToTrainer = async (data) => {
  const res = await axiosInstance.post("/ownerwork/assign-member-trainer", data);
  return res.data;
};
export const getTrainerMembers = async () => {
  const res = await axiosInstance.get("/ownerwork/trainer-members");
  return res.data;
};
