import axiosInstance from "./axiosInstance";

/* ================= CREATE CLASS ================= */
export const createClass = async (data) => {
  const res = await axiosInstance.post("/class/create", data);
  return res.data;
};

/* ================= GET ALL CLASSES ================= */
export const getAllClasses = async () => {
  const res = await axiosInstance.get("/class/all");
  return res.data;
};

/* ================= UPDATE CLASS ================= */
export const updateClass = async (id, data) => {
  const res = await axiosInstance.put(`/class/update/${id}`, data);
  return res.data;
};

/* ================= DELETE CLASS ================= */
export const deleteClass = async (id) => {
  const res = await axiosInstance.delete(`/class/delete/${id}`);
  return res.data;
};

/* ================= ASSIGN MEMBER ================= */
export const assignMemberToClass = async (classId, memberId) => {
  const res = await axiosInstance.post(`/class/${classId}/assign-member`, { memberId });
  return res.data;
};

/* ================= GET MY BOOKED CLASSES ================= */
export const getMyClasses = async () => {
  const res = await axiosInstance.get("/class/my-classes");
  return res.data;
};
