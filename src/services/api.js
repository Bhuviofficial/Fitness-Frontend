import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-url.onrender.com"
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
