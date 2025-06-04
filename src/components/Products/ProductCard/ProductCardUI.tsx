import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import {
  Card,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import { type Product } from "../../../Types/ProductType";
import DialogButton from "../DialogButton/DialogButton";

type ChildrenType = {
  product: Product;
  share: boolean;
  handleShare: (productId: string) => void;
  productIdSelected: string;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductCard = ({
  product,
  share,
  handleShare,
  productIdSelected,
  setShowShare,
}: ChildrenType) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  return (
    <Card
      sx={{ maxWidth: 300, boxShadow: "0 0 10px  #bfbfbf" }}
      key={product.id}
    >
      <CardMedia
        sx={{ height: 340 }}
        image={URL.createObjectURL(product.image!)}
        title={product.title}
      />
      <CardContent sx={{ height: 160 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleShare(product.id)}>
          Share
        </Button>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          fullWidth
          open={share}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Share Product
          </DialogTitle>

          <DialogContent dividers>
            <Typography variant="h6" gap={3} textAlign={"center"}>
              Copy Link to Clipboard
              <DialogButton
                share={share}
                setShowShare={setShowShare}
                productIdSelected={productIdSelected}
              />
            </Typography>
          </DialogContent>
        </BootstrapDialog>

        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;