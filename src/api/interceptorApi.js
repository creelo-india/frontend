import axios from "axios";
import { CONFIG } from "./config"; 

// Create an Axios instance with dynamic base URL from config.js
const axiosClient = axios.create({
  baseURL: CONFIG.BASE_URL, 
  headers: {
    "Content-Type": "application/json", 
  },
})

// Request interceptor
// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log("token ge sucefully and saved")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log("token saved sucefully")
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response interceptor
// axiosClient.interceptors.response.use(
  
//   (response) => response,
  
//   (error) => {
//     if (error.response) {
//       const { status, data } = error.response;
//       switch (status) {
//         case 200:
//           console.log("sucess")
//           // Optionally handle success response if needed
//           break;
//         case 404:
//           console.error("Resource not found:", data.message || "The requested resource was not found.");
//           break;
//         case 400:
//           console.error("Bad request:", data.message || "Invalid input data.");
//           break;
//         default:
//           console.error("An unexpected error occurred:", data.message || "Something went wrong.");
//       }
//     } else if (error.request) {
//       console.error("No response received:", error.request);
//     } else {
//       console.error("Error message:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
