# 🔐 Sistema de Autenticação e Gerenciamento de Usuários

> **Para Alunos de Análise e Desenvolvimento de Sistemas (ADS)**  
> Este documento explica como funciona um sistema real de autenticação com banco de dados.

## � O Que Você Vai Aprender

- Como funciona autenticação com banco de dados
- O que é hash de senha e por que usar
- Como funcionam sessões HTTP
- Implementação de CRUD de usuários
- Controle de acesso por papéis (roles)
- Boas práticas de segurança

---

## 🎯 Configuração Inicial

### 1. Instalar Dependências

**O que são dependências?**  
São bibliotecas externas que nosso projeto precisa para funcionar. É como usar ingredientes prontos em vez de fazer tudo do zero.

```bash
npm install
```

**Principais dependências instaladas:**
- `bcrypt` - Criptografa senhas (transforma "admin" em hash ilegível)
- `express-session` - Gerencia sessões (lembra quem está logado)
- `mysql2` - Conecta Node.js com MySQL

### 2. Entender a Estrutura do Banco de Dados

**Por que usar banco de dados?**  
Antes, as credenciais estavam "hardcoded" no código (fixas). Agora usamos banco de dados para:
- ✅ Ter múltiplos usuários
- ✅ Adicionar/remover usuários sem alterar código
- ✅ Armazenar senhas com segurança (criptografadas)

**Tabelas criadas:**
- `users` - Armazena usuários e suas credenciais
- `products` - Armazena produtos (já existia)

### 3. Criar Banco de Dados e Tabelas

**O que é um schema?**  
É o "projeto" do banco de dados - define quais tabelas existem, quais campos cada uma tem, e os tipos de dados.

#### 📋 Estrutura da Tabela `users`

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,    -- Identificador único (gerado automaticamente)
  username VARCHAR(50) UNIQUE NOT NULL, -- Login do usuário (não pode repetir)
  password VARCHAR(255) NOT NULL,       -- Senha em hash (criptografada)
  name VARCHAR(100) NOT NULL,           -- Nome completo do usuário
  role ENUM('admin', 'manager'),        -- Papel: admin ou manager
  active BOOLEAN DEFAULT true,          -- Usuário ativo ou desativado
  created_at TIMESTAMP,                 -- Data de criação
  updated_at TIMESTAMP                  -- Data da última atualização
);
```

**Entendendo os campos:**
- `id`: Como RG, identifica unicamente cada usuário
- `username`: O "apelido" para fazer login (deve ser único)
- `password`: **NUNCA** armazenamos a senha real! Guardamos um "hash" (explicado abaixo)
- `role`: Define o nível de acesso (admin = total, manager = limitado)
- `active`: Permite desativar usuário sem deletá-lo

#### 🔧 Como Criar o Banco

**Opção 1: Via phpMyAdmin (mais fácil)**
1. Certifique-se que o XAMPP está com MySQL rodando
2. Abra navegador: `http://localhost/phpmyadmin`
3. Clique em "Novo" no menu lateral
4. Nome do banco: `ecommerce_batata`
5. Clique na aba "SQL"
6. Cole o conteúdo de `server/database/schema.sql`
7. Clique em "Executar"
8. Repita com `server/database/seeds.sql` (dados de exemplo)

**Opção 2: Script automatizado (mais rápido)**
```bash
# Rode este comando na pasta do projeto
node server/setup-db.js
```
Este script faz tudo automaticamente: cria tabelas e insere usuário root.

**Opção 3: Linha de comando MySQL**
```bash
# Navegue até a pasta bin do MySQL do XAMPP
cd C:\xampp\mysql\bin

# Conecte ao MySQL (sem senha no XAMPP)
mysql -u root

# Crie o banco e execute os scripts
CREATE DATABASE ecommerce_batata;
USE ecommerce_batata;
source C:/caminho/completo/server/database/schema.sql;
source C:/caminho/completo/server/database/seeds.sql;
```

---

## 👤 Usuário Root Padrão (Super Admin)

**O que é o usuário root?**  
É o primeiro usuário do sistema - o "dono". Ele tem todos os poderes e não pode ser deletado.

Ao executar o `schema.sql`, este usuário é criado automaticamente:

### 🔑 Credenciais Padrão

| Campo | Valor |
|-------|-------|
| **Usuário** | `root` |
| **Senha** | `admin` |
| **Nome** | Administrador Root |
| **Papel (Role)** | `admin` |
| **Status** | Ativo |

⚠️ **IMPORTANTE:** Em produção real, você DEVE mudar essa senha!

### 🔐 Como a Senha é Armazenada?

**Conceito: Hash de Senha**

Imagine que você tem a senha `admin`. Se alguém invadir o banco, não queremos que veja "admin" diretamente!

**O que acontece:**
1. Usuário digita: `admin`
2. Sistema aplica função bcrypt (criptografia unidirecional)
3. Banco armazena: `$2b$10$qzlCTX185IAdrzlsBnsyi.Ux/yI6pf6cOK.M52Vmi2IFtHVh3RpqO`

**Propriedades do hash:**
- ✅ Impossível reverter (não dá pra "descobrir" a senha original)
- ✅ Sempre gera o mesmo hash para a mesma senha
- ✅ Adiciona "salt" (aleatoriedade) para dificultar ataques
- ✅ Cada senha tem hash único, mesmo senhas iguais geram hashes diferentes

**Analogia:**  
É como moer café - você consegue moer o grão, mas não consegue "desmoer" e voltar ao grão original.

---

## 🚀 Como Iniciar o Sistema

**O que é Backend e Frontend?**

**Backend (Servidor):**
- Roda no computador/servidor
- Processa lógica de negócio
- Acessa banco de dados
- Valida credenciais
- **Analogia:** É como a cozinha de um restaurante

**Frontend (Interface):**
- Roda no navegador
- Mostra interface para o usuário
- Envia requisições ao backend
- **Analogia:** É como o salão do restaurante onde os clientes ficam

### 🔧 Passo a Passo para Iniciar

**1. Certifique-se que o MySQL está rodando**
- Abra XAMPP Control Panel
- Clique em "Start" no MySQL
- Deve ficar verde

**2. Abra dois terminais**

**Terminal 1 - Backend:**
```bash
npm run server
```
Aguarde mensagem: `✅ Conectado ao MySQL local (XAMPP)!`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Aguarde mensagem com URL (exemplo: `http://localhost:5173`)

**3. Acesse no navegador**
```
http://localhost:5173/admin
```

---

## 📋 Funcionalidades do Sistema

### 🎭 Conceito: Papéis (Roles)

**O que são roles?**  
Definem o que cada usuário pode fazer no sistema. É como cargos em uma empresa.

**Analogia:**
- **Admin** = Gerente da loja (faz tudo)
- **Manager** = Vendedor (só cuida dos produtos)

### 👨‍💼 Administrador (role: admin)

**Permissões completas:**

| Funcionalidade | Pode? | Descrição |
|----------------|-------|-----------|
| 🔐 Login | ✅ | Acessar sistema |
| 📦 Criar Produtos | ✅ | Adicionar novos itens |
| ✏️ Editar Produtos | ✅ | Modificar informações |
| 🗑️ Deletar Produtos | ✅ | Remover do sistema |
| 👥 Criar Usuários | ✅ | Adicionar novos usuários |
| ✏️ Editar Usuários | ✅ | Alterar dados/papéis |
| 🗑️ Deletar Usuários | ✅ | Remover (com exceções*) |
| 🔄 Ativar/Desativar | ✅ | Suspender sem deletar |
| 🎯 Definir Papéis | ✅ | Tornar admin ou manager |

**Exceções de segurança:**
- ❌ Não pode deletar usuário `root`
- ❌ Não pode deletar a si mesmo

### 👨‍💻 Gerente (role: manager)

**Permissões limitadas:**

| Funcionalidade | Pode? | Descrição |
|----------------|-------|-----------|
| 🔐 Login | ✅ | Acessar sistema |
| 📦 Criar Produtos | ✅ | Adicionar novos itens |
| ✏️ Editar Produtos | ✅ | Modificar informações |
| 🗑️ Deletar Produtos | ✅ | Remover do sistema |
| 👥 Gerenciar Usuários | ❌ | **NÃO tem acesso** |

**Por que essa limitação?**  
Managers cuidam do catálogo, mas não devem criar ou remover outros usuários. Isso previne:
- Usuários comuns criando administradores
- Funcionários removendo colegas
- Escalação não autorizada de privilégios

---

## 🔒 Segurança: Como Protegemos o Sistema

### 1. 🔐 Criptografia de Senhas (bcrypt)

**Problema:** Se alguém invadir o banco, não pode ver as senhas!

**Solução implementada:**
```javascript
// Quando usuário cadastra senha "admin123"
const hash = await bcrypt.hash("admin123", 10);
// Armazena: $2b$10$randomHashAqui...

// Quando usuário faz login
const valida = await bcrypt.compare("admin123", hashArmazenado);
// Retorna: true (senha correta) ou false (senha errada)
```

**Parâmetros:**
- `10` = "salt rounds" = quantas vezes embaralhar (mais = mais seguro, mas mais lento)
- Cada hash é único mesmo com senhas iguais
- Impossível reverter (não dá pra descobrir a senha original)

### 2. 🍪 Sessões HTTP (express-session)

**Problema:** HTTP não "lembra" quem você é entre requisições

**Como funciona:**

1. **Login bem-sucedido:**
   ```javascript
   req.session.userId = 1;
   req.session.username = "root";
   req.session.role = "admin";
   ```

2. **Servidor cria cookie:**
   - Cookie é enviado ao navegador
   - Navegador guarda e reenvia automaticamente

3. **Próximas requisições:**
   - Navegador envia cookie automaticamente
   - Servidor identifica usuário pelo cookie
   - Não precisa fazer login toda hora!

**Configurações de segurança:**
```javascript
cookie: {
  httpOnly: true,      // JavaScript não acessa (previne XSS)
  secure: true,        // Só envia via HTTPS (produção)
  maxAge: 86400000     // 24 horas (depois expira)
}
```

**Analogia:**  
É como um carimbo na sua mão em uma festa - você mostra o carimbo e o segurança deixa passar sem verificar identidade toda hora.

### 3. 🚧 Proteção de Rotas (Middleware)

**O que é middleware?**  
Função que executa ANTES da rota principal - como um segurança na porta.

**Exemplo no código:**
```javascript
// Middleware de autenticação
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  next(); // Deixa passar
};

// Middleware de admin
const requireAdmin = (req, res, next) => {
  if (req.session.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas admin' });
  }
  next();
};

// Aplicando proteção
router.get('/users', requireAuth, requireAdmin, (req, res) => {
  // Só executa se passou pelos dois middlewares
});
```

**Fluxo:**
```
Requisição → requireAuth → requireAdmin → Rota → Resposta
              ↓ não autenticado              ↓ sucesso
              401 Erro                       200 Dados
```

### 4. ✅ Validações de Dados

**Regras implementadas:**

| Campo | Validação | Por quê? |
|-------|-----------|----------|
| Username | Mínimo 3 caracteres | Evita nomes muito curtos |
| Username | Único no banco | Não pode ter 2 "admin" |
| Senha | Mínimo 4 caracteres | Força senha minimamente forte |
| Role | Apenas 'admin' ou 'manager' | Não aceita valores inválidos |
| Deletar root | Bloqueado | Protege usuário principal |
| Auto-deleção | Bloqueado | Ninguém deleta a si mesmo |

**Exemplo de validação:**
```javascript
if (username.length < 3) {
  return res.status(400).json({ 
    error: 'Usuário deve ter no mínimo 3 caracteres' 
  });
}
```

### 5. 🔍 Códigos HTTP (Status Codes)

**O que significam os números nas respostas:**

| Código | Significado | Quando usar |
|--------|-------------|-------------|
| 200 | OK | Operação bem-sucedida |
| 201 | Created | Usuário/produto criado |
| 400 | Bad Request | Dados inválidos |
| 401 | Unauthorized | Não está logado |
| 403 | Forbidden | Logado mas sem permissão |
| 404 | Not Found | Usuário não existe |
| 409 | Conflict | Username já existe |
| 500 | Server Error | Erro no servidor |

**Exemplo prático:**
```javascript
// Username já existe
res.status(409).json({ error: 'Usuário já existe' });

// Não é admin
res.status(403).json({ error: 'Apenas admin' });

// Sucesso
res.status(200).json({ message: 'Login bem-sucedido', user });
```

---

## 📊 API Endpoints (Rotas da API)

**O que é um endpoint?**  
É um "endereço" na API onde você envia requisições. Como um destino nos correios.

**Estrutura de uma requisição HTTP:**
```
MÉTODO + URL + DADOS (opcional) = RESPOSTA
```

### 🔐 Autenticação (Auth Routes)

#### POST `/api/auth/login`
**Função:** Fazer login no sistema

**Requisição:**
```json
{
  "username": "root",
  "password": "admin"
}
```

**Resposta de sucesso (200):**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "username": "root",
    "name": "Administrador Root",
    "role": "admin",
    "active": true
  }
}
```

**Resposta de erro (401):**
```json
{
  "error": "Credenciais inválidas"
}
```

**Como testar no navegador:**
```javascript
// Abra Console (F12) e cole:
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ username: 'root', password: 'admin' })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

#### POST `/api/auth/logout`
**Função:** Encerrar sessão (fazer logout)

**Requisição:** Não precisa de dados no body

**Resposta (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

#### GET `/api/auth/session`
**Função:** Verificar se usuário está logado

**Requisição:** Não precisa de dados

**Resposta - Autenticado (200):**
```json
{
  "authenticated": true,
  "user": {
    "id": 1,
    "username": "root",
    "role": "admin"
  }
}
```

**Resposta - Não autenticado (200):**
```json
{
  "authenticated": false
}
```

---

### 👥 Usuários (User Routes - Rotas Protegidas)

**🔒 IMPORTANTE:** Todas essas rotas só funcionam se você estiver logado como **admin**.

#### GET `/api/users`
**Função:** Listar todos os usuários cadastrados

**Resposta (200):**
```json
[
  {
    "id": 1,
    "username": "root",
    "name": "Administrador Root",
    "role": "admin",
    "active": true,
    "created_at": "2024-01-10T10:00:00.000Z"
  },
  {
    "id": 2,
    "username": "gerente01",
    "name": "João Silva",
    "role": "manager",
    "active": true,
    "created_at": "2024-01-11T14:30:00.000Z"
  }
]
```

#### GET `/api/users/:id`
**Função:** Buscar um usuário específico

**Exemplo:** `GET /api/users/2`

**Resposta (200):**
```json
{
  "id": 2,
  "username": "gerente01",
  "name": "João Silva",
  "role": "manager",
  "active": true
}
```

#### POST `/api/users`
**Função:** Criar novo usuário

**Requisição:**
```json
{
  "username": "joao",
  "password": "senha123",
  "name": "João Silva",
  "role": "manager"
}
```

**Validações:**
- Username: mínimo 3 caracteres
- Password: mínimo 4 caracteres (será criptografada)
- Role: "admin" ou "manager"

**Resposta (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "userId": 3
}
```

#### PUT `/api/users/:id`
**Função:** Atualizar usuário

**Requisição (campos opcionais):**
```json
{
  "name": "João Silva Santos",
  "password": "novasenha",
  "role": "admin",
  "active": false
}
```

**Resposta (200):**
```json
{
  "message": "Usuário atualizado com sucesso"
}
```

#### DELETE `/api/users/:id`
**Função:** Remover usuário

**Proteções:**
- ❌ Não pode deletar root (id 1)
- ❌ Não pode deletar a si mesmo

**Resposta (200):**
```json
{
  "message": "Usuário deletado com sucesso"
}
```

---

## 🎯 Fluxo de Uso (Como usar o sistema)

### 🚀 Primeiro Acesso - Passo a Passo

#### Passo 1: Verificar o MySQL ✅
1. Abra o **XAMPP Control Panel**
2. Clique em **Start** no módulo MySQL
3. Aguarde o status ficar **verde** ("Running")

**💡 Erro "Port 3306 in use"?** Outro programa está usando MySQL. Feche ou mude a porta no XAMPP.

---

#### Passo 2: Criar o Banco de Dados 📊
1. No XAMPP, clique em **Admin** (módulo MySQL)
2. No phpMyAdmin, clique na aba **SQL**
3. Copie TODO o conteúdo de `server/database/schema.sql`
4. Cole e clique em **Executar**

**✅ Sucesso:** Mensagens verdes "Query OK"

**O que foi criado:**
- Banco `ecommerce_batata`
- Tabela `users`
- Usuário root (username: "root", senha: "admin")

---

#### Passo 3: Instalar Dependências 📦
Terminal no VS Code (Ctrl + `):
```powershell
npm install
```

Instala: bcrypt, express-session, mysql2, etc.

---

#### Passo 4: Iniciar o Backend 🖥️
```powershell
npm run server
```

**✅ Sucesso:**
```
Server running on port 3000
✅ Conectado ao MySQL local (XAMPP)!
```

**❌ Erros comuns:**
- **ECONNREFUSED:** MySQL não está rodando
- **Access denied:** Verifique `.env` (usuário/senha do banco)

---

#### Passo 5: Iniciar o Frontend 🌐
**Novo terminal** (não feche o anterior):
```powershell
npm run dev
```

**✅ Sucesso:**
```
Local: http://localhost:5173/
```

---

#### Passo 6: Fazer Login 🔐
1. Navegador: `http://localhost:5173/admin`
2. Digite:
   - **Usuário:** `root`
   - **Senha:** `admin`
3. Clique em **Entrar**

**✅ Sucesso:** Redirecionado para Dashboard

**❌ Não funcionou?**
- Console do navegador (F12): veja erros
- Servidor backend: deve estar mostrando logs
- phpMyAdmin: confirme que root existe na tabela users

---

### 👥 Criar Outros Usuários

#### Via API (Postman/Insomnia)

**1. Login:**
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "username": "root",
  "password": "admin"
}
```

**2. Criar usuário:**
```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "username": "gerente01",
  "password": "senha123",
  "name": "João Silva",
  "role": "manager"
}
```

---

### 🔄 Admin vs Manager

| Permissão | Admin | Manager |
|-----------|:-----:|:-------:|
| Gerenciar produtos | ✅ | ✅ |
| Criar/editar/deletar usuários | ✅ | ❌ |
| Ver lista de usuários | ✅ | ❌ |
| Acessar dashboard | ✅ | ✅ |

**Quando usar:**
- **Admin:** Você e pessoas de confiança total
- **Manager:** Funcionários que só gerenciam produtos

---

## 🛠️ Desenvolvimento (Para desenvolvedores)

### 🔐 Gerar Hash de Senha Manualmente

**Quando usar:** Se você quiser criar um usuário direto no banco de dados via SQL

**Como fazer:**
```powershell
node server/generate-hash.js
```

**O que acontece:**
- Script lê a senha "admin"
- Usa bcrypt para gerar um hash
- Imprime o hash no terminal

**Exemplo de saída:**
```
Hash gerado para 'admin':
$2b$10$qzlCTX185IAdrzlsBnsyi.Ux/yI6pf6cOK.M52Vmi2IFtHVh3RpqO
```

**Como usar o hash:**
```sql
INSERT INTO users (username, password, name, role, active)
VALUES ('novoadmin', '$2b$10$qzlCTX185IAdr...', 'Novo Admin', 'admin', TRUE);
```

---

### 🔍 Testar Login via Script

**Quando usar:** Testar a API sem abrir o navegador

```powershell
node server/test-login.js
```

**O que testa:**
1. Faz requisição POST para `/api/auth/login`
2. Envia username "root" e password "admin"
3. Mostra a resposta da API

**Resposta esperada:**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "username": "root",
    "role": "admin"
  }
}
```

---

### 📝 Variáveis de Ambiente (.env)

**O que é:** Arquivo que guarda configurações sensíveis (não vai pro Git)

**Configurações importantes:**

```bash
# Banco de dados
DB_HOST=localhost           # Onde está o MySQL (XAMPP = localhost)
DB_USER=root                # Usuário do MySQL (XAMPP padrão = root)
DB_PASSWORD=                # Senha do MySQL (XAMPP vazio por padrão)
DB_NAME=ecommerce_batata    # Nome do banco criado

# Servidor
PORT=3000                   # Porta do backend

# Autenticação
SESSION_SECRET=batata-recheada-secret-key-2024    # Chave para criptografar sessões

# Frontend
FRONTEND_URL=http://localhost:5173    # URL do Vite
```

**💡 Por que cada uma existe:**

| Variável | Por que existe |
|----------|----------------|
| `DB_HOST` | Indica onde o MySQL está rodando (pode ser outro servidor) |
| `DB_USER` | Usuário com permissão no MySQL |
| `DB_PASSWORD` | Senha do usuário (XAMPP vem sem senha) |
| `DB_NAME` | Qual banco usar (evita conflitos com outros bancos) |
| `PORT` | Porta do Express (evita conflitos com outros apps) |
| `SESSION_SECRET` | Chave secreta para criptografar cookies de sessão |
| `FRONTEND_URL` | URL permitida no CORS (segurança) |

**❌ Erros comuns:**

**1. "Access denied for user"**
```bash
# Solução: Verifique DB_USER e DB_PASSWORD
DB_USER=root
DB_PASSWORD=
```

**2. "Unknown database"**
```bash
# Solução: Verifique se DB_NAME existe no phpMyAdmin
DB_NAME=ecommerce_batata
```

**3. "Port 3000 already in use"**
```bash
# Solução: Mude a porta
PORT=3001
```

---

### 🧪 Testando Conexão com o Banco

**Arquivo:** `server/db.js`

**Teste rápido:** Ao iniciar o servidor, deve aparecer:
```
✅ Conectado ao MySQL local (XAMPP)!
```

**Se der erro:**
1. Verifique se o MySQL está verde no XAMPP
2. Confira `.env` (DB_HOST, DB_USER, DB_PASSWORD)
3. Teste no phpMyAdmin se consegue acessar o banco

**Código de teste manual:**
```javascript
// Cole no terminal do Node (node)
const pool = require('./server/db.js');

pool.query('SELECT 1 + 1 AS result')
  .then(([rows]) => console.log('Resultado:', rows[0].result))
  .catch(err => console.error('Erro:', err));
```

Deve imprimir: `Resultado: 2`

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

---

## ⚠️ Notas Importantes (Leia com atenção!)

### 🔒 Segurança

**1. Usuário Root (id 1)**
- ❌ **NÃO PODE** ser deletado do sistema
- 💡 **Por quê?** É o administrador supremo. Se deletar, você perde acesso total ao sistema!

**2. Auto-deleção**
- ❌ **NÃO PODE** deletar a si mesmo
- 💡 **Por quê?** Você ficaria logado mas sem usuário no banco (erro!). Peça para outro admin deletar você.

**3. Requisitos de Senha**
- ✅ **Mínimo:** 4 caracteres (validação automática)
- 🎯 **Recomendado:** 8+ caracteres com letras, números e símbolos
- 💡 **Por quê?** Senhas curtas são fáceis de adivinhar

**Exemplos:**
```
❌ Ruim: "1234" (muito curta)
⚠️ OK: "admin123" (mínimo, mas fraca)
✅ Boa: "Batata@2024!" (longa e variada)
```

**4. Expiração de Sessão**
- ⏱️ **Tempo:** 24 horas de inatividade
- 💡 **O que acontece?** Após 24h sem mexer no sistema, você é deslogado automaticamente (segurança)
- 🔄 **Solução:** Basta fazer login novamente

**5. CORS (Cross-Origin Resource Sharing)**
- 🌐 **Configurado para:** `http://localhost:5173` (frontend Vite)
- 💡 **O que é?** Permite que o frontend (porta 5173) converse com o backend (porta 3000)
- ⚠️ **Se mudar a porta:** Atualize `FRONTEND_URL` no `.env`

---

## 🔄 Migração do Sistema Antigo

**Se você já tinha o sistema antes:**

### O que mudou?

| Antes | Agora |
|-------|-------|
| Login hardcoded no código | Login com banco de dados |
| Apenas 1 usuário (admin/admin123) | Múltiplos usuários |
| Senha em texto puro | Senhas criptografadas (bcrypt) |
| Sem controle de papéis | Admin e Manager com permissões diferentes |
| Sessão temporária (memória) | Sessão persistente (express-session) |

### Por que mudar?

**Problemas do sistema antigo:**
1. 🔓 **Inseguro:** Senha no código fonte (qualquer um que vê o código sabe a senha!)
2. 🚫 **Limitado:** Apenas 1 usuário (e se você tiver equipe?)
3. 💔 **Frágil:** Sessão some ao reiniciar o servidor
4. 🔍 **Sem rastreio:** Não sabe quem fez o quê

**Vantagens do novo sistema:**
1. 🔐 **Seguro:** Senhas criptografadas (bcrypt com salt)
2. 👥 **Escalável:** Crie quantos usuários precisar
3. 🎭 **Controle:** Admin vs Manager (permissões diferentes)
4. 📊 **Rastreável:** Sabe quem está logado e quando
5. ⏱️ **Persistente:** Sessão dura 24h mesmo se restartar o servidor

### Como migrar?

**Passo 1:** Execute o `schema.sql` (cria tabela users)
**Passo 2:** O usuário root é criado automaticamente
**Passo 3:** Use as novas credenciais:
- ❌ Antigo: `admin/admin123`
- ✅ Novo: `root/admin`

**Passo 4:** Crie usuários para sua equipe via API ou interface

**⚠️ Importante:** 
- O login antigo (`admin/admin123`) **NÃO funciona mais**
- Todos devem fazer login com usuários do banco de dados
- Se esquecer a senha, um admin pode criar um novo usuário para você

---

## 🎓 Para Estudantes de ADS

**Este sistema é um exemplo prático de:**

### 1. Arquitetura MVC
- **Model:** Tabela `users` no MySQL
- **View:** Componentes React (AdminLogin, HomePage)
- **Controller:** Rotas Express (auth.js, users.js)

### 2. Autenticação Stateful
- **Sessões:** Armazenadas no servidor (express-session)
- **Cookies:** Enviados automaticamente pelo navegador
- **Estado:** Servidor lembra quem você é entre requisições

### 3. Criptografia
- **Bcrypt:** Algoritmo de hash adaptativo
- **Salt:** Cada senha tem um "tempero" único
- **One-way:** Não dá pra "descriptografar" (só comparar)

### 4. Segurança Web
- **CORS:** Controla quem pode acessar a API
- **httpOnly:** Cookies inacessíveis via JavaScript (XSS)
- **Validation:** Entrada do usuário sempre validada

### 5. REST API
- **GET:** Buscar dados
- **POST:** Criar dados
- **PUT:** Atualizar dados
- **DELETE:** Remover dados

### Conceitos aplicados:
✅ Banco de dados relacional (MySQL)  
✅ Promises e async/await (JavaScript moderno)  
✅ Middleware (Express)  
✅ CRUD completo  
✅ Validação de dados  
✅ Tratamento de erros  
✅ Status codes HTTP  
✅ Hashing de senhas  
✅ Sessões e cookies  
✅ Role-based access control (RBAC)

**💡 Dica:** Leia o código dos arquivos comentados! Cada linha tem uma explicação do que faz.
