import { useState } from "react";
import { toast } from "sonner";

import { ProductCarousel } from "./components/ProductCarousel";
import { Cart } from "./components/Cart";
import { AddToCartModal } from "./components/AddToCartModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { ThemeToggle } from "./components/ThemeToggle";

import { sendOrderToRestaurant, sendConfirmationToCustomer } from "./services/whatsapp";

import type { Product, CartItem, CustomerData } from "./types";
import { potatoProducts, pastaProducts } from "./data/products";

 export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsAddToCartModalOpen(true);
  };

  const handleAddToCartConfirm = (product: Product, quantity: number, comment: string) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      if (comment) {
        updatedItems[existingItemIndex].comment = comment;
      }
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { product, quantity, comment }]);
    }
    toast.success("Item adicionado ao carrinho!");
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
    toast.success("Item removido do carrinho");
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleSubmitOrder = (customerData: CustomerData) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Enviar pedido para o restaurante
    sendOrderToRestaurant(cartItems, customerData, total);
    
    // Enviar confirmação para o cliente
    setTimeout(() => {
      sendConfirmationToCustomer(cartItems, customerData, total);
    }, 2000);

    // Limpar carrinho
    setCartItems([]);
    setIsCheckoutModalOpen(false);
    
    toast.success("Pedido enviado! Você receberá uma confirmação no WhatsApp.");
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* Header */}
      <header className="gradient-bg" style={{ padding: '2rem 0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <div className="container">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                <div className="header-logo-wrapper">
                  <img src="/logobatata.png" alt="Delícias da Casa logo" className="header-logo" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold" style={{ color: 'white' }}>Delícias da Casa</h1>
                  <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.125rem' }}>
                    Batatas recheadas e massas artesanais com entrega via WhatsApp
                  </p>
                </div>
              </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '2rem 0' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '2rem' }}>
          {/* Main Content */}
          <div style={{ gridColumn: 'span 3 / span 3' }}>
            <div style={{ marginBottom: '3rem' }}>
              <ProductCarousel
                title="🥔 Batatas Recheadas"
                products={potatoProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
            <div>
              <ProductCarousel
                title="🍝 Massas Artesanais"
                products={pastaProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>

          {/* Sidebar Cart */}
          <div style={{ gridColumn: 'span 1 / span 1' }}>
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={() => setIsAddToCartModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCartConfirm}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        onSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
}