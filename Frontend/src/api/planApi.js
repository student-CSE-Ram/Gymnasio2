import axiosInstance from "./axioaInstance";

export const createPlan = async (data) =>{
    const res = await axiosInstance.post('/plan/createPlan',data)
    return res.data
};

export const getAllPlans = async (data) => {
    const res = await axiosInstance.get('/plan/getAllPlans')
    return res.data
};

export const updatePlan = async (data) => {
    const res = await axiosInstance.put('/plan/updatePlan/:name',data)
    return res.data
}

export const deletePlanByName = async (data) =>{
    const res = await axiosInstance.delete(`/plan/delete/by-name/${encodeURIComponent(name)}`);
    return res.data
}