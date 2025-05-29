export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
};

export type InputObject = {
  products: Array<Product>;
};
