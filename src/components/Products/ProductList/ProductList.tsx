import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ProductListUI from "./ProductListUI";
import { fetchProducts } from "../../../Services/Product/ProductService";

export default function ProductList() {
  const { data } = useQuery({
    queryKey: ["products/fetch-products"],
    queryFn: fetchProducts,
    enabled: true,
    placeholderData: [],
  });

  return (
    <>
      {data.length === 0 ? (
        <Typography
          marginTop={"100px"}
          textAlign="center"
          variant="h5"
          fontWeight={"bold"}
        >
          No Products Yet!
        </Typography>
      ) : (
        <ProductListUI products={data || []} />
      )}
    </>
  );
}