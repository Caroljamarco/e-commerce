import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { LoginModal } from "../LoginPage";
import { authService } from "../../services/auth";

export function AdminLogin() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  // Verificar se já está autenticado ao carregar o componente
  useEffect(() => {
    let mounted = true;
    
    const checkAuth = async () => {
      try {
        // Verificar sessionStorage primeiro (mais rápido)
        const isAuth = sessionStorage.getItem("adminAuth") === "true";
        
        if (isAuth) {
          // Verificar também no servidor
          const session = await authService.checkSession();
          
          if (mounted && session.authenticated) {
            navigate("/admin/dashboard", { replace: true });
            return;
          }
        }
      } catch (error) {
        // Não autenticado, continua na página de login
        console.log("Not authenticated");
      } finally {
        if (mounted) {
          setIsChecking(false);
        }
      }
    };
    
    checkAuth();
    
    return () => {
      mounted = false;
    };
  }, []); // Array vazio - executa apenas uma vez

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login(username, password);
      
      // Salvar dados do usuário no sessionStorage
      sessionStorage.setItem("adminAuth", "true");
      sessionStorage.setItem("user", JSON.stringify(response.user));
      
      toast.success("Login realizado com sucesso!");
      navigate("/admin/dashboard", { replace: true });
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao fazer login");
      return false;
    }
  };

  const handleCloseLoginModal = () => {
    navigate("/");
  };

  // Mostrar loading enquanto verifica autenticação
  if (isChecking) {
    return (
      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    );
  }

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
