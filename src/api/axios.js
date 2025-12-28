import axios from "axios";

const API = axios.create({
  baseURL: "https://fitness-backend-1-1gej.onrender.com/api",
 headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default API;
