import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import type { Product } from "../../../Types/ProductType";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editProducts,
  fetchProducts,
  storeProducts,
} from "../../../Services/Product/ProductService";

export const schema = z.object({
  id: z.string(),
  title: z.string().min(5),
  description: z.string().min(10),
  category: z.string().min(1),
  brand: z.string().min(1),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),
});

type ProductFormFields = z.infer<typeof schema>;

const AddEditForm: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["products/fetch-products"],
    queryFn: fetchProducts,
    initialData: [],
  });

  const addMutation = useMutation({
    mutationFn: (data: Product) => storeProducts(data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: Product) => editProducts(data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const productData = data.find((product: Product) => product.id === productId);

  const defaultValue = {
    id: "",
    title: "",
    description: "",
    category: "",
    brand: "",
    price: 0,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<ProductFormFields> = (data) => {
    if (!productData) addMutation.mutate({ ...data, id: crypto.randomUUID() });
    else editMutation.mutate({ ...data });
  };

  useEffect(() => {
    if (productData) {
      reset(productData);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={"column"}
        spacing={3}
        maxWidth={"800px"}
        margin={"auto"}
        marginTop={"100px"}
        padding={"40px"}
        sx={{ backgroundColor: "rgb(56, 116, 203, 0.1)" }}
        borderRadius={"7px"}
      >
        <Typography variant="h5" textAlign={"center"} fontWeight={"500"}>
          {!productData ? `Add Product` : `Edit Product`}
        </Typography>

        <TextField
          {...register("title")}
          type="text"
          label="Enter title"
          variant="outlined"
          color="primary"
          size="medium"
        />
        {errors.title && (
          <Typography color="red">{errors.title.message}</Typography>
        )}

        <TextField
          {...register("description")}
          type="text"
          label="Enter Description"
        />
        {errors.description && (
          <Typography color="red">{errors.description.message}</Typography>
        )}

        <TextField
          {...register("category")}
          type="text"
          label="Enter Category"
          variant="outlined"
          color="primary"
          size="medium"
        />
        {errors.category && (
          <Typography color="red">{errors.category.message}</Typography>
        )}

        <TextField
          {...register("price", { valueAsNumber: true })}
          type="number"
          label="Enter Price"
          variant="outlined"
          color="primary"
          size="medium"
        />
        {errors.price && (
          <Typography color="red">{errors.price.message}</Typography>
        )}

        <TextField
          {...register("brand")}
          type="text"
          label="Enter Brand"
          variant="outlined"
          color="primary"
          size="medium"
        />
        {errors.brand && (
          <Typography color="red">{errors.brand.message}</Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={
            !productData ? addMutation.isPending : editMutation.isPending
          }
        >
          {addMutation.isPending || editMutation.isPending
            ? "Loading..."
            : !productData
            ? "Add"
            : "Edit"}
        </Button>
        {errors.root && (
          <Typography color="red">{errors.root.message}</Typography>
        )}
      </Stack>
    </form>
  );
};

export default AddEditForm;
