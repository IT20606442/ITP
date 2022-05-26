import API from "./AxiosInstance";

const route = "/api/pet";
// appointment
export const fetchAllPets = () => API.get(`${route}/view`);

export const fetchPetById = (formData) => API.get(`${route}/get/${formData.params}`);

export const createPet = (formData) => API.post(`${route}/add`, formData.body);

export const updatePet = (formData) => API.put(`${route}/update/${formData.params}`, formData.body);

export const deletePet = (formData) => API.delete(`${route}/delete/${formData.params}`);
