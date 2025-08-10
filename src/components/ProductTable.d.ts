import React from "react";
import type { Product } from "../types/Product";
interface ProductTableProps {
    products: Product[];
    selectedProducts: string[];
    onToggleSelect: (productId: string) => void;
    onSelectAll: () => void;
    onDeselectAll: () => void;
    onViewDetail: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    onAddProduct: () => void;
}
export declare const ProductTable: React.NamedExoticComponent<ProductTableProps>;
export {};
