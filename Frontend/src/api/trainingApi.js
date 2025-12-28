import axiosInstance from "./axiosInstance";

/* ================= OWNER ================= */

// Owner assigns class to member
export const createTrainingSession = async (data) => {
  const res = await axiosInstance.post("/training", data);
  return res.data;
};

// Owner views all schedules
export const getAllTrainingSessions = async () => {
  const res = await axiosInstance.get("/training");
  return res.data;
};

/* ================= TRAINER ================= */

// Trainer views own sessions
export const getTrainerTrainingSessions = async () => {
  const res = await axiosInstance.get("/training/trainer");
  return res.data;
};

// Trainer marks session as completed
export const markTrainingCompleted = async (sessionId) => {
  const res = await axiosInstance.patch(
    `/training/${sessionId}/complete`
  );
  return res.data;
};
