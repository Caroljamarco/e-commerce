import { useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard, type Product } from "../ProductCard";
import "../../styles/components/ProductCarousel.css";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductCarousel({ title, products, onAddToCart }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const gap = 24; // 1.5rem in pixels
      const scrollAmount = cardWidth + gap;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      const targetScroll = direction === "left" 
        ? Math.max(0, currentScroll - scrollAmount)
        : Math.min(maxScroll, currentScroll + scrollAmount);

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
        <div className="carousel-controls">
          <button
            onClick={() => scroll("left")}
            className="carousel-nav-button carousel-nav-prev"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="carousel-nav-button carousel-nav-next"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="carousel-container">
        <div className="carousel-fade-left" aria-hidden="true" />
        <div
          ref={scrollRef}
          className="carousel-track"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        <div className="carousel-fade-right" aria-hidden="true" />
      </div>
    </section>
  );
}