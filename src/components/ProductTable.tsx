import React, { memo, useMemo } from "react";
import type { Product } from "../types/Product";
import placeholderImage from "../assets/placeholder-image.svg";
import {
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Image as ImageIcon,
  Package,
} from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
// const placeholderImage = "https://via.placeholder.com/150";

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
  isLoading?: boolean;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const TableComponent: React.FC<ProductTableProps> = ({
  products,
  selectedProducts,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onViewDetail,
  onEdit,
  onDelete,
  onAddProduct,
  isLoading = false,
}) => {
  const allSelected =
    products.length > 0 && selectedProducts.length === products.length;
  const someSelected =
    selectedProducts.length > 0 && selectedProducts.length < products.length;

  const selectedSet = useMemo(
    () => new Set(selectedProducts),
    [selectedProducts]
  );

  return (
    <div className="card">
      {/* Header with Add Product button - NOT sticky */}
      <div className="card-header bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Products
          </h3>
          <button onClick={onAddProduct} className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Table container with proper sticky header and horizontal scroll */}
      <div className="relative">
        {/* Sticky header container */}
        <div className="sticky top-0 z-30 bg-gray-50 dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
              <colgroup>
                <col className="w-[180px]" />
                <col className="w-[400px]" />
                <col className="w-[120px]" />
                <col className="w-[100px]" />
                <col className="w-[100px]" />
                <col className="w-[100px]" />
                <col className="w-[150px]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky left-0 z-20 shadow-[2px_0_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_8px_-2px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center">
                      {selectedProducts.length > 0 && (
                        <input
                          type="checkbox"
                          checked={allSelected}
                          ref={(input) => {
                            if (input) input.indeterminate = someSelected;
                          }}
                          onChange={allSelected ? onDeselectAll : onSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 mr-2"
                        />
                      )}
                      <Settings className="size-5" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                    <span className="hidden lg:block">Product</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                    <span className="hidden lg:block">Category</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                    <span className="hidden lg:block">Price</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                    <span className="hidden lg:block">Stock</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                    <span className="hidden lg:block">Discount</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                    <span className="hidden lg:block">Updated</span>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        {/* Table body with horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <colgroup>
              <col className="w-[180px]" />
              <col className="w-[300px]" />
              <col className="w-[120px]" />
              <col className="w-[100px]" />
              <col className="w-[100px]" />
              <col className="w-[100px]" />
              <col className="w-[150px]" />
            </colgroup>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-900 dark:divide-slate-800">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white dark:bg-slate-900 z-10 shadow-[2px_0_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_8px_-2px_rgba(0,0,0,0.3)]">
                    <div className="flex space-x-2 ">
                      <input
                        type="checkbox"
                        checked={selectedSet.has(product.id)}
                        onChange={() => onToggleSelect(product.id)}
                        className="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 mr-2"
                      />
                      <button
                        onClick={() => onViewDetail(product)}
                        className="icon-btn"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(product)}
                        className="icon-btn"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="icon-btn text-red-600 hover:text-red-700"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {product.imagesUrl && product.imagesUrl.length > 0 ? (
                          <img
                            className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                            src={product.imagesUrl[0]}
                            alt={product.name}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = placeholderImage;
                            }}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-slate-400 max-w-xs truncate">
                          {product.description.length > 50
                            ? `${product.description.substring(0, 50)}...`
                            : product.description}
                        </div>
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {product.tags.length > 2 && (
                              <span className="text-xs text-gray-500 dark:text-slate-400">
                                +{product.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-blue">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {priceFormatter.format(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`badge ${
                        product.stock > 10
                          ? "badge-green"
                          : product.stock > 0
                          ? "badge-yellow"
                          : "badge-red"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {product.discount > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300">
                        {product.discount}%
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-slate-500">
                        -
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                    {dateTimeFormatter.format(product.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loading indicator for infinite scroll */}
      {isLoading && <LoadingSpinner size="sm" className="h-24" />}

      {/* Empty state */}
      {products.length === 0 && !isLoading && (
        <div className="px-6 py-12">
          <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl p-10 text-center bg-gray-50 dark:bg-slate-900">
            <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="mt-6 text-base font-semibold text-gray-900 dark:text-gray-100">
              No products yet
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              Start by adding new products to populate the list.
            </p>
            <div className="mt-6">
              <button onClick={onAddProduct} className="btn btn-primary">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ProductTable = memo(TableComponent);
