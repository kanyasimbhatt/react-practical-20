import type { Product } from "../../Types/ProductType";
import { axiosInstance } from "../axiosInstance";

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const storeProducts = async (data: Product) => {
  const response = await axiosInstance.post("/products", data);
  return response.data;
};

export const editProducts = async (data: Product) => {
  const response = await axiosInstance.put(`/products/${data.id}`, data);
  return response.data;
};

export const deleteProducts = async (productId: string) => {
  const response = await axiosInstance.delete(`/products/${productId}`);
  return response.data;
};
