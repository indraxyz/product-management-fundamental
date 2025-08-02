import React from "react";
import type {
  ProductFilters as ProductFiltersType,
  SortField,
  SortDirection,
} from "../types/Product";
import { categories, sortFields } from "../data/mockProducts";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onUpdateFilters: (filters: Partial<ProductFiltersType>) => void;
  onUpdateSort: (field: SortField, direction: SortDirection) => void;
  selectedCount: number;
  totalCount: number;
  onDeleteSelected: () => void;
  onDeselectAll: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onUpdateFilters,
  onUpdateSort,
  selectedCount,
  totalCount,
  onDeleteSelected,
  onDeselectAll,
}) => {
  const handleSearchChange = (value: string) => {
    onUpdateFilters({ search: value });
  };

  const handleCategoryChange = (value: string) => {
    onUpdateFilters({ category: value });
  };

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    onUpdateSort(field, direction);
  };

  const handleDeleteSelected = () => {
    if (selectedCount === 0) {
      return;
    }
    onDeleteSelected();
  };

  const handleDeselectAll = () => {
    onDeselectAll();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cari Produk
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Nama, deskripsi, atau tag..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urutkan Berdasarkan
          </label>
          <select
            value={filters.sortField}
            onChange={(e) =>
              handleSortChange(
                e.target.value as SortField,
                filters.sortDirection
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {sortFields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Direction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arah Urutan
          </label>
          <select
            value={filters.sortDirection}
            onChange={(e) =>
              handleSortChange(
                filters.sortField,
                e.target.value as SortDirection
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="asc">A-Z (Ascending)</option>
            <option value="desc">Z-A (Descending)</option>
          </select>
        </div>
      </div>

      {/* Selected Actions */}
      {selectedCount > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedCount} produk dipilih
              </span>
              <button
                onClick={handleDeselectAll}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Batalkan Pilihan
              </button>
            </div>
            <button
              onClick={handleDeleteSelected}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Hapus {selectedCount} Produk
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Menampilkan {totalCount} produk
            {filters.search && (
              <span className="ml-2 text-blue-600">
                untuk pencarian "{filters.search}"
              </span>
            )}
            {filters.category !== "All" && (
              <span className="ml-2 text-blue-600">
                dalam kategori "{filters.category}"
              </span>
            )}
          </span>
          <span>
            Diurutkan berdasarkan{" "}
            {sortFields.find((f) => f.value === filters.sortField)?.label} (
            {filters.sortDirection === "asc" ? "A-Z" : "Z-A"})
          </span>
        </div>
      </div>
    </div>
  );
};
