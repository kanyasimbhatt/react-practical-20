import axios from "axios";

export const MainInstance = axios.create({
  baseURL: `https://react-practical-20-backend.onrender.com`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const dummyJsonInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
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

dummyJsonInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    throw new Error(error);
  }
);

dummyJsonInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      console.log(error.response.message);
    }

    throw new Error(error);
  }
);
