import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import placeholderImage from "../assets/placeholder-image.svg";

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
    console.log("Loading image:", src);
    setImageSrc(src);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    console.log("Image loaded successfully:", src);
    setIsLoading(false);
  };

  const handleError = () => {
    console.log("Image failed to load:", src);
    setIsLoading(false);
    setImageSrc(placeholderImage);
  };

  return (
    <div className="relative group">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-64 object-cover rounded-lg border border-gray-200 shadow-md transition-all duration-300 ${
          isLoading ? "opacity-0" : "opacity-100 hover:shadow-lg"
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
      <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
        <p className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
          Lihat Gambar {index + 1}
        </p>
      </div>
    </div>
  );
};

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleEdit = () => {
    onEdit(product as Product);
    onClose();
  };

  const handleDelete = () => {
    onDelete(product as Product);
    onClose();
  };

  useEffect(() => {
    console.log("product", product);
  }, [product]);

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
          <div className="w-screen max-w-2xl">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Detail Produk
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Informasi lengkap produk
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
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
                      Hapus
                    </button>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
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
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-6 space-y-8">
                  {/* Product Images */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Gambar Produk
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                            <div className="text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
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
                              <p className="mt-2 text-sm text-gray-500">
                                Tidak ada gambar tersedia
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Informasi Dasar
                    </h3>
                    <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                      <div>
                        <span className="text-sm font-medium text-blue-900">
                          Nama Produk:
                        </span>
                        <p className="text-lg font-semibold text-gray-900">
                          {product.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-900">
                          Deskripsi:
                        </span>
                        <p className="text-gray-700">{product.description}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-900">
                          Kategori:
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Stock */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Harga & Stok
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <span className="text-sm font-medium text-green-900">
                          Harga:
                        </span>
                        <p className="text-xl font-bold text-green-800">
                          {formatPrice(product.price)}
                        </p>
                        {product.discount > 0 && (
                          <p className="text-sm text-green-600">
                            Diskon: {product.discount}%
                          </p>
                        )}
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <span className="text-sm font-medium text-orange-900">
                          Stok:
                        </span>
                        <p className="text-xl font-bold text-orange-800">
                          {product.stock} unit
                        </p>
                        <p className="text-sm text-orange-600">
                          Berat: {product.weight}g
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Variants */}
                  {product.varian && product.varian.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Varian Produk
                      </h3>
                      <div className="space-y-3">
                        {product.varian.map((variant, index) => (
                          <div
                            key={variant.id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-gray-900">
                                Varian {index + 1}
                              </h4>
                              <span className="text-xs text-gray-500">
                                ID: {variant.id}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Nama:</span>
                                <p className="font-medium">{variant.name}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Nilai:</span>
                                <p className="font-medium">{variant.value}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">
                                  Tambahan Harga:
                                </span>
                                <p className="font-medium text-green-600">
                                  {formatPrice(variant.priceModifier)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">
                                  Tambahan Stok:
                                </span>
                                <p className="font-medium text-blue-600">
                                  {variant.stockModifier} unit
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
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Informasi Tanggal
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Dibuat:
                        </span>
                        <p className="text-gray-600">
                          {formatDate(product.createdAt)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Terakhir Diupdate:
                        </span>
                        <p className="text-gray-600">
                          {formatDate(product.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Summary */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Ringkasan Produk
                    </h3>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-900 font-medium">
                            Total Varian:
                          </span>
                          <p className="text-blue-800 font-semibold">
                            {product.varian.length}
                          </p>
                        </div>
                        <div>
                          <span className="text-blue-900 font-medium">
                            Total Gambar:
                          </span>
                          <p className="text-blue-800 font-semibold">
                            {product.imagesUrl.length}
                          </p>
                        </div>
                        <div>
                          <span className="text-blue-900 font-medium">
                            Total Tags:
                          </span>
                          <p className="text-blue-800 font-semibold">
                            {product.tags.length}
                          </p>
                        </div>
                        <div>
                          <span className="text-blue-900 font-medium">
                            Status Stok:
                          </span>
                          <p
                            className={`font-semibold ${
                              product.stock > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.stock > 0 ? "Tersedia" : "Habis"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    ID Produk: <span className="font-mono">{product.id}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Tutup
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
