import { Plus } from "lucide-react";
import { Button } from "../ui";
import type { Product } from "../../types";
import "../../styles/components/ProductCard.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-title">{product.name}</h3>
          <span className="product-price">R$ {product.price.toFixed(2)}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <Button
            onClick={() => onAddToCart(product)}
            className="button-add-to-cart"
            size="sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}