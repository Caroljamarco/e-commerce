import { Plus } from "lucide-react";
import { Card, CardContent, Button } from "../ui";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="product-card">
      <div className="product-card-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
      </div>
      <CardContent className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">R$ {product.price.toFixed(2)}</span>
          <Button
            onClick={() => onAddToCart(product)}
            className="product-card-btn"
            size="sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}