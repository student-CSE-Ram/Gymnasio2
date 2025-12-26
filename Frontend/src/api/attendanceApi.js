import axiosInstance from "./axioaInstance";

/* ================= TRAINER ATTENDANCE ================= */

// Owner → mark trainer attendance
export const markTrainerAttendance = async (trainerId) => {
  const res = await axiosInstance.post("/attendance/trainer/mark", {
    trainerId,
  });
  return res.data;
};

// Owner → get trainer attendance history
export const getTrainerAttendance = async (trainerId) => {
  const res = await axiosInstance.get(
    `/attendance/trainer/${trainerId}`
  );
  return res.data;
};

/* ================= MEMBER ATTENDANCE ================= */

// Trainer → mark member attendance
export const markMemberAttendance = async (memberId) => {
  const res = await axiosInstance.post("/attendance/member/mark", {
    memberId,
  });
  return res.data;
};

// Trainer → get attendance of assigned members
export const getMemberAttendance = async () => {
  const res = await axiosInstance.get("/attendance/member");
  return res.data;
};
