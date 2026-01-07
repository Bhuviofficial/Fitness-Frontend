import axios from "axios";

const API = axios.create({
  baseURL: "https://fitness-backend-1-1gej.onrender.com"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
