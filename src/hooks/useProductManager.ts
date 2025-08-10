import { useState, useMemo, useCallback } from "react";
import type {
  Product,
  ProductFilters,
  SortField,
  SortDirection,
} from "../types/Product";
import { mockProducts } from "../data/mockProducts";
import toast from "react-hot-toast";

export const useProductManager = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "All",
    sortField: "name",
    sortDirection: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showCount, setShowCount] = useState(10);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }
    // Category filter
    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }
    // Sorting
    filtered.sort((a, b) => {
      const aValue = a[filters.sortField];
      const bValue = b[filters.sortField];
      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue
          .toLowerCase()
          .localeCompare(bValue.toLowerCase());
        return filters.sortDirection === "asc" ? comparison : -comparison;
      }
      if (aValue < bValue) return filters.sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return filters.sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [products, filters]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, showCount);
  }, [filteredProducts, showCount]);

  const loadMore = useCallback(() => {
    setShowCount((prev) => prev + 10);
  }, []);

  const toggleSelectProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const selectAllProducts = useCallback(() => {
    setSelectedProducts(paginatedProducts.map((product) => product.id));
  }, [paginatedProducts]);

  const deselectAllProducts = useCallback(() => {
    setSelectedProducts([]);
  }, []);

  const deleteSelectedProducts = useCallback(() => {
    if (selectedProducts.length === 0) {
      toast.error("No products selected to delete");
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => !selectedProducts.includes(product.id))
    );
    setSelectedProducts([]);
    toast.success(`${selectedProducts.length} products deleted successfully`);
  }, [selectedProducts]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
    setShowCount(10);
  }, []);

  const updateSort = useCallback(
    (field: SortField, direction: SortDirection) => {
      setFilters((prev) => ({
        ...prev,
        sortField: field,
        sortDirection: direction,
      }));
    },
    []
  );

  // CRUD Operations
  const addProduct = useCallback((newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    toast.success("Product added successfully");
  }, []);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast.success("Product updated successfully");
  }, []);

  const deleteProduct = useCallback((productToDelete: Product) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== productToDelete.id)
    );
    setSelectedProducts((prev) =>
      prev.filter((id) => id !== productToDelete.id)
    );
    toast.success("Product deleted successfully");
  }, []);

  const deleteMultipleProducts = useCallback((productIds: string[]) => {
    if (productIds.length === 0) {
      toast.error("No products selected to delete");
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => !productIds.includes(product.id))
    );
    setSelectedProducts((prev) =>
      prev.filter((id) => !productIds.includes(id))
    );
    toast.success(`${productIds.length} products deleted successfully`);
  }, []);

  return {
    products: paginatedProducts,
    filteredProducts,
    selectedProducts,
    filters,
    currentPage,
    showCount,
    totalProducts: filteredProducts.length,
    hasMore: paginatedProducts.length < filteredProducts.length,
    toggleSelectProduct,
    selectAllProducts,
    deselectAllProducts,
    deleteSelectedProducts,
    updateFilters,
    updateSort,
    loadMore,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
  };
};
