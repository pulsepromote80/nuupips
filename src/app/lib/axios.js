import axios from "axios";

const api = axios.create({
  baseURL: "https://agentondemand.ai",
  headers: {
    "Content-Type": "application/json",
  },
});

// Example interceptor
api.interceptors.request.use((config) => {
  console.log("API Call:", config.url);
  return config;
});

export default api;