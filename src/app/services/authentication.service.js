import api from "../lib/axios";
import { setFullname, setToken } from "../lib/authToken";
export const register = async (data) => {
  const response = await api.post("/api/Authentication/userRegistration", data);
  return response?.data;
};
export const login = async (data) => {
  const response = await api.post("/api/Authentication/appLogin", data);
  // ✅ Token save karo
  if (response?.data?.token) {
    setToken(response?.data?.token);
    setFullname(response?.data?.data?.FullName);
  }
  return response?.data;
};
export const forgetPassword = async (data) => {
  const response = await api.post("/api/Authentication/forgotPassword", data);
  return response?.data;
};
export const fetchCountry = async () => {
  const { data } = await api.get("/api/Authentication/getAllCountry");
  return data?.data;
};
export const sendOtp = async (data) => {
  const response = await api.post("/api/Authentication/sendOtp", data);
  return response?.data;
};
