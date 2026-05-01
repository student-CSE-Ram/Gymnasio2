// import axios from 'axios'

// const axiosInstance = axios.create({
//     baseURL:'http://localhost:5000/api',
//     headers:{"Content-Type":"application/json"},
// });

// axiosInstance.interceptors.request.use((config)=>{
//     const token = localStorage.getItem('token');
//     if (token) config.headers.Authorization = `Bearer ${token}`
//     return config;
// });
// export default axiosInstance;

import axios from 'axios';

// Determine base URL for local vs production
const baseURL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL   // local backend
  : import.meta.env.VITE_API_URL_RENDER; // Render backend

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
