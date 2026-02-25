import api from "../lib/axios";

export const addQuery = async (data) => {
  const response = await api.post("/api/Blog/addUserQuery", data);
  return response?.data;
};