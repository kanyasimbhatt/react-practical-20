import { useNavigate } from 'react-router-dom';
import { type Product } from '../../../Types/ProductType';
import ProductCardUI from './ProductCardUI';

type ChildrenType = {
  product: Product;
};

const ProductCardLogic = ({ product }: ChildrenType) => {
    const navigate = useNavigate();
  

  const handleDelete = (productId: string) => {
    
  };

  const handleEdit = (productId: string) => {
    navigate(`/edit-product/${productId}`)

  }
  return (
    <ProductCardUI
      product={product}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      
    />
  );
};

export default ProductCardLogic;