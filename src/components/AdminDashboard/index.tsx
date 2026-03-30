import { useEffect, useState } from "react";
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
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    let mounted = true;
    
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem("adminAuth") === "true";
      
      if (mounted) {
        if (!isAuth) {
          toast.error("Você precisa fazer login para acessar esta página!");
          navigate("/admin", { replace: true });
        } else {
          setIsAuthenticated(true);
        }
        setIsChecking(false);
      }
    };
    
    checkAuth();
    
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("user");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleOrders = () => {
    navigate('/admin/orders');
  };

  // Mostrar loading enquanto verifica
  if (isChecking) {
    return (
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, não renderiza (já redirecionou)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminPage
      products={products}
      onAddProduct={onAddProduct}
      onEditProduct={onEditProduct}
      onDeleteProduct={onDeleteProduct}
      onToggleActive={onToggleActive}
      onOrders={handleOrders}
      onBack={handleBack}
      onLogout={handleLogout}
    />
  );
}
