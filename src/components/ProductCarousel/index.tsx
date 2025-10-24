import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard, type Product } from "../ProductCard";
import { Button } from "../ui";

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
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gradient">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="btn btn-outline"
            style={{ width: '2.5rem', height: '2.5rem', padding: 0 }}
          >
            <ChevronLeft style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="btn btn-outline"
            style={{ width: '2.5rem', height: '2.5rem', padding: 0 }}
          >
            <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '1rem' }}
      >
        {products.map((product, index) => (
          <div key={product.id}>
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