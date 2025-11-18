import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AdminPage } from "../AdminPage";
import type { Product } from "../../types";

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "id">) => void;
  onEditProduct: (id: string, product: Omit<Product, "id">) => void;
  onDeleteProduct: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export function AdminDashboard({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onToggleActive,
}: AdminDashboardProps) {
  const navigate = useNavigate();

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      toast.error("Você precisa fazer login para acessar esta página!");
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  // Verificar se está autenticado antes de renderizar
  const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";
  if (!isAuthenticated) {
    return null; // Não renderiza nada enquanto redireciona
  }

  return (
    <AdminPage
      products={products}
      onAddProduct={onAddProduct}
      onEditProduct={onEditProduct}
      onDeleteProduct={onDeleteProduct}
      onToggleActive={onToggleActive}
      onBack={handleBack}
      onLogout={handleLogout}
    />
  );
}
