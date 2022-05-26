import API from "./AxiosInstance";

const route = "/api/prescription";
// appointment
export const fetchAllPrescriptions = () => API.get(`${route}/view`);

export const fetchPrescriptionById = (formData) => API.get(`${route}/get/${formData.params}`);

export const createPrescription = (formData) => API.post(`${route}/add`, formData.body);

export const updatePrescription = (formData) =>
  API.put(`${route}/update/${formData.params}`, formData.body);

export const deletePrescription = (formData) => API.delete(`${route}/delete/${formData.params}`);
