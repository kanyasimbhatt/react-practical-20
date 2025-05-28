export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
};

export type InputObject = {
  products: Array<Product>;
};
