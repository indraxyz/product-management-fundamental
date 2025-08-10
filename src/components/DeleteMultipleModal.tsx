import React from "react";
import type { Product } from "../types/Product";
import placeholderImage from "../assets/placeholder-image.svg";

interface DeleteMultipleModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productIds: string[]) => void;
}

const DeleteMultipleModalComponent: React.FC<DeleteMultipleModalProps> = ({
  products,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || products.length === 0) return null;

  const handleConfirm = () => {
    const productIds = products.map((product) => product.id);
    onConfirm(productIds);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getTotalValue = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const getCategories = () => {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return categories.join(", ");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Blur overlay */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Delete modal panel */}
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-2xl">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-6 py-6 bg-red-50 border-b border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-semibold text-red-900">
                        Delete Multiple Products
                      </h2>
                      <p className="text-sm text-red-600">
                        Confirm deletion of {products.length} products
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-6">
                  <div className="text-center mb-6">
                    <svg
                      className="mx-auto h-12 w-12 text-red-600"
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
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      Confirm Deletion of Multiple Products
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Are you sure you want to delete these {products.length}{" "}
                      products? This action cannot be undone.
                    </p>
                  </div>

                  {/* Summary Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Summary of Products to be Deleted
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Products:</span>
                        <p className="font-medium text-gray-900">
                          {products.length}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Value:</span>
                        <p className="font-medium text-green-600">
                          {formatPrice(getTotalValue())}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Categories:</span>
                        <p className="font-medium text-gray-900">
                          {getCategories()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Stock:</span>
                        <p className="font-medium text-blue-600">
                          {products.reduce(
                            (total, product) => total + product.stock,
                            0
                          )}{" "}
                          units
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Product List ({products.length})
                    </h4>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg"
                        >
                          <div className="flex-shrink-0">
                            {product.imagesUrl &&
                            product.imagesUrl.length > 0 ? (
                              <img
                                src={product.imagesUrl[0]}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded border border-gray-200"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = placeholderImage;
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.category} • ID: {product.id}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-600">
                                Stock: {product.stock}
                              </span>
                              <span className="text-xs text-gray-600">
                                Price: {formatPrice(product.price)}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Will be deleted
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning */}
                  {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-yellow-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-yellow-900">
                          Important Warning
                        </h4>
                        <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                          <li>
                            All {products.length} products will be permanently
                            deleted
                          </li>
                          <li>
                            Total value {formatPrice(getTotalValue())} will be
                            lost
                          </li>
                          <li>
                            All product data including images, variants, and
                            tags will be removed
                          </li>
                          <li>This action cannot be undone or reverted</li>
                        </ul>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end space-x-3">
                  <button onClick={onClose} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={handleConfirm} className="btn btn-danger">
                    Delete {products.length} Product
                    {products.length > 1 ? "s" : ""}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMultipleModalComponent;
