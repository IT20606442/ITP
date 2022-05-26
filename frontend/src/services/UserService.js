import API from "./AxiosInstance";

const route = "/api/users";
// appointment
export const fetchAllUsers = () => API.get(`${route}/view`);

export const createUser = (formData) => API.post(`${route}/add`, formData.body);

export const updateUser = (formData) =>
  API.put(`${route}/update/${formData.params}`, formData.body);

export const deleteUser = (formData) => API.delete(`${route}/delete/${formData.params}`);
