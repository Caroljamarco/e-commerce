import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { CartItem } from "../../types";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Responsivo: ocupa toda largura no mobile, sticky só em telas médias/grandes
  const cardClass = "cart-card";

  if (items.length === 0) {
    return (
      <div className={cardClass}>
        <div className="cart-padding">
          <h2 className="cart-title">🛒 Carrinho</h2>
          <div className="cart-empty">
            <div className="cart-icon">🛒</div>
            <p className="cart-empty-text">
              Seu carrinho está vazio
            </p>
            <p className="cart-empty-subtext">
              Adicione alguns itens deliciosos para continuar!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <div className="cart-padding">
        <h2 className="cart-title">🛒 Carrinho ({items.length})</h2>
        <div className="cart-items-wrapper">
          {/* Items */}
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-header">
                  <div className="cart-img-wrapper">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="cart-img"
                    />
                  </div>
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.product.name}</h4>
                    <p className="cart-item-price">
                      R$ {item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                {item.comment && (
                  <p className="cart-item-comment">
                    <span className="font-medium">Obs:</span> {item.comment}
                  </p>
                )}
                <div className="cart-actions">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="btn btn-outline cart-btn"
                  >
                    <ChevronDown className="cart-btn-icon" />
                  </button>
                  <span className="cart-qty">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="btn btn-outline cart-btn"
                  >
                    <ChevronUp className="cart-btn-icon" />
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="btn btn-ghost text-destructive cart-btn"
                  >
                    <Trash2 className="cart-btn-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="cart-total">
            <div className="cart-total-row">
              <span>Total:</span>
              <span className="cart-total-value">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
            onClick={onCheckout} 
            className="cart-checkout-btn"
          >
            🚀 Fazer Pedido
          </button>
        </div>
      </div>
    </div>
  );
}