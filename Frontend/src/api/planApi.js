import axiosInstance from "./axioaInstance";

// ADMIN
export const createPlan = async (data) => {
  const res = await axiosInstance.post("/plan/createPlan", data);
  return res.data;
};

// MEMBER / ADMIN
export const getAllPlans = async () => {
  const res = await axiosInstance.get("/plan/getAllPlans");
  return res.data;
};
export const getMyPlans = async () => {
  const res = await axiosInstance.get("/plan/my-plans");
  return res.data;
};
// ADMIN
export const updatePlanByName = async (name, data) => {
  const res = await axiosInstance.put(
    `/plan/updatePlan/${encodeURIComponent(name)}`,
    data
  );
  return res.data;
};

// ADMIN
export const deletePlanByName = async (name) => {
  const res = await axiosInstance.delete(
    `/plan/delete/by-name/${encodeURIComponent(name)}`
  );
  return res.data;
};
