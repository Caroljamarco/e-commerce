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
      <DialogContent className="sm:max-w-[460px] max-h-[85vh] flex flex-col bg-background border-border overflow-hidden">
        <DialogHeader className="p-2 sm:p-3 flex-shrink-0 border-b flex flex-col items-start gap-1">
          <DialogTitle className="text-sm font-semibold text-foreground leading-tight">
            Adicionar ao Carrinho
          </DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground mt-0">
            Personalize seu pedido antes de adicionar ao carrinho
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-4 sm:px-6 py-2 overflow-y-auto flex-1 space-y-3">
          <div className="flex items-start gap-2.5 p-2 bg-white/90 dark:bg-slate-800/80 rounded-md border border-border shadow-sm">
            <div className={isShrinking ? "w-8 h-8 sm:w-10 sm:h-10 rounded-md overflow-hidden flex-shrink-0 bg-muted/20 flex items-center justify-center transition-all duration-200" : "w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted/20 flex items-center justify-center transition-all duration-200"}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm leading-tight truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {product.description}
              </p>
              <span className="text-sm font-semibold text-primary mt-0.5 block">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-xs font-medium">
              Quantidade
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center text-sm font-medium"
                min="1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-xs font-medium">
              Observações (opcional)
            </Label>
            <Textarea
              id="comment"
              placeholder="Ex: sem cebola, ponto da carne, etc..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              className="resize-none text-xs"
            />
          </div>

          <div className="bg-muted/60 p-2.5 rounded-md">
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-xs font-medium text-muted-foreground">Subtotal:</span>
              <span className="text-base font-semibold text-primary whitespace-nowrap leading-none">
                R$ {(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="p-3 sm:p-4 border-t flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button 
              variant="outline" 
              onClick={handleClose} 
              className="sm:flex-1"
              size="sm"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddToCart} 
              className="sm:flex-[2]"
              size="sm"
              disabled={isShrinking}
            >
              {isShrinking ? "Adicionando..." : "🛒 Adicionar ao Carrinho"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}