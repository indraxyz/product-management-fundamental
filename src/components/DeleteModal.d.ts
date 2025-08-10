import React from "react";
import type { Product } from "../types/Product";
interface DeleteModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (product: Product) => void;
}
declare const DeleteModalComponent: React.FC<DeleteModalProps>;
export default DeleteModalComponent;
