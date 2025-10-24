import { Plus } from "lucide-react";
import { Card, CardContent, Button } from "../ui";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="w-80 flex-shrink-0 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary text-2xl font-bold">R$ {product.price.toFixed(2)}</span>
          <Button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 rounded-full px-4 py-2"
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