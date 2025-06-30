import type { User } from "../../Types/UserType";
import { axiosInstance } from "../axiosInstance";

export const storeUserData = async (data: User) => {
  const response = await axiosInstance.post("/users", data);
  return response.data;
};

export const fetchUserData = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
