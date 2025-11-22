import React from "react";
import type { Product } from "../types/Product";
interface ProductDetailProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}
declare const ProductDetailComponent: React.FC<ProductDetailProps>;
export default ProductDetailComponent;
