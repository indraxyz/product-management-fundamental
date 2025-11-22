export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount: number;
    tags: string[];
    category: string;
    createdAt: Date;
    updatedAt: Date;
    imagesUrl: string[];
    weight: number;
    variants: ProductVariant[];
}
export interface ProductVariant {
    id: string;
    name: string;
    value: string;
    priceModifier: number;
    stockModifier: number;
}
export type SortField = "price" | "name" | "discount" | "stock" | "createdAt" | "updatedAt";
export type SortDirection = "asc" | "desc";
export interface ProductFilters {
    search: string;
    category: string;
    sortField: SortField;
    sortDirection: SortDirection;
}
export interface ProductTableState {
    products: Product[];
    filteredProducts: Product[];
    selectedProducts: string[];
    filters: ProductFilters;
    currentPage: number;
    itemsPerPage: number;
    showCount: number;
}
