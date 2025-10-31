# Sistema de Autenticação e Gerenciamento de Usuários

## 🔐 Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

O sistema agora usa MySQL local (XAMPP) com tabela de usuários.

**Estrutura:**
- `users` - Tabela de usuários com autenticação
- `products` - Tabela de produtos

### 3. Criar Banco e Tabelas

**Opção 1: Via phpMyAdmin**
1. Abra `http://localhost/phpmyadmin`
2. Crie o banco `ecommerce_batata`
3. Execute o SQL de `server/database/schema.sql`

**Opção 2: Via linha de comando**
```bash
# Navegue até a pasta bin do MySQL
cd C:\xampp\mysql\bin

# Conecte ao MySQL
mysql -u root

# Execute os comandos
CREATE DATABASE ecommerce_batata;
USE ecommerce_batata;
source C:/caminho/para/server/database/schema.sql;
source C:/caminho/para/server/database/seeds.sql;
```

## 👤 Usuário Root Padrão

Ao executar o schema.sql, um usuário administrador root é criado automaticamente:

**Credenciais:**
- **Usuário:** `root`
- **Senha:** `admin`
- **Papel:** `admin` (administrador completo)

## 🚀 Iniciar o Sistema

### Backend (Servidor)
```bash
npm run server
```

### Frontend (Interface)
```bash
npm run dev
```

## 📋 Funcionalidades

### Para Administradores (role: admin)

✅ Fazer login
✅ Gerenciar produtos (CRUD completo)
✅ Criar novos usuários
✅ Editar usuários
✅ Excluir usuários (exceto root e si mesmo)
✅ Definir papéis (admin ou manager)
✅ Ativar/desativar usuários

### Para Gerentes (role: manager)

✅ Fazer login
✅ Gerenciar produtos (CRUD completo)
❌ Não pode gerenciar usuários

## 🔒 Segurança

### Proteções Implementadas

1. **Senhas Criptografadas**
   - Todas as senhas são hash com bcrypt (salt rounds: 10)
   - Senhas nunca são armazenadas em texto plano

2. **Sessões Seguras**
   - express-session com cookie httpOnly
   - Cookies secure em produção (HTTPS)
   - Sessão expira em 24 horas

3. **Proteção de Rotas**
   - Rotas de API verificam autenticação
   - Rotas de usuários requerem papel admin
   - Frontend valida sessão antes de acessar áreas protegidas

4. **Validações**
   - Usuário mínimo 3 caracteres
   - Senha mínima 4 caracteres
   - Não permite duplicar usernames
   - Impede deletar usuário root
   - Impede deletar próprio usuário

## 📊 API Endpoints

### Autenticação

**POST** `/api/auth/login`
```json
{
  "username": "root",
  "password": "admin"
}
```

**POST** `/api/auth/logout`
- Finaliza sessão

**GET** `/api/auth/session`
- Verifica se está autenticado

### Usuários (Apenas Admin)

**GET** `/api/users`
- Lista todos os usuários

**GET** `/api/users/:id`
- Busca usuário por ID

**POST** `/api/users`
```json
{
  "username": "joao",
  "password": "senha123",
  "name": "João Silva",
  "role": "manager"
}
```

**PUT** `/api/users/:id`
```json
{
  "name": "João Silva Santos",
  "active": true
}
```

**DELETE** `/api/users/:id`
- Remove usuário (exceto root e próprio usuário)

## 🎯 Fluxo de Uso

### Primeiro Acesso

1. Certifique-se que o MySQL está rodando no XAMPP
2. Execute o `schema.sql` para criar as tabelas
3. Inicie o servidor backend: `npm run server`
4. Inicie o frontend: `npm run dev`
5. Acesse `http://localhost:5173/admin`
6. Faça login com:
   - Usuário: `root`
   - Senha: `admin`

### Criar Outros Usuários

1. Faça login como `root`
2. No dashboard admin, haverá opção para gerenciar usuários
3. Crie novos usuários com papel `admin` ou `manager`
4. Cada usuário poderá fazer login com suas credenciais

## 🛠️ Desenvolvimento

### Gerar Hash de Senha Manualmente

```bash
node server/generate-hash.js
```

Este script gera um hash bcrypt para a senha "admin" que pode ser usado no banco de dados.

### Variáveis de Ambiente (.env)

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_batata
DB_PORT=3306
PORT=3000
SESSION_SECRET=batata-recheada-secret-key-2024
FRONTEND_URL=http://localhost:5173
```

## 📝 Tipos de Papéis (Roles)

### admin
- Acesso total ao sistema
- Pode criar/editar/deletar usuários
- Pode criar/editar/deletar produtos

### manager  
- Acesso limitado
- Apenas gerenciar produtos
- Não pode acessar área de usuários

## ⚠️ Notas Importantes

1. **Usuário Root:** Não pode ser deletado do sistema
2. **Auto-deleção:** Nenhum usuário pode deletar a si mesmo
3. **Senhas:** Mínimo 4 caracteres (recomendado: 8+ caracteres)
4. **Sessões:** Expiram em 24 horas de inatividade
5. **CORS:** Configurado para aceitar requisições do frontend

## 🔄 Migração do Sistema Antigo

O sistema anterior usava autenticação hardcoded (`admin/admin123`).

Agora usa banco de dados com:
- Múltiplos usuários
- Senhas criptografadas
- Controle de papéis
- Sessões persistentes

Todos os usuários devem fazer login com as novas credenciais do banco de dados.
