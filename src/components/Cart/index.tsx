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

  if (items.length === 0) {
    return (
      <div className="card sticky" style={{ top: '1.5rem' }}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gradient mb-4">🛒 Carrinho</h2>
          <div className="text-center py-8">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <p className="text-muted text-lg">
              Seu carrinho está vazio
            </p>
            <p className="text-muted text-sm mt-2">
              Adicione alguns itens deliciosos para continuar!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card sticky" style={{ top: '1.5rem' }}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gradient mb-4">🛒 Carrinho ({items.length})</h2>
        <div className="space-y-6">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 bg-muted rounded-lg">
                <div style={{ width: '4rem', height: '4rem', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <p className="text-sm text-muted">
                    R$ {item.product.price.toFixed(2)}
                  </p>
                  {item.comment && (
                    <p className="text-xs text-muted bg-background p-2 rounded">
                      <span className="font-medium">Obs:</span> {item.comment}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="btn btn-outline"
                      style={{ width: '2rem', height: '2rem', padding: 0 }}
                    >
                      <ChevronDown style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <span style={{ width: '2rem', textAlign: 'center', fontWeight: '500' }}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="btn btn-outline"
                      style={{ width: '2rem', height: '2rem', padding: 0 }}
                    >
                      <ChevronUp style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="btn btn-ghost text-destructive"
                      style={{ width: '2rem', height: '2rem', padding: 0 }}
                    >
                      <Trash2 style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary text-2xl">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
            onClick={onCheckout} 
            className="btn btn-primary w-full"
            style={{ padding: '0.75rem', fontSize: '1.125rem', fontWeight: '600' }}
          >
            🚀 Fazer Pedido
          </button>
        </div>
      </div>
    </div>
  );
}