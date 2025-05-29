import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import type { Product } from "../../../Types/ProductType";
import { z } from "zod";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { Button, Stack, TextField, Typography } from "@mui/material";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const schema = z.object({
  id: z.string(),
  title: z.string().min(5),
  description: z.string().min(10),
  category: z.string().min(1),
  brand: z.string().min(1),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type ProductFormFields = z.infer<typeof schema>;

export const AddEditForm: React.FC = () => {
  const { productId } = useParams();
  const products = useSelector(
    (state: RootState) => state.ProductReducer.products
  );
  const productData = products.find(
    (product: Product) => product.id === productId
  );

  const defaultValue = {
    id: "",
    title: "",
    description: "",
    category: "",
    brand: "",
    image: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<ProductFormFields> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (productData) reset({ ...productData });
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
        sx={{ backgroundColor: "rgb(0, 0, 0, 0.1)" }}
        borderRadius={"7px"}
      >
        <h2 className="form-title">
          {!productData ? `Add Task` : `Edit Task`}
        </h2>

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

        <TextField
          {...register("image")}
          type="file"
          variant="outlined"
          color="primary"
          size="medium"
        />
        {errors.image && (
          <Typography color="red">{errors.image.message as string}</Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : !productData ? "Add" : "Edit"}
        </Button>
        {errors.root && (
          <Typography color="red">{errors.root.message}</Typography>
        )}
      </Stack>
    </form>
  );
};
