import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui";
import { Button, Input, Label } from "../ui";
import { Lock, User } from "lucide-react";
import "./login.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => boolean;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = onLogin(username, password);
    
    if (success) {
      setUsername("");
      setPassword("");
      // Não chama onClose() aqui - deixa o componente pai gerenciar a navegação
    } else {
      setError("Usuário ou senha incorretos!");
      setPassword("");
    }
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="login-modal-content">
        <DialogHeader>
          <div className="login-header">
            <div className="login-icon">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gradient">Acesso Administrativo</h2>
          </div>
          <DialogDescription>
            Digite suas credenciais para acessar o painel de administração
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <Label htmlFor="username" className="form-label">
              <User size={16} />
              Usuário
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Digite seu usuário"
              className="form-input"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <Label htmlFor="password" className="form-label">
              <Lock size={16} />
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
              className="form-input"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}

          <DialogFooter className="login-actions">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="login-btn">
              Entrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
