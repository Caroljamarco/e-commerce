import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard } from "../ProductCard";
import type { Product } from "../../types";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductCarousel({ title, products, onAddToCart }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="product-carousel">
      <div className="product-carousel-header">
        <h2 className="product-carousel-title">{title}</h2>
        <div className="product-carousel-controls">
          <button
            onClick={() => scroll("left")}
            className="product-carousel-btn"
          >
            <ChevronLeft className="product-carousel-btn-icon" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="product-carousel-btn"
          >
            <ChevronRight className="product-carousel-btn-icon" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="product-carousel-list product-carousel-scroll"
        style={{ overflowX: 'auto', scrollBehavior: 'smooth', display: 'flex', gap: '1.5rem', paddingBottom: '1rem' }}
      >
        {products.map((product) => (
          <div key={product.id} style={{ minWidth: '320px', flex: '0 0 auto' }}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}