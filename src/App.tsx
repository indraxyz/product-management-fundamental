import { Suspense, useState, lazy } from "react";
import { useProductManager } from "./hooks/useProductManager";
import { ProductTable } from "./components/ProductTable";
import { ProductFilters } from "./components/ProductFilters";
import { ThemeToggle } from "./components/ThemeToggle";
import type { Product } from "./types/Product";

const ProductDetail = lazy(() => import("./components/ProductDetail"));
const ProductForm = lazy(() => import("./components/ProductForm"));
const DeleteModal = lazy(() => import("./components/DeleteModal"));
const DeleteMultipleModal = lazy(
  () => import("./components/DeleteMultipleModal")
);

function App() {
  const {
    products,
    selectedProducts,
    filters,
    totalProducts,
    isLoading,
    toggleSelectProduct,
    selectAllProducts,
    deselectAllProducts,
    updateFilters,
    updateSort,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
  } = useProductManager();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteMultipleModalOpen, setIsDeleteMultipleModalOpen] =
    useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (product: Product) => {
    deleteProduct(product);
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) {
      return;
    }
    setIsDeleteMultipleModalOpen(true);
  };

  const handleConfirmDeleteMultiple = (productIds: string[]) => {
    deleteMultipleProducts(productIds);
    setIsDeleteMultipleModalOpen(false);
  };

  const handleCloseDeleteMultipleModal = () => {
    setIsDeleteMultipleModalOpen(false);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormMode("add");
    setIsFormOpen(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (formMode === "add") {
      addProduct(product);
    } else {
      updateProduct(product);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  // Get selected products data for the modal
  const selectedProductsData = products.filter((product) =>
    selectedProducts.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-gray-200 dark:bg-slate-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Product Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your products easily and efficiently
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="text-sm text-gray-500">
                Total:{" "}
                <span className="font-medium text-gray-900">
                  {totalProducts}
                </span>{" "}
                products
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductFilters
          filters={filters}
          onUpdateFilters={updateFilters}
          onUpdateSort={updateSort}
          selectedCount={selectedProducts.length}
          totalCount={totalProducts}
          onDeleteSelected={handleDeleteSelected}
          onDeselectAll={deselectAllProducts}
        />
        <ProductTable
          products={products}
          selectedProducts={selectedProducts}
          onToggleSelect={toggleSelectProduct}
          onSelectAll={selectAllProducts}
          onDeselectAll={deselectAllProducts}
          onViewDetail={handleViewDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddProduct={handleAddProduct}
          isLoading={isLoading}
        />
      </div>

      {/* Product Detail Drawer */}
      {isDetailOpen && selectedProduct && (
        <Suspense fallback={null}>
          <ProductDetail
            product={selectedProduct}
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Suspense>
      )}

      {/* Product Form Drawer */}
      {isFormOpen && (
        <Suspense fallback={null}>
          <ProductForm
            product={editingProduct}
            isOpen={isFormOpen}
            onClose={handleCloseForm}
            onSave={handleSaveProduct}
            mode={formMode}
          />
        </Suspense>
      )}

      {/* Delete Single Product Modal */}
      {isDeleteModalOpen && selectedProduct && (
        <Suspense fallback={null}>
          <DeleteModal
            product={selectedProduct}
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
          />
        </Suspense>
      )}

      {/* Delete Multiple Products Modal */}
      {isDeleteMultipleModalOpen && selectedProductsData.length > 0 && (
        <Suspense fallback={null}>
          <DeleteMultipleModal
            products={selectedProductsData}
            isOpen={isDeleteMultipleModalOpen}
            onClose={handleCloseDeleteMultipleModal}
            onConfirm={handleConfirmDeleteMultiple}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
