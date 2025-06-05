import { createContext, useContext, useState } from "react";
import type { Product } from "../../Types/ProductType";

type ProductContextType = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const contextInitialValue = {
    products: [],
    setProducts: () => {}
}

const ProductContext = createContext<ProductContextType>(contextInitialValue)

type ChildrenType = {
    children: React.ReactNode
}

const ProductsProvider = ({children}: ChildrenType) => {
  const [products, setProducts] = useState<Product[]>([])
  return (
    <ProductContext.Provider value={{products, setProducts}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
    const context = useContext(ProductContext);
    if(!context){
        throw new Error('The context is supossed to be used within the wrapped provider')
    }
    return context;
}

export default ProductsProvider
