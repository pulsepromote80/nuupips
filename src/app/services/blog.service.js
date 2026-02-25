import api from "../lib/axios";

export const fetchBlogById = async (id) => {
  const response = await api.get(`/api/Blog/getUserBlogByBlogId?BlogId=${id}`);

  return response?.data?.data[0] ?? null; // 👈 MUST RETURN
};
export const fetchBlogs = async () => {
  const { data } = await api.get("/api/Blog/getUserBlog");
  return data?.data;
};
export const addComment = async (data) => {
  const response = await api.post("/api/Blog/addUserComments", data);
  return response?.data;
};
export const getCommentsByBlogId = async (id) => {
  const response = await api.get(`/api/Blog/getCommentsByBlogId?BlogId=${id}`);

  return response?.data?.data ?? null; // 👈 MUST RETURN
};