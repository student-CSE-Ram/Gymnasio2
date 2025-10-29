import axiosInstance from "./axioaInstance";


export const createClass = async (data) => {
    const res = await axiosInstance.post('/class/create',data)
    return res.data
}

export const getAllClasses = async (data) => {
    const res = await axiosInstance.get('/class/all',data)
    return res.data
}

export const updateClass = async (data) =>{
    const res = await axiosInstance.put('/class/update/:id',data)
    return res.data
}

export const deleteClass = async (data) =>{
    const res = await axiosInstance.delete('/class/delete/:id',data);
    return res.data
}

export const bookClass = async (data) =>{
    const res = await axiosInstance.post('/class/book/:classId',data)
    return res.data
}

export const getMyClass = async (data) => {
    const res = await axiosInstance.get('/class/my-classes',data)
    return res.data
}
