import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import "./AddToCartModal.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui";
import { Button, Input, Label, Textarea } from "../ui";
import type { Product } from "../../types";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, quantity: number, comment: string) => void;
}

export function AddToCartModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [isShrinking, setIsShrinking] = useState(false);

  const handleClose = () => {
    setQuantity(1);
    setComment("");
    setIsShrinking(false);
    onClose();
  };

  const handleAddToCart = () => {
    if (product) {
      // trigger shrink animation then add to cart and close
      setIsShrinking(true);
      // small delay to show the shrink effect
      setTimeout(() => {
        onAddToCart(product, quantity, comment);
        handleClose();
      }, 250);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="add-to-cart-dialog-content">
        <DialogHeader className="modal-header">
          <DialogTitle className="modal-title">Adicionar ao Carrinho</DialogTitle>
          <DialogDescription className="modal-desc">Personalize seu pedido antes de adicionar ao carrinho</DialogDescription>
        </DialogHeader>

        <div className="modal-body space-y-3">
          <div className="product-row">
            <div className={"product-image" + (isShrinking ? " shrink" : "")}>
              <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <span className="product-price">R$ {product.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="label-small">Quantidade</Label>
            <div className="quantity-controls">
              <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn-icon">
                <Minus />
              </Button>
              <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="quantity-input" min="1" />
              <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="btn-icon">
                <Plus />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="label-small">Observações (opcional)</Label>
            <Textarea id="comment" placeholder="Ex: sem cebola, ponto da carne, etc..." value={comment} onChange={(e) => setComment(e.target.value)} rows={2} className="comment-textarea" />
          </div>

          <div className="subtotal-box">
            <div className="subtotal-row">
              <span className="subtotal-label">Subtotal:</span>
              <span className="subtotal-value">R$ {(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="modal-footer">
          <div className="footer-actions">
            <Button variant="outline" onClick={handleClose} className="btn-footer-cancel" size="sm">Cancelar</Button>
            <Button onClick={handleAddToCart} className="btn-footer-add" size="sm" disabled={isShrinking}>{isShrinking ? "Adicionando..." : "🛒 Adicionar ao Carrinho"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}