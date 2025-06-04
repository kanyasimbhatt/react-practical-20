import axios from "axios";

export const MainInstance = axios.create({
  baseURL: `https://react-practical-20-backend.onrender.com`,
  headers: {
    "Content-Type": "application/json",
  },
});

MainInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
  }
);

MainInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
);
