import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../Types/ProductType";
import { dummyJsonInstance } from "../../Services/axiosInstance";

type ProductStore = {
  products: Product[];
};

const initialProduct: ProductStore = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchUsers",
  async () => {
    try {
      const response = await dummyJsonInstance.get("/products");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const ProductSlice = createSlice({
  name: "productSlice",
  initialState: initialProduct,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default ProductSlice.reducer;
