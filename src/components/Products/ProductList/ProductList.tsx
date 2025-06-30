import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import ProductListUI from "./ProductListUI";
import { fetchProducts } from "../../../Services/Product/ProductService";
import { useProducts } from "../ProductsProvider";

export default function ProductList() {
  const { products, setProducts } = useProducts();

  const { data } = useQuery({
    queryKey: ["products/fetch-products"],
    queryFn: fetchProducts,
    enabled: true,
    placeholderData: [],
  });

  useEffect(() => {
    setProducts(data);
  }, [data]);

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
        <ProductListUI products={products} />
      )}
    </>
  );
}
