import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "sonner";

import { HomePage } from "./components/HomePage";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";

import type { Product } from "./types";
import { productService } from "./services/api";

 export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from API
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const potatoProducts = products.filter((p) => p.category === "potato");
  const pastaProducts = products.filter((p) => p.category === "pasta");

  const handleAddProduct = async (productData: Omit<Product, "id">) => {
    try {
      const newProduct = await productService.create(productData);
      setProducts([...products, newProduct]);
      toast.success("Produto adicionado com sucesso!");
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Erro ao adicionar produto');
    }
  };

  const handleEditProduct = async (id: string, productData: Omit<Product, "id">) => {
    try {
      const updatedProduct = await productService.update(id, productData);
      setProducts(
        products.map((p) =>
          p.id === id ? updatedProduct : p
        )
      );
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Erro ao atualizar produto');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await productService.delete(id);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Erro ao excluir produto');
    }
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
              loading={loading}
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