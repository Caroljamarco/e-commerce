import { useState } from "react";
import { toast } from "sonner";

import { ProductCarousel } from "../ProductCarousel";
import { FloatingCart } from "../FloatingCart";
import { AddToCartModal } from "../AddToCartModal";
import { CheckoutModal } from "../CheckoutModal";
import { ThemeToggle } from "../ThemeToggle";

import { sendOrderToRestaurant, sendConfirmationToCustomer } from "../../services/whatsapp";
import { orderService } from "../../services/api";

import type { Product, CartItem, CustomerData } from "../../types";

interface HomePageProps {
  potatoProducts: Product[];
  pastaProducts: Product[];
  beverageProducts: Product[];
  loading?: boolean;
}

export function HomePage({ potatoProducts, pastaProducts, beverageProducts, loading }: HomePageProps) {
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

  const handleSubmitOrder = async (customerData: CustomerData) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    try {
      await orderService.create({
        customer_name: customerData.name,
        phone: customerData.phone,
        delivery_type: customerData.deliveryType,
        payment_method: customerData.paymentMethod,
        change_for: customerData.changeFor || null,
        cep: customerData.cep || null,
        street: customerData.street || null,
        number: customerData.number || null,
        complement: customerData.complement || null,
        neighborhood: customerData.neighborhood || null,
        city: customerData.city || null,
        uf: customerData.uf || null,
        additional_comments: customerData.additionalComments || null,
        total,
        items: cartItems,
      });
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      toast.error('Erro ao salvar o pedido. Tente novamente.');
      return;
    }

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
  <div className="min-h-screen homepage-bg">
      {/* Header */}
  <header className="gradient-bg homepage-header">
        <div className="container">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="header-logo-wrapper">
                <img src="/logobatata.png" alt="Delícias da Casa logo" className="header-logo header-logo-large" />
              </div>
              <div>
                <h1 className="text-4xl font-bold homepage-title">Delícias da Casa</h1>
                <p className="homepage-subtitle">
                  Batatas recheadas e massas artesanais com entrega via WhatsApp
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

  <div className="container homepage-content">
    <div className="homepage-grid">
      <div className="homepage-main">
        {loading ? (
          <div className="homepage-loading">
            <p>Carregando produtos...</p>
          </div>
        ) : (
          <>
            <div className="homepage-carousel">
              <ProductCarousel
                title="🥔 Batatas Recheadas"
                products={potatoProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
            <div className="homepage-carousel">
              <ProductCarousel
                title="🍝 Massas Artesanais"
                products={pastaProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
            <div>
              <ProductCarousel
                title="🥤 Refrigerantes"
                products={beverageProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          </>
        )}
      </div>
    </div>
  </div>

      {/* Carrinho Flutuante */}
      <FloatingCart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

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
