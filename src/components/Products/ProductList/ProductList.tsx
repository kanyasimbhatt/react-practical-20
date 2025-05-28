import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ProductListUI from "./ProductListUI";
import { fetchProducts } from "../../../store/Products/productSlice";

export default function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ["fetch-products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {}, []);

  return (
    <>
      {data.products.length === 0 && <Typography>No Products Yet!</Typography>}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ProductListUI products={data.products || []} />
      )}
    </>
  );
}
