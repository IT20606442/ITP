import API from "./AxiosInstance";

const route = "/api/article";
// appointment
export const fetchAllArticles = () => API.get(`${route}/view`);

export const fetchArticleById = (formData) => API.get(`${route}/get/${formData.params}`);

export const createArticle = (formData) => API.post(`${route}/add`, formData.body);

export const updateArticle = (formData) =>
  API.put(`${route}/update/${formData.params}`, formData.body);

export const deleteArticle = (formData) => API.delete(`${route}/delete/${formData.params}`);
