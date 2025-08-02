import { useState } from "react";
import { useProductManager } from "./hooks/useProductManager";
import { ProductTable } from "./components/ProductTable";
import { ProductFilters } from "./components/ProductFilters";
import { LoadMoreButton } from "./components/LoadMoreButton";
import { ProductDetail } from "./components/ProductDetail";
import { ProductForm } from "./components/ProductForm";
import { DeleteModal } from "./components/DeleteModal";
import { DeleteMultipleModal } from "./components/DeleteMultipleModal";
import type { Product } from "./types/Product";

function App() {
  const {
    products,
    selectedProducts,
    filters,
    totalProducts,
    hasMore,
    toggleSelectProduct,
    selectAllProducts,
    deselectAllProducts,
    updateFilters,
    updateSort,
    loadMore,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manajemen Produk
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Kelola produk Anda dengan mudah dan efisien
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Total:{" "}
                <span className="font-medium text-gray-900">
                  {totalProducts}
                </span>{" "}
                produk
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
        />
        <LoadMoreButton
          onLoadMore={loadMore}
          hasMore={hasMore}
          currentCount={products.length}
          totalCount={totalProducts}
        />
      </div>

      {/* Product Detail Drawer */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Product Form Drawer */}
      <ProductForm
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveProduct}
        mode={formMode}
      />

      {/* Delete Single Product Modal */}
      <DeleteModal
        product={selectedProduct}
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Delete Multiple Products Modal */}
      <DeleteMultipleModal
        products={selectedProductsData}
        isOpen={isDeleteMultipleModalOpen}
        onClose={handleCloseDeleteMultipleModal}
        onConfirm={handleConfirmDeleteMultiple}
      />
    </div>
  );
}

export default App;
