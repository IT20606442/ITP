import API from "./AxiosInstance";

const route = "/api/appointment";
// appointment
export const fetchAllAppointments = () => API.get(`${route}/view`);

export const fetchAppointmentById = (formData) => API.get(`${route}/get/${formData.params}`);

export const createAppointment = (formData) => API.post(`${route}/add`, formData.body);

export const updateAppointment = (formData) =>
  API.put(`${route}/update/${formData.params}`, formData.body);

export const deleteAppointment = (formData) => API.delete(`${route}/delete/${formData.params}`);
