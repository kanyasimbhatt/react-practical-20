import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductListUI from "./ProductListUI";
import { MainInstance } from "../../../Services/axiosInstance";
import { setProducts } from "../../../store/Products/productSlice";

const fetchProducts = async () => {
  try {
    const response = await MainInstance.get("/products");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default function ProductList() {
  const { data } = useQuery({
    queryKey: ["get-products"],
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
        <ProductListUI products={data || []} />
      )}
    </>
  );
}
