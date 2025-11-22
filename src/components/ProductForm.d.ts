import React from "react";
import type { Product } from "../types/Product";
interface ProductFormProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
    mode: "add" | "edit";
}
declare const ProductFormComponent: React.FC<ProductFormProps>;
export default ProductFormComponent;
