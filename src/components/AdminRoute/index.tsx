import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AdminPage } from "../AdminPage";
import { LoginModal } from "../LoginPage";

import type { Product } from "../../types";

// Credenciais de administrador
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

interface AdminRouteProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "id">) => void;
  onEditProduct: (id: string, product: Omit<Product, "id">) => void;
  onDeleteProduct: (id: string) => void;
  onToggleActive: (id: string) => void;
  onOrders: () => void;
}

export function AdminRoute({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onToggleActive,
  onOrders,
}: AdminRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      toast.success("Login realizado com sucesso!");
      return true;
    }
    toast.error("Usuário ou senha incorretos!");
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success("Logout realizado com sucesso!");
    navigate("/admin");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleCloseLoginModal = () => {
    navigate("/");
  };

  // Se não estiver autenticado, mostrar apenas o modal de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'hsl(var(--muted-foreground))'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            🔐
          </div>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #7e4b29 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Área Administrativa
          </h2>
          <p style={{ fontSize: '1.1rem' }}>Acesso restrito - Faça login para continuar</p>
        </div>
        
        <LoginModal
          isOpen={true}
          onClose={handleCloseLoginModal}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  // Se autenticado, mostrar página de admin
  return (
    <AdminPage
      products={products}
      onAddProduct={onAddProduct}
      onEditProduct={onEditProduct}
      onDeleteProduct={onDeleteProduct}
      onToggleActive={onToggleActive}
      onOrders={onOrders}
      onBack={handleBack}
      onLogout={handleLogout}
    />
  );
}
