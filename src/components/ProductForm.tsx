import React, { useState, useEffect } from "react";
import type { Product, ProductVariant } from "../types/Product";
import { categories } from "../data/mockProducts";

interface ProductFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  mode: "add" | "edit";
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  mode,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    discount: 0,
    tags: [],
    category: "Electronics",
    imagesUrl: [],
    weight: 0,
    varian: [],
  });
  const [newTag, setNewTag] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        ...product,
        createdAt: product.createdAt,
        updatedAt: new Date(),
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        discount: 0,
        tags: [],
        category: "Electronics",
        imagesUrl: [],
        weight: 0,
        varian: [],
      });
    }
    setErrors({});
  }, [product, mode]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Nama produk harus diisi";
    }

    if (!formData.description || formData.description.trim() === "") {
      newErrors.description = "Deskripsi produk harus diisi";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Harga harus lebih dari 0";
    }

    if (formData.stock === undefined || formData.stock < 0) {
      newErrors.stock = "Stok tidak boleh negatif";
    }

    if (
      formData.discount === undefined ||
      formData.discount < 0 ||
      formData.discount > 100
    ) {
      newErrors.discount = "Diskon harus antara 0-100%";
    }

    if (!formData.category) {
      newErrors.category = "Kategori harus dipilih";
    }

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "Berat harus lebih dari 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newProduct: Product = {
      id: product?.id || Date.now().toString(),
      name: formData.name || "",
      description: formData.description || "",
      price: formData.price || 0,
      stock: formData.stock || 0,
      discount: formData.discount || 0,
      tags: formData.tags || [],
      category: formData.category || "Electronics",
      imagesUrl: formData.imagesUrl || [],
      weight: formData.weight || 0,
      varian: formData.varian || [],
      createdAt: product?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(newProduct);
  };

  const handleInputChange = (
    field: string,
    value: string | number | string[] | ProductVariant[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      handleInputChange("tags", [...(formData.tags || []), newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags?.filter((tag) => tag !== tagToRemove) || []
    );
  };

  const addImageUrl = () => {
    if (
      newImageUrl.trim() &&
      !formData.imagesUrl?.includes(newImageUrl.trim())
    ) {
      handleInputChange("imagesUrl", [
        ...(formData.imagesUrl || []),
        newImageUrl.trim(),
      ]);
      setNewImageUrl("");
    }
  };

  const removeImageUrl = (index: number) => {
    const newImages = formData.imagesUrl?.filter((_, i) => i !== index) || [];
    handleInputChange("imagesUrl", newImages);
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: "",
      value: "",
      priceModifier: 0,
      stockModifier: 0,
    };
    const newVariants = [...(formData.varian || []), newVariant];
    handleInputChange("varian", newVariants);
  };

  const updateVariant = (
    index: number,
    field: keyof ProductVariant,
    value: string | number
  ) => {
    const newVariants = formData.varian?.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    handleInputChange("varian", newVariants || []);
  };

  const removeVariant = (index: number) => {
    const newVariants = formData.varian?.filter((_, i) => i !== index) || [];
    handleInputChange("varian", newVariants);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Drawer panel */}
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    {mode === "add" ? "Tambah Produk Baru" : "Edit Produk"}
                  </h2>
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

              {/* Form content */}
              <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Informasi Dasar
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nama Produk *
                        </label>
                        <input
                          type="text"
                          value={formData.name || ""}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Masukkan nama produk"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Deskripsi *
                        </label>
                        <textarea
                          value={formData.description || ""}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.description
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Masukkan deskripsi produk"
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.description}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kategori *
                        </label>
                        <select
                          value={formData.category || ""}
                          onChange={(e) =>
                            handleInputChange("category", e.target.value)
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.category
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.category}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price and Stock */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Harga & Stok
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Harga (IDR) *
                        </label>
                        <input
                          type="number"
                          value={formData.price || ""}
                          onChange={(e) =>
                            handleInputChange("price", Number(e.target.value))
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.price ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="0"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.price}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stok *
                        </label>
                        <input
                          type="number"
                          value={formData.stock || ""}
                          onChange={(e) =>
                            handleInputChange("stock", Number(e.target.value))
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.stock ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="0"
                        />
                        {errors.stock && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.stock}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Diskon (%)
                        </label>
                        <input
                          type="number"
                          value={formData.discount || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "discount",
                              Number(e.target.value)
                            )
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.discount
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="0"
                          min="0"
                          max="100"
                        />
                        {errors.discount && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.discount}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Berat (gram) *
                        </label>
                        <input
                          type="number"
                          value={formData.weight || ""}
                          onChange={(e) =>
                            handleInputChange("weight", Number(e.target.value))
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.weight ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="0"
                        />
                        {errors.weight && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.weight}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Tags
                    </h3>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Masukkan tag"
                          onKeyPress={(e) =>
                            e.key === "Enter" && (e.preventDefault(), addTag())
                          }
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                          Tambah
                        </button>
                      </div>
                      {formData.tags && formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Gambar
                    </h3>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Masukkan URL gambar"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addImageUrl())
                          }
                        />
                        <button
                          type="button"
                          onClick={addImageUrl}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                          Tambah
                        </button>
                      </div>
                      {formData.imagesUrl && formData.imagesUrl.length > 0 && (
                        <div className="space-y-2">
                          {formData.imagesUrl.map((url, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                            >
                              <span className="text-sm text-gray-600 truncate flex-1">
                                {url}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeImageUrl(index)}
                                className="ml-2 text-red-600 hover:text-red-800"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Variants */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Varian
                      </h3>
                      <button
                        type="button"
                        onClick={addVariant}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                      >
                        Tambah Varian
                      </button>
                    </div>
                    {formData.varian && formData.varian.length > 0 && (
                      <div className="space-y-3">
                        {formData.varian.map((variant, index) => (
                          <div
                            key={variant.id}
                            className="p-4 border border-gray-200 rounded-md space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">
                                Varian {index + 1}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Hapus
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nama
                                </label>
                                <input
                                  type="text"
                                  value={variant.name}
                                  onChange={(e) =>
                                    updateVariant(index, "name", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Contoh: Warna, Ukuran"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nilai
                                </label>
                                <input
                                  type="text"
                                  value={variant.value}
                                  onChange={(e) =>
                                    updateVariant(
                                      index,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Contoh: Merah, XL"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Tambahan Harga
                                </label>
                                <input
                                  type="number"
                                  value={variant.priceModifier}
                                  onChange={(e) =>
                                    updateVariant(
                                      index,
                                      "priceModifier",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="0"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Tambahan Stok
                                </label>
                                <input
                                  type="number"
                                  value={variant.stockModifier}
                                  onChange={(e) =>
                                    updateVariant(
                                      index,
                                      "stockModifier",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-4 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {mode === "add" ? "Tambah Produk" : "Simpan Perubahan"}
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
