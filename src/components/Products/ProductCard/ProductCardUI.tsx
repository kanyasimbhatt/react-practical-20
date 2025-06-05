import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {
    Card,
    Button,
    Typography,
} from "@mui/material";
import { type Product } from "../../../Types/ProductType";

type ChildrenType = {
    product: Product;
    handleDelete: (productId: string) => void;
    handleEdit: (productId: string) => void;
};

const ProductCard = ({
    product,
    handleDelete,
    handleEdit
}: ChildrenType) => {

    return (
        <Card
            sx={{ maxWidth: 300, boxShadow: "0 0 10px  #bfbfbf" }}
            key={product.id}
        >

            <CardContent sx={{ height: 170, width: 220 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                </Typography>
                <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {product.description}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Price: &#8377;{product.price}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Category: {product.category}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Brand: {product.brand}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleEdit(product.id)}>
                    Edit
                </Button>
                <Button size="small" onClick={() => handleDelete(product.id)}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;