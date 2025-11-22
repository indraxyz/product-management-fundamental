import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  useOptimistic,
  useTransition,
} from "react";
import type {
  Product,
  ProductFilters,
  SortField,
  SortDirection,
} from "@/types/Product";
import { mockProducts } from "@/data/mockProducts";
import toast from "react-hot-toast";

// Constants for better maintainability
const ITEMS_PER_PAGE = 5;
const SCROLL_THRESHOLD = 100;
const API_DELAY = 300;

export const useProductManager = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isPending, startTransition] = useTransition();
  const [optimisticProducts, addOptimisticProduct] = useOptimistic(
    products,
    (state, newProduct: Product) => [newProduct, ...state]
  );
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "All",
    sortField: "name",
    sortDirection: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showCount, setShowCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Use refs to prevent unnecessary re-renders and stale closures
  const isLoadingRef = useRef(false);
  const showCountRef = useRef(ITEMS_PER_PAGE);
  const filteredProductsRef = useRef<Product[]>([]);

  // Memoize search terms to avoid unnecessary recalculations
  const searchTerms = useMemo(() => {
    if (!filters.search.trim()) return null;
    return filters.search.toLowerCase().trim();
  }, [filters.search]);

  // Optimized filtering with early returns and better performance
  const filteredProducts = useMemo(() => {
    let filtered = optimisticProducts;

    // Early return if no filters applied
    if (!searchTerms && filters.category === "All") {
      return optimisticProducts;
    }

    // Apply search filter only if search terms exist
    if (searchTerms) {
      filtered = filtered.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(searchTerms);
        if (nameMatch) return true;

        const descMatch = product.description
          .toLowerCase()
          .includes(searchTerms);
        if (descMatch) return true;

        // Use some() with early return for better performance
        return product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerms)
        );
      });
    }

    // Apply category filter
    if (filters.category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Optimized sorting with stable sort and better type handling
    if (filtered.length > 1) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[filters.sortField];
        const bValue = b[filters.sortField];

        // Handle different data types properly
        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue
            .toLowerCase()
            .localeCompare(bValue.toLowerCase());
          return filters.sortDirection === "asc" ? comparison : -comparison;
        }

        // Handle numeric values
        if (typeof aValue === "number" && typeof bValue === "number") {
          return filters.sortDirection === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        // Handle dates
        if (aValue instanceof Date && bValue instanceof Date) {
          return filters.sortDirection === "asc"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }

        // Fallback for other types
        if (aValue < bValue) return filters.sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return filters.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    optimisticProducts,
    searchTerms,
    filters.category,
    filters.sortField,
    filters.sortDirection,
  ]);

  // Update ref when filtered products change
  useEffect(() => {
    filteredProductsRef.current = filteredProducts;
  }, [filteredProducts]);

  // Optimized pagination with proper bounds checking
  const paginatedProducts = useMemo(() => {
    const startIndex = 0;
    const endIndex = Math.min(showCount, filteredProducts.length);
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, showCount]);

  // Debounced scroll handler to improve performance
  const scrollTimeoutRef = useRef<number>(null);
  const loadMoreRef = useRef<() => void>(() => {});

  // Optimized load more function
  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    // Simulate API delay
    const timeoutId = window.setTimeout(() => {
      setShowCount((prev) => {
        const newCount = Math.min(
          prev + ITEMS_PER_PAGE,
          filteredProductsRef.current.length
        );
        showCountRef.current = newCount;
        return newCount;
      });
      setIsLoading(false);
      isLoadingRef.current = false;
    }, API_DELAY);

    // Cleanup timeout if component unmounts
    return () => window.clearTimeout(timeoutId);
  }, []);

  // Update loadMore ref whenever loadMore changes
  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      if (
        isLoadingRef.current ||
        showCountRef.current >= filteredProductsRef.current.length
      ) {
        return;
      }

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - SCROLL_THRESHOLD) {
        loadMoreRef.current();
      }
    }, 50); // Small debounce for better performance
  }, []);

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Add scroll event listener with proper cleanup
  useEffect(() => {
    const throttledHandleScroll = () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(handleScroll, 16); // ~60fps throttling
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Optimized selection functions
  const toggleSelectProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.includes(productId);
      if (isSelected) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const selectAllProducts = useCallback(() => {
    setSelectedProducts(paginatedProducts.map((product) => product.id));
  }, [paginatedProducts]);

  const deselectAllProducts = useCallback(() => {
    setSelectedProducts([]);
  }, []);

  // Optimized delete functions with proper state updates
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

  // Reset pagination when filters change
  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
    setShowCount(ITEMS_PER_PAGE);
    showCountRef.current = ITEMS_PER_PAGE;
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

  // CRUD Operations with proper error handling and optimistic updates
  const addProduct = useCallback(
    (newProduct: Product) => {
      if (!newProduct.id || !newProduct.name) {
        toast.error("Invalid product data");
        return;
      }

      startTransition(() => {
        addOptimisticProduct(newProduct);
        setProducts((prev) => [newProduct, ...prev]);
        toast.success("Product added successfully");
      });
    },
    [addOptimisticProduct]
  );

  const updateProduct = useCallback((updatedProduct: Product) => {
    if (!updatedProduct.id) {
      toast.error("Invalid product ID");
      return;
    }

    startTransition(() => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      toast.success("Product updated successfully");
    });
  }, []);

  const deleteProduct = useCallback((productToDelete: Product) => {
    if (!productToDelete.id) {
      toast.error("Invalid product ID");
      return;
    }

    startTransition(() => {
      setProducts((prev) =>
        prev.filter((product) => product.id !== productToDelete.id)
      );
      setSelectedProducts((prev) =>
        prev.filter((id) => id !== productToDelete.id)
      );
      toast.success("Product deleted successfully");
    });
  }, []);

  const deleteMultipleProducts = useCallback((productIds: string[]) => {
    if (productIds.length === 0) {
      toast.error("No products selected to delete");
      return;
    }

    startTransition(() => {
      setProducts((prev) =>
        prev.filter((product) => !productIds.includes(product.id))
      );
      setSelectedProducts((prev) =>
        prev.filter((id) => !productIds.includes(id))
      );
      toast.success(`${productIds.length} products deleted successfully`);
    });
  }, []);

  // Memoized return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      products: paginatedProducts,
      filteredProducts,
      selectedProducts,
      filters,
      currentPage,
      showCount,
      totalProducts: filteredProducts.length,
      hasMore: paginatedProducts.length < filteredProducts.length,
      isLoading: isLoading || isPending,
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
    }),
    [
      paginatedProducts,
      filteredProducts,
      selectedProducts,
      filters,
      currentPage,
      showCount,
      isLoading,
      isPending,
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
    ]
  );
};
