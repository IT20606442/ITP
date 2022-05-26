import API from "./AxiosInstance";

const route = "/api/profiles";
// appointment
export const fetchAllVets = () => API.get(`${route}/view`);

export const fetchVetById = (formData) => API.get(`${route}/get/${formData.params}`);

export const createVet = (formData) => API.post(`${route}/add`, formData.body);

export const updateVet = (formData) => API.put(`${route}/update/${formData.params}`, formData.body);

export const deleteVet = (formData) => API.delete(`${route}/delete/${formData.params}`);
