import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { LoginModal } from "../LoginPage";

// Credenciais de administrador
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

export function AdminLogin() {
  const navigate = useNavigate();

  // Verificar se já está autenticado ao carregar o componente
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";
    if (isAuthenticated) {
      // Se já está autenticado, redireciona direto para o dashboard
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Salvar token de autenticação no sessionStorage
      sessionStorage.setItem("adminAuth", "true");
      toast.success("Login realizado com sucesso!");
      navigate("/admin/dashboard");
      return true;
    }
    toast.error("Usuário ou senha incorretos!");
    return false;
  };

  const handleCloseLoginModal = () => {
    navigate("/");
  };

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
