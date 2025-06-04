import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import type { Product } from "../../../Types/ProductType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProducts, storeProducts } from "../../../Services/Product/ProductService";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const schema = z.object({
    id: z.string(),
    title: z.string().min(5),
    description: z.string().min(10),
    category: z.string().min(1),
    brand: z.string().min(1),
    price: z
  .number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  })
  .positive('Price must be greater than 0'),
    image: z
        .custom<File | null>((file) => file instanceof File, {
            message: 'Image is required',
        })
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.'
        ),
});

type ProductFormFields = z.infer<typeof schema>;

export const AddEditForm: React.FC = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { data } = useQuery({
        queryKey: ['products/fetch-products'],
        queryFn: fetchProducts,
        initialData: []
    });

    const mutation = useMutation({
        mutationFn: storeProducts,
        onSuccess: () => {
            navigate('/')
        },
        onError: (error) => {
            console.log(error);
        }
    })
    const productData = data.find(
        (product: Product) => product.id === productId
    );

    const defaultValue = {
        id: "",
        title: "",
        description: "",
        category: "",
        brand: "",
        image: null
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormFields>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: defaultValue,
    });

    const onSubmit: SubmitHandler<ProductFormFields> = (data) => {
        console.log(data)
        mutation.mutate({...data, id: crypto.randomUUID()})
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

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setValue('image', file, { shouldValidate: true });
                        }
                    }}
                    style={{ marginTop: 8 }}
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