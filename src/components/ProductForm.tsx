import React, { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/Product";
import { categories } from "../data/mockProducts";
import { z } from "zod";
import { useForm, useFieldArray, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  mode: "add" | "edit";
}

const productVariantSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Variant name is required"),
  value: z.string().trim().min(1, "Variant value is required"),
  priceModifier: z.coerce
    .number()
    .refine((n) => Number.isFinite(n), "Must be a number"),
  stockModifier: z.coerce
    .number()
    .refine((n) => Number.isFinite(n), "Must be a number"),
});

const productFormSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.coerce.number().gt(0, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  discount: z.coerce
    .number()
    .min(0, "Minimum discount is 0%")
    .max(100, "Maximum discount is 100%"),
  category: z.string().refine((val) => categories.includes(val), {
    message: "Invalid category",
  }),
  weight: z.coerce.number().gt(0, "Weight must be greater than 0"),
  tags: z.array(z.string().trim().min(1)).default([]),
  imagesUrl: z.array(z.string().url("Invalid image URL")).default([]),
  variants: z.array(productVariantSchema).default([]),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const ProductFormComponent: React.FC<ProductFormProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  mode,
}) => {
  const initialValues: ProductFormValues = useMemo(
    () => ({
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      discount: product?.discount ?? 0,
      tags: product?.tags ?? [],
      category: product?.category ?? (categories[0] || ""),
      imagesUrl: product?.imagesUrl ?? [],
      weight: product?.weight ?? 0,
      variants: product?.variants ?? [],
    }),
    [product]
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormValues>,
    defaultValues: initialValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const [newTag, setNewTag] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const tags = watch("tags");
  const images = watch("imagesUrl");

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariantAt,
  } = useFieldArray({ control, name: "variants", keyName: "formId" });

  const onSubmit = (values: ProductFormValues) => {
    const newProduct: Product = {
      id: product?.id || Date.now().toString(),
      name: values.name,
      description: values.description,
      price: values.price,
      stock: values.stock,
      discount: values.discount,
      tags: values.tags,
      category: values.category,
      imagesUrl: values.imagesUrl,
      weight: values.weight,
      variants: values.variants,
      createdAt: product?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    onSave(newProduct);
  };

  const addTag = () => {
    const value = newTag.trim();
    if (!value) return;
    const current = getValues("tags") ?? [];
    if (current.includes(value)) return;
    const next = [...current, value];
    setValue("tags", next, { shouldDirty: true, shouldValidate: true });
    setNewTag("");
  };

  const addImageUrl = () => {
    const value = newImageUrl.trim();
    if (!value) return;
    const current = getValues("imagesUrl") ?? [];
    if (current.includes(value)) return;
    const next = [...current, value];
    setValue("imagesUrl", next, { shouldDirty: true, shouldValidate: true });
    setNewImageUrl("");
  };

  const addVariant = () => {
    appendVariant({
      id: Date.now().toString(),
      name: "",
      value: "",
      priceModifier: 0,
      stockModifier: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-xl">
            <div className="h-full flex flex-col bg-white dark:bg-slate-900 shadow-xl">
              <div className="px-6 py-6 bg-gray-50 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {mode === "add" ? "Add New Product" : "Edit Product"}
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

              <div className="flex-1 overflow-y-auto">
                <form
                  id="product-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="px-6 py-6 space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          {...register("name")}
                          className={`input ${
                            errors.name ? "border-red-500" : ""
                          }`}
                          placeholder="Enter product name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                          Description *
                        </label>
                        <textarea
                          rows={3}
                          {...register("description")}
                          className={`input ${
                            errors.description ? "border-red-500" : ""
                          }`}
                          placeholder="Enter product description"
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.description.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                          Category *
                        </label>
                        <select
                          {...register("category")}
                          className={`select ${
                            errors.category ? "border-red-500" : ""
                          }`}
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.category.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Price & Stock
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                          Price (USD) *
                        </label>
                        <input
                          type="number"
                          {...register("price")}
                          className={`input ${
                            errors.price ? "border-red-500" : ""
                          }`}
                          placeholder="0"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.price.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock *
                        </label>
                        <input
                          type="number"
                          {...register("stock")}
                          className={`input ${
                            errors.stock ? "border-red-500" : ""
                          }`}
                          placeholder="0"
                        />
                        {errors.stock && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.stock.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          {...register("discount")}
                          className={`input ${
                            errors.discount ? "border-red-500" : ""
                          }`}
                          placeholder="0"
                          min={0}
                          max={100}
                        />
                        {errors.discount && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.discount.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Weight (grams) *
                        </label>
                        <input
                          type="number"
                          {...register("weight")}
                          className={`input ${
                            errors.weight ? "border-red-500" : ""
                          }`}
                          placeholder="0"
                        />
                        {errors.weight && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.weight.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Tags
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          className="flex-1 input"
                          placeholder="Enter a tag"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="btn btn-primary"
                        >
                          Add
                        </button>
                      </div>

                      {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((value, index) => (
                            <span
                              key={`${value}-${index}`}
                              className="badge badge-blue text-sm px-3 py-1"
                            >
                              {value}
                              <button
                                type="button"
                                onClick={() => {
                                  const current = getValues("tags") ?? [];
                                  const next = current.filter(
                                    (_, i) => i !== index
                                  );
                                  setValue("tags", next, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  });
                                }}
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

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Images
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="flex-1 input"
                          placeholder="Enter image URL"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addImageUrl();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={addImageUrl}
                          className="btn btn-primary"
                        >
                          Add
                        </button>
                      </div>

                      {images && images.length > 0 && (
                        <div className="space-y-2">
                          {images.map((url, index) => (
                            <div
                              key={`${url}-${index}`}
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-md"
                            >
                              <span className="text-sm text-gray-600 dark:text-slate-400 truncate flex-1">
                                {url}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const current = getValues("imagesUrl") ?? [];
                                  const next = current.filter(
                                    (_, i) => i !== index
                                  );
                                  setValue("imagesUrl", next, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  });
                                }}
                                className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.imagesUrl && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          Invalid image URL
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Variants
                      </h3>
                      <button
                        type="button"
                        onClick={addVariant}
                        className="btn btn-primary text-sm px-3 py-1"
                      >
                        Add Variant
                      </button>
                    </div>

                    {variantFields.length > 0 && (
                      <div className="space-y-3">
                        {variantFields.map((field, index) => (
                          <div
                            key={field.formId}
                            className="p-4 border border-gray-200 rounded-md space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">
                                Variant {index + 1}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeVariantAt(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  {...register(
                                    `variants.${index}.name` as const
                                  )}
                                  className="input"
                                  placeholder="E.g., Color, Size"
                                />
                                {errors.variants?.[index]?.name && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.variants[index]?.name?.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Value
                                </label>
                                <input
                                  type="text"
                                  {...register(
                                    `variants.${index}.value` as const
                                  )}
                                  className="input"
                                  placeholder="E.g., Red, XL"
                                />
                                {errors.variants?.[index]?.value && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.variants[index]?.value?.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Price Modifier
                                </label>
                                <input
                                  type="number"
                                  {...register(
                                    `variants.${index}.priceModifier` as const
                                  )}
                                  className="input"
                                  placeholder="0"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Stock Modifier
                                </label>
                                <input
                                  type="number"
                                  {...register(
                                    `variants.${index}.stockModifier` as const
                                  )}
                                  className="input"
                                  placeholder="0"
                                />
                              </div>
                              <input
                                type="hidden"
                                {...register(`variants.${index}.id` as const)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              <div className="flex-shrink-0 px-6 py-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    form="product-form"
                    type="submit"
                    className="btn btn-primary"
                  >
                    {mode === "add" ? "Add Product" : "Save Changes"}
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

export default ProductFormComponent;
