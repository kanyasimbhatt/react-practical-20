import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User/userSlice";
import ProductReducer from "./Products/productSlice";

export const store = configureStore({
  reducer: {
    UserReducer,
    ProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
