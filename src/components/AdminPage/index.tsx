import { useState } from "react";
import { Pencil, Trash2, Plus, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "../ui";
import { ProductModal } from "./ProductModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import type { Product } from "../../types";
import "./admin.css";

interface AdminPageProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "id">) => void;
  onEditProduct: (id: string, product: Omit<Product, "id">) => void;
  onDeleteProduct: (id: string) => void;
  onBack: () => void;
  onLogout?: () => void;
}

export function AdminPage({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onBack,
  onLogout,
}: AdminPageProps) {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteClick = (productId: string) => {
    setDeletingProductId(productId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingProductId) {
      onDeleteProduct(deletingProductId);
      setShowDeleteModal(false);
      setDeletingProductId(null);
    }
  };

  const potatoProducts = products.filter((p) => p.category === "potato");
  const pastaProducts = products.filter((p) => p.category === "pasta");

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Voltar
          </Button>
          <div>
            <h1 className="admin-title">Painel de Administração</h1>
            <p className="admin-subtitle">Gerencie os produtos da sua loja</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {onLogout && (
            <Button
              variant="outline"
              onClick={onLogout}
              className="flex items-center gap-2"
              style={{
                borderColor: '#dc2626',
                color: '#dc2626'
              }}
            >
              <LogOut size={20} />
              Sair
            </Button>
          )}
          <Button onClick={handleAddClick} className="add-product-btn">
            <Plus size={20} />
            Adicionar Produto
          </Button>
        </div>
      </div>

      <div className="products-grid">
        <section className="product-section">
          <h2 className="section-title">
            🥔 Batatas Recheadas ({potatoProducts.length})
          </h2>
          <div className="products-list">
            {potatoProducts.map((product) => (
              <div key={product.id} className="product-card-admin">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-admin"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="product-actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(product)}
                    className="action-btn edit-btn"
                  >
                    <Pencil size={16} />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(product.id)}
                    className="action-btn delete-btn"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="product-section">
          <h2 className="section-title">
            🍝 Massas Artesanais ({pastaProducts.length})
          </h2>
          <div className="products-list">
            {pastaProducts.map((product) => (
              <div key={product.id} className="product-card-admin">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-admin"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="product-actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(product)}
                    className="action-btn edit-btn"
                  >
                    <Pencil size={16} />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(product.id)}
                    className="action-btn delete-btn"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modals will be added here */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSave={(product) => {
          if (editingProduct) {
            onEditProduct(editingProduct.id, product);
          } else {
            onAddProduct(product);
          }
          setShowProductModal(false);
        }}
        editingProduct={editingProduct}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingProductId(null);
        }}
        onConfirm={handleConfirmDelete}
        productName={
          products.find((p) => p.id === deletingProductId)?.name
        }
      />
    </div>
  );
}
