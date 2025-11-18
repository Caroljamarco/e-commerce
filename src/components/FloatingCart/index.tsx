import { useState } from "react";
import { ShoppingCart, X, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { CartItem } from "../../types";
import "./floating-cart.css";

interface FloatingCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function FloatingCart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: FloatingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className="floating-cart-button"
        aria-label="Abrir carrinho"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="floating-cart-badge">{totalItems}</span>
        )}
      </button>

      {/* Modal do carrinho */}
      {isOpen && (
        <div className="floating-cart-overlay" onClick={() => setIsOpen(false)}>
          <div className="floating-cart-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="floating-cart-header">
              <h2 className="floating-cart-title">
                🛒 Seu Carrinho {totalItems > 0 && `(${totalItems})`}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="floating-cart-close"
                aria-label="Fechar carrinho"
              >
                <X size={24} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="floating-cart-content">
              {items.length === 0 ? (
                <div className="floating-cart-empty">
                  <div className="floating-cart-empty-icon">🛒</div>
                  <p className="floating-cart-empty-text">Seu carrinho está vazio</p>
                  <p className="floating-cart-empty-subtext">
                    Adicione alguns itens deliciosos para continuar!
                  </p>
                </div>
              ) : (
                <>
                  {/* Lista de itens */}
                  <div className="floating-cart-items">
                    {items.map((item) => (
                      <div key={item.product.id} className="floating-cart-item">
                        <div className="floating-cart-item-header">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="floating-cart-item-img"
                          />
                          <div className="floating-cart-item-info">
                            <h4 className="floating-cart-item-name">{item.product.name}</h4>
                            <p className="floating-cart-item-price">
                              R$ {item.product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        {item.comment && (
                          <p className="floating-cart-item-comment">
                            <span style={{ fontWeight: '500' }}>Obs:</span> {item.comment}
                          </p>
                        )}

                        <div className="floating-cart-item-actions">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="floating-cart-btn floating-cart-btn-outline"
                            aria-label="Diminuir quantidade"
                          >
                            <ChevronDown size={16} />
                          </button>
                          <span className="floating-cart-item-qty">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="floating-cart-btn floating-cart-btn-outline"
                            aria-label="Aumentar quantidade"
                          >
                            <ChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="floating-cart-btn floating-cart-btn-delete"
                            aria-label="Remover item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer com total e botão */}
                  <div className="floating-cart-footer">
                    <div className="floating-cart-total">
                      <span className="floating-cart-total-label">Total:</span>
                      <span className="floating-cart-total-value">R$ {total.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onCheckout();
                      }}
                      className="floating-cart-checkout-btn"
                    >
                      🚀 Fazer Pedido
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
