import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../Types/ProductType";

type ProductStore = {
  products: Product[];
};

const initialProduct: ProductStore = {
  products: [],
};

const ProductSlice = createSlice({
  name: "productSlice",
  initialState: initialProduct,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
