import { useState } from "react";
import { Minus, Plus } from "lucide-react";
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
import "../../styles/components/AddToCartModal.css";

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
      <DialogContent className="modal-content">
        <DialogHeader className="modal-header">
          <DialogTitle className="modal-title">
            Adicionar ao Carrinho
          </DialogTitle>
          <DialogDescription className="modal-description">
            Personalize seu pedido antes de adicionar ao carrinho
          </DialogDescription>
        </DialogHeader>
        
        <div className="modal-body">
          <div className="product-card">
            <div 
              className={`product-image-container ${isShrinking ? 'shrinking' : ''}`}
              role="img"
              aria-label={`Imagem de ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                loading="lazy"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">
                {product.description}
              </p>
              <span className="product-price">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="quantity" className="quantity-label">
              Quantidade
            </Label>
            <div className="quantity-controls">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-button"
              >
                <Minus size={16} />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="quantity-input"
                min="1"
                aria-label="Quantidade"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-button"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="comment" className="quantity-label">
              Observações (opcional)
            </Label>
            <Textarea
              id="comment"
              placeholder="Ex: sem cebola, ponto da carne, etc..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              className="resize-none comment-textarea"
            />
          </div>

          <div className="subtotal-card">
            <span className="subtotal-label">Subtotal:</span>
            <span className="subtotal-value">
              R$ {(product.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        <DialogFooter className="modal-footer">
          <div className="footer-buttons">
            <Button 
              variant="outline" 
              onClick={handleClose} 
              className="button-cancel"
              size="lg"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddToCart} 
              className="button-add"
              size="lg"
              disabled={isShrinking}
            >
              {isShrinking ? 
                "Adicionando..." : 
                <>
                  <span className="icon">🛒</span>
                  Adicionar ao Carrinho
                </>
              }
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}