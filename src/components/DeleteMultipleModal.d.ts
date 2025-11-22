import React from "react";
import type { Product } from "../types/Product";
interface DeleteMultipleModalProps {
    products: Product[];
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (productIds: string[]) => void;
}
declare const DeleteMultipleModalComponent: React.FC<DeleteMultipleModalProps>;
export default DeleteMultipleModalComponent;
