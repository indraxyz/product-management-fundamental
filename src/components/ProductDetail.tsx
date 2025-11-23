import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import placeholderImage from "../assets/placeholder-image.svg";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

interface ProductImageProps {
  src: string;
  alt: string;
  index: number;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setImageSrc(placeholderImage);
  };

  return (
    <div className="relative group">
      {isLoading && (
        <LoadingSpinner
          size="sm"
          className="absolute inset-0 bg-gray-100 dark:bg-slate-800 rounded-lg"
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-slate-600 shadow-md transition-all duration-300 ${
          isLoading ? "opacity-0" : "opacity-100 hover:shadow-lg"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
        <p className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
          View Image {index + 1}
        </p>
      </div>
    </div>
  );
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const ProductDetailComponent: React.FC<ProductDetailProps> = ({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const formatPrice = (price: number) => priceFormatter.format(price);
  const formatDate = (date: Date) => dateFormatter.format(date);

  const handleEdit = () => {
    onEdit(product as Product);
    onClose();
  };

  const handleDelete = () => {
    onDelete(product as Product);
    onClose();
  };

  // No side effects required on product change

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Blur overlay */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Drawer panel */}
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-3xl">
            <div className="h-full flex flex-col bg-white dark:bg-slate-900 shadow-xl">
              {/* Header */}
              <div className="px-6 py-6 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Product Details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                      Complete product information
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={handleEdit} className="btn btn-primary">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button onClick={handleDelete} className="btn btn-danger">
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
                      Delete
                    </button>
                    <button onClick={onClose} className="icon-btn">
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
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-6 space-y-8">
                  {/* Product Images */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Product Images
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.imagesUrl && product.imagesUrl.length > 0 ? (
                        product.imagesUrl.map((image, index) => (
                          <ProductImage
                            key={index}
                            src={image}
                            alt={`${product.name} - ${index + 1}`}
                            index={index}
                          />
                        ))
                      ) : (
                        <div className="col-span-full">
                          <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-slate-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600">
                            <div className="text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500"
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
                              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                                No images available
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Basic Information
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-3">
                      <div>
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Product Name:
                        </span>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {product.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Description:
                        </span>
                        <p className="text-gray-700 dark:text-slate-300">
                          {product.description}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Category:
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Stock */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Price & Stock
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <span className="text-sm font-medium text-green-900 dark:text-green-100">
                          Price:
                        </span>
                        <p className="text-xl font-bold text-green-800 dark:text-green-300">
                          {formatPrice(product.price)}
                        </p>
                        {product.discount > 0 && (
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Discount: {product.discount}%
                          </p>
                        )}
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                        <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                          Stock:
                        </span>
                        <p className="text-xl font-bold text-orange-800 dark:text-orange-300">
                          {product.stock} units
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                          Weight: {product.weight}g
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Variants */}
                  {product.variants && product.variants.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        Product Variants
                      </h3>
                      <div className="space-y-3">
                        {product.variants.map((variant, index) => (
                          <div
                            key={variant.id}
                            className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Variant {index + 1}
                              </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {variant.id}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600 dark:text-slate-400">
                                  Name:
                                </span>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {variant.name}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-slate-400">
                                  Value:
                                </span>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {variant.value}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-slate-400">
                                  Price Modifier:
                                </span>
                                <p className="font-medium text-green-600 dark:text-green-400">
                                  {formatPrice(variant.priceModifier)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-slate-400">
                                  Stock Modifier:
                                </span>
                                <p className="font-medium text-blue-600 dark:text-blue-400">
                                  {variant.stockModifier} units
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Date Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Date Information
                    </h3>
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                          Created:
                        </span>
                        <p className="text-gray-600 dark:text-slate-400">
                          {formatDate(product.createdAt)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                          Last Updated:
                        </span>
                        <p className="text-gray-600 dark:text-slate-400">
                          {formatDate(product.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Summary */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Product Summary
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-900 dark:text-blue-100 font-medium">
                            Total Variants:
                          </span>
                          <p className="text-blue-800 dark:text-blue-300 font-semibold">
                            {product.variants.length}
                          </p>
                        </div>
                        <div>
                          <span className="text-blue-900 dark:text-blue-100 font-medium">
                            Total Images:
                          </span>
                          <p className="text-blue-800 dark:text-blue-300 font-semibold">
                            {product.imagesUrl.length}
                          </p>
                        </div>
                        <div>
                          <span className="text-blue-900 dark:text-blue-100 font-medium">
                            Total Tags:
                          </span>
                          <p className="text-blue-800 dark:text-blue-300 font-semibold">
                            {product.tags.length}
                          </p>
                        </div>
                        <div>
                          <span className="text-blue-900 dark:text-blue-100 font-medium">
                            Stock Status:
                          </span>
                          <p
                            className={`font-semibold ${
                              product.stock > 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {product.stock > 0 ? "Available" : "Out of Stock"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-slate-400">
                    Product ID:{" "}
                    <span className="font-mono text-gray-700 dark:text-slate-300">
                      {product.id}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button onClick={onClose} className="btn btn-secondary">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
