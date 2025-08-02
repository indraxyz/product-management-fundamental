export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number; // percentage (0-100)
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  imagesUrl: string[];
  weight: number; // in grams
  varian: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier: number; // additional cost
  stockModifier: number; // additional stock
}

export type SortField =
  | "price"
  | "name"
  | "discount"
  | "stock"
  | "createdAt"
  | "updatedAt";
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
