import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../Types/ProductType";
import { MainInstance } from "../../Services/axiosInstance";

type ProductStore = {
  products: Product[];
};

const initialProduct: ProductStore = {
  products: [],
};

export const fetchProducts = async () => {
  try {
    const response = await MainInstance.get("/products");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const ProductSlice = createSlice({
  name: "productSlice",
  initialState: initialProduct,
  reducers: {},
});

export default ProductSlice.reducer;
