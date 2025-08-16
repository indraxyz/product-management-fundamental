import React, { useCallback, useMemo, useRef, useState } from "react";
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
  filteredCount: number;
  displayedCount: number;
  onDeleteSelected: () => void;
  onDeselectAll: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onUpdateFilters,
  onUpdateSort,
  selectedCount,
  totalCount,
  filteredCount,
  displayedCount,
  onDeleteSelected,
  onDeselectAll,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchText, setSearchText] = useState(filters.search);

  // Sink external changes (e.g., reset all) into input value
  React.useEffect(() => {
    setSearchText(filters.search);
  }, [filters.search]);

  const debounceRef = useRef<number | null>(null);
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchText(value);
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        onUpdateFilters({ search: value });
      }, 250);
    },
    [onUpdateFilters]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      onUpdateFilters({ category: value });
    },
    [onUpdateFilters]
  );

  const handleSortChange = useCallback(
    (field: SortField, direction: SortDirection) => {
      onUpdateSort(field, direction);
    },
    [onUpdateSort]
  );

  const handleDeleteSelected = useCallback(() => {
    if (selectedCount === 0) {
      return;
    }
    onDeleteSelected();
  }, [selectedCount, onDeleteSelected]);

  const handleDeselectAll = useCallback(() => {
    onDeselectAll();
  }, [onDeselectAll]);

  const activeBadges = useMemo(() => {
    const items: Array<{
      key: string;
      label: string;
      onClear: () => void;
    }> = [];
    if (filters.search) {
      items.push({
        key: "search",
        label: `Search: "${filters.search}"`,
        onClear: () => handleSearchChange(""),
      });
    }
    if (filters.category && filters.category !== "All") {
      items.push({
        key: "category",
        label: `Category: ${filters.category}`,
        onClear: () => handleCategoryChange("All"),
      });
    }
    // Treat sort as removable preference for quick reset
    if (filters.sortField !== "name" || filters.sortDirection !== "asc") {
      items.push({
        key: "sort",
        label: `Sort: ${
          sortFields.find((f) => f.value === filters.sortField)?.label
        } (${filters.sortDirection === "asc" ? "A-Z" : "Z-A"})`,
        onClear: () => handleSortChange("name", "asc"),
      });
    }
    return items;
  }, [filters, handleCategoryChange, handleSearchChange, handleSortChange]);

  return (
    <div className="card p-6 mb-6">
      {/* Main controls: Search + Toggle Advanced */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="w-full md:max-w-xl">
          <div className="relative">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by Name, description, or tags..."
              className="input pl-9"
            />
            {searchText && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 btn btn-secondary px-2 py-1 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="btn btn-secondary"
          >
            <svg
              className="w-4 h-4 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 7a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 7a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
              />
            </svg>
            {/* {showAdvanced ? "Hide Filters" : "Advanced Filters"} */}
          </button>
        </div>
      </div>

      {/* Active filters badges */}
      {activeBadges.length > 0 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {activeBadges.map((item) => (
              <span
                key={item.key}
                className="badge badge-blue text-sm px-3 py-1"
              >
                {item.label}
                <button
                  type="button"
                  onClick={item.onClear}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              handleSearchChange("");
              handleCategoryChange("All");
              handleSortChange("name", "asc");
            }}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Reset all
          </button>
        </div>
      )}

      {/* Advanced filters - horizontal scroll */}
      {showAdvanced && (
        <div className="mt-4 overflow-x-auto">
          <div className="flex items-end gap-4 min-w-max pb-1">
            <div className="w-56">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-56">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={filters.sortField}
                onChange={(e) =>
                  handleSortChange(
                    e.target.value as SortField,
                    filters.sortDirection
                  )
                }
                className="select"
              >
                {sortFields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-56">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Direction
              </label>
              <select
                value={filters.sortDirection}
                onChange={(e) =>
                  handleSortChange(
                    filters.sortField,
                    e.target.value as SortDirection
                  )
                }
                className="select"
              >
                <option value="asc">A-Z (Ascending)</option>
                <option value="desc">Z-A (Descending)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Selected Actions */}
      {selectedCount > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedCount} products selected
              </span>
              <button
                onClick={handleDeselectAll}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Deselect All
              </button>
            </div>
            <button onClick={handleDeleteSelected} className="btn btn-danger">
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
              Delete {selectedCount} Product{selectedCount > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex flex-col space-y-1">
            <span>
              Showing{" "}
              <span className="font-medium text-gray-900">
                {displayedCount}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900">{filteredCount}</span>{" "}
              filtered products
              {filteredCount !== totalCount && (
                <span className="ml-2 text-gray-500">
                  (from {totalCount} total)
                </span>
              )}
            </span>
            {(filters.search || filters.category !== "All") && (
              <div className="text-xs text-blue-600">
                {filters.search && (
                  <span className="mr-3">🔍 Search: "{filters.search}"</span>
                )}
                {filters.category !== "All" && (
                  <span>📂 Category: "{filters.category}"</span>
                )}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Sorting</div>
            <span>
              {sortFields.find((f) => f.value === filters.sortField)?.label} (
              {filters.sortDirection === "asc" ? "A-Z" : "Z-A"})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
