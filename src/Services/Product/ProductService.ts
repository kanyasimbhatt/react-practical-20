import type { Product } from "../../Types/ProductType";
import { MainInstance } from "../axiosInstance";

export const fetchProducts = async () => {
    try {
      const response = await MainInstance.get("/products");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

export const storeProducts = async (data: Product) => {
        const response = await MainInstance.post('/products', data);
        return response.data
}

export const editProducts = async (data: Product) => {
    console.log(data)
        const response = await MainInstance.put(`/products/${data.id}`, data);
        return response.data;
}