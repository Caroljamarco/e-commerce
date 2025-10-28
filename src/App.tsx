import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "sonner";

import { HomePage } from "./components/HomePage";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";

import type { Product } from "./types";
import { potatoProducts as initialPotatoProducts, pastaProducts as initialPastaProducts } from "./data/products";

 export default function App() {
  const [products, setProducts] = useState<Product[]>([
    ...initialPotatoProducts,
    ...initialPastaProducts,
  ]);

  const potatoProducts = products.filter((p) => p.category === "potato");
  const pastaProducts = products.filter((p) => p.category === "pasta");

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: `${productData.category}-${Date.now()}`,
    };
    setProducts([...products, newProduct]);
    toast.success("Produto adicionado com sucesso!");
  };

  const handleEditProduct = (id: string, productData: Omit<Product, "id">) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...productData, id } : p
      )
    );
    toast.success("Produto atualizado com sucesso!");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Produto excluído com sucesso!");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal - Página dos clientes */}
        <Route 
          path="/" 
          element={
            <HomePage 
              potatoProducts={potatoProducts}
              pastaProducts={pastaProducts}
            />
          } 
        />
        
        {/* Rota de login do administrador */}
        <Route 
          path="/admin" 
          element={<AdminLogin />} 
        />
        
        {/* Rota do dashboard do administrador (protegida) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminDashboard
              products={products}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}