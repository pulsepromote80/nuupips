import api from "../lib/axios";

export const fetchNews = async () => {

  const { data } = await api.get("/api/Blog/getActiveUserNews");
  return data?.data;
};


export const addNews = async () => {
  
  const { data } = await api.get("/api/Blog/getActiveUserNews");
  return data?.data;
};
export const getNewsById = async (id) => {
  try {
    if (!id) return null; // safety check

    const response = await api.get(
      `/api/Blog/getUserNewsByNewsId?NewsId=${id}`,
    );

    return response?.data?.data ?? null;
  } catch (error) {
    console.error("Error fetching news by id:", error);
    return null; // SSR break nahi hoga
  }
};
