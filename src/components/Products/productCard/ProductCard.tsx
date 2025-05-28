import { useState } from 'react';
import { type Product } from '../../../Types/ProductType';
import ProductCardUI from './ProductCardUI';

type ChildrenType = {
  product: Product;
};

const ProductCardLogic = ({ product }: ChildrenType) => {
  const [share, setShowShare] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(0);

  const handleShare = (productId: number) => {
    setProductIdSelected(productId);
    setShowShare((share) => !share);
  };

  return (
    <ProductCardUI
      product={product}
      share={share}
      setShowShare={setShowShare}
      handleShare={handleShare}
      productIdSelected={productIdSelected}
    />
  );
};

export default ProductCardLogic;
