import { lazy, Suspense } from "react";
import { Stack, LinearProgress } from "@mui/material";
import { type Product } from "../../../Types/ProductType";

type ChildrenType = {
  products: Product[];
};

const RenderProducts = ({ products }: ChildrenType) => {
  const ProductCard = lazy(() => import("../ProductCard/ProductCard"));
  return (
    <>
      <Stack
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        flexGrow={1}
        gap={"50px"}
        justifyContent={"center"}
        marginTop={"100px"}
        marginBottom={"50px"}
      >
        {products.map((product: Product) => (
          <Suspense fallback={<Loading />} key={product.id}>
            <ProductCard product={product} />
          </Suspense>
        ))}
      </Stack>
    </>
  );
};

export const Loading = () => {
  return <LinearProgress />;
};

export default RenderProducts;