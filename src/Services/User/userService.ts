import type { User } from "../../Types/UserType";
import { MainInstance } from "../axiosInstance";

export const storeUserData = async (data: User) => {
    const response = await MainInstance.post('/users', data);
    return response.data;
  }
  
export const fetchUserData = async () => {
    const response = await MainInstance.get('/users');
    return response.data;
  }