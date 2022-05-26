import axios from "axios";

const baseURL = "http://localhost:8070/";

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || null;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// export const refreshToken = (formData) =>
//   API.get("/api/users/refreshtoken", formData);

// API.interceptors.response.use(undefined, (err) => {
//   const currentUserDetails = JSON.parse(localStorage.getItem("userDetails"));
//   const error = err.response;
//   if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
//     const params = {
//       params: {
//         token: localStorage.getItem("token"),
//         refreshToken:
//           localStorage.getItem("refreshToken") || currentUserDetails?.refreshToken,
//         userId: currentUserDetails.userId,
//       },
//     };
//     return refreshToken(params).then((response) => {
//       localStorage.setItem("token", response?.data?.token);
//       localStorage.setItem("refreshToken", response?.data?.refreshToken);
//       // update the error config with new token
//       error.config.__isRetryRequest = true;
//       error.config.params["token"] = response?.data?.token;
//       return API(error.config);
//     });
//   }
// });

export default API;
