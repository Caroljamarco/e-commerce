import { useState } from "react";
import { Pencil, Trash2, Plus, ArrowLeft, LogOut, Eye, EyeOff } from "lucide-react";
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
  onToggleActive: (id: string) => void;
  onOrders: () => void;
  onBack: () => void;
  onLogout?: () => void;
}

export function AdminPage({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onToggleActive,
  onOrders,
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
  const beverageProducts = products.filter((p) => p.category === "beverage");

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
          <Button onClick={onOrders} className="add-product-btn">
            📦 Pedidos
          </Button>
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
              <div 
                key={product.id} 
                className="product-card-admin"
                style={{ opacity: product.active === false ? 0.6 : 1 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-admin"
                />
                <div className="product-info">
                  <h3 className="product-name">
                    {product.name}
                    {product.active === false && (
                      <span style={{ 
                        marginLeft: '8px',
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        backgroundColor: '#fbbf24',
                        color: '#78350f',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}>
                        INATIVO
                      </span>
                    )}
                  </h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="product-actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleActive(product.id)}
                    className="action-btn"
                    style={{
                      borderColor: product.active === false ? '#10b981' : '#f59e0b',
                      color: product.active === false ? '#10b981' : '#f59e0b'
                    }}
                  >
                    {product.active === false ? <Eye size={16} /> : <EyeOff size={16} />}
                    {product.active === false ? 'Ativar' : 'Desativar'}
                  </Button>
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
              <div 
                key={product.id} 
                className="product-card-admin"
                style={{ opacity: product.active === false ? 0.6 : 1 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-admin"
                />
                <div className="product-info">
                  <h3 className="product-name">
                    {product.name}
                    {product.active === false && (
                      <span style={{ 
                        marginLeft: '8px',
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        backgroundColor: '#fbbf24',
                        color: '#78350f',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}>
                        INATIVO
                      </span>
                    )}
                  </h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="product-actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleActive(product.id)}
                    className="action-btn"
                    style={{
                      borderColor: product.active === false ? '#10b981' : '#f59e0b',
                      color: product.active === false ? '#10b981' : '#f59e0b'
                    }}
                  >
                    {product.active === false ? <Eye size={16} /> : <EyeOff size={16} />}
                    {product.active === false ? 'Ativar' : 'Desativar'}
                  </Button>
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
            🥤 Refrigerantes ({beverageProducts.length})
          </h2>
          <div className="products-list">
            {beverageProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card-admin"
                style={{ opacity: product.active === false ? 0.6 : 1 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-admin"
                />
                <div className="product-info">
                  <h3 className="product-name">
                    {product.name}
                    {product.active === false && (
                      <span style={{ 
                        marginLeft: '8px',
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        backgroundColor: '#fbbf24',
                        color: '#78350f',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}>
                        INATIVO
                      </span>
                    )}
                  </h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="product-actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleActive(product.id)}
                    className="action-btn"
                    style={{
                      borderColor: product.active === false ? '#10b981' : '#f59e0b',
                      color: product.active === false ? '#10b981' : '#f59e0b'
                    }}
                  >
                    {product.active === false ? <Eye size={16} /> : <EyeOff size={16} />}
                    {product.active === false ? 'Ativar' : 'Desativar'}
                  </Button>
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
