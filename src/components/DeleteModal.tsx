import React from "react";
import type { Product } from "../types/Product";

interface DeleteModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
}

const DeleteModalComponent: React.FC<DeleteModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !product) return null;

  const handleConfirm = () => {
    onConfirm(product);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
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
          <div className="w-screen max-w-md">
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
                        Delete Product
                      </h2>
                      <p className="text-sm text-red-600">
                        Confirm product deletion
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
                  <div className="text-center">
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
                      Delete Confirmation
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Are you sure you want to delete this product? This action
                      cannot be undone.
                    </p>
                  </div>

                  {/* Product Info */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      {product.imagesUrl && product.imagesUrl.length > 0 && (
                        <img
                          src={product.imagesUrl[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/64x64?text=Image";
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {product.category}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID: {product.id}
                        </p>
                        <div className="mt-1 flex items-center space-x-4 text-sm">
                          <span className="text-gray-600">
                            Stock: {product.stock}
                          </span>
                          <span className="text-gray-600">
                            Price: {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end space-x-3">
                  <button onClick={onClose} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={handleConfirm} className="btn btn-danger">
                    Delete Product
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

export default DeleteModalComponent;
