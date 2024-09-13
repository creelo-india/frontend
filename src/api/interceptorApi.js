import axios from "axios";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

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
