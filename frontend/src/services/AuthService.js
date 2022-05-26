import axios from "axios";

const baseURL = "http://localhost:8070/";

const API = axios.create({
  baseURL,
});

// auth
export const userLogin = (formData) => API.post("/api/users/login", formData);
export const vetLogin = (formData) => API.post("/api/profiles/login", formData);
