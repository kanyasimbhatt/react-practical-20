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
    try{
        const response = await MainInstance.post('/products', data);
        return response.data
    }catch(err){
        console.log(err)
    }
}