import React from "react";
import type { ProductFilters as ProductFiltersType, SortField, SortDirection } from "../types/Product";
interface ProductFiltersProps {
    filters: ProductFiltersType;
    onUpdateFilters: (filters: Partial<ProductFiltersType>) => void;
    onUpdateSort: (field: SortField, direction: SortDirection) => void;
    selectedCount: number;
    totalCount: number;
    filteredCount: number;
    displayedCount: number;
    onDeleteSelected: () => void;
    onDeselectAll: () => void;
}
export declare const ProductFilters: React.FC<ProductFiltersProps>;
export {};
