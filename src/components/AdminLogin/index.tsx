import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { LoginModal } from "../LoginPage";
import { authService } from "../../services/auth";

export function AdminLogin() {
  const navigate = useNavigate();

  // Verificar se já está autenticado ao carregar o componente
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await authService.checkSession();
      if (session.authenticated) {
        // Se já está autenticado, redireciona direto para o dashboard
        navigate("/admin/dashboard");
      }
    } catch (error) {
      // Não autenticado, continua na página de login
    }
  };

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login(username, password);
      
      // Salvar dados do usuário no sessionStorage
      sessionStorage.setItem("adminAuth", "true");
      sessionStorage.setItem("user", JSON.stringify(response.user));
      
      toast.success("Login realizado com sucesso!");
      navigate("/admin/dashboard");
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao fazer login");
      return false;
    }
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
