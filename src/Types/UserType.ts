import type { Product } from "./ProductType";

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  favorites: Product[];
};
