import { useNavigate } from 'react-router-dom';
import { type Product } from '../../../Types/ProductType';
import ProductCardUI from './ProductCardUI';
import { useMutation } from '@tanstack/react-query';
import { deleteProducts } from '../../../Services/Product/ProductService';
import { useProducts } from '../ProductsProvider';

type ChildrenType = {
  product: Product;
};

const ProductCardLogic = ({ product }: ChildrenType) => {
  const navigate = useNavigate();
  const {products, setProducts} = useProducts();
  const mutation = useMutation({
    mutationFn: (productId: string) => deleteProducts(productId),
    onError: (err) => console.log(err) 
  })

  const handleDelete = (productId: string) => {
    mutation.mutate(productId);
    const index = products.findIndex((product: Product) => product.id === productId);
    products.splice(index, 1);
    setProducts([...products]);

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