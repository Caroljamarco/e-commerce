# 📊 Documentação do Banco de Dados - E-commerce Batatas e Massas

## 🗄️ Visão Geral

**Banco de Dados:** `ecommerce_batata`  
**Sistema de Gerenciamento:** MySQL 8.0+  
**Servidor:** XAMPP Local (localhost:3306)  
**Usuário MySQL:** `root`  
**Senha MySQL:** (vazia no XAMPP padrão)

---

## 📋 Estrutura das Tabelas

### 1. Tabela `users` (Usuários do Sistema)

**Propósito:** Armazena informações de usuários administrativos para gerenciar o sistema (login, autenticação e permissões)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role ENUM('admin', 'manager') NOT NULL DEFAULT 'manager',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 📝 Descrição dos Campos:

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único do usuário |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | Nome de usuário para login (único no sistema) |
| `password` | VARCHAR(255) | NOT NULL | Senha criptografada com bcrypt (hash) |
| `name` | VARCHAR(100) | NOT NULL | Nome completo do usuário |
| `role` | ENUM | NOT NULL | Papel do usuário: `admin` (acesso total) ou `manager` (apenas produtos) |
| `active` | BOOLEAN | DEFAULT TRUE | Status do usuário (TRUE = ativo, FALSE = desativado) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data e hora de criação do registro |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Data e hora da última atualização |

#### 🔑 Usuário Padrão (Root):

```sql
INSERT INTO users (username, password, name, role, active) VALUES 
('root', '$2b$10$qzlCTX185IAdrzlsBnsyi.Ux/yI6pf6cOK.M52Vmi2IFtHVh3RpqO', 
 'Administrador Root', 'admin', TRUE);
```

**Credenciais de Login:**
- **Usuário:** `root`
- **Senha:** `admin`
- **Role:** `admin` (acesso total)

**⚠️ Observação:** A senha é armazenada como hash bcrypt. O hash `$2b$10$qzlCTX185IAdr...` corresponde à senha `admin`.

---

### 2. Tabela `products` (Produtos do E-commerce)

**Propósito:** Armazena todos os produtos disponíveis para venda no e-commerce

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índice para melhorar performance em buscas por categoria
CREATE INDEX IF NOT EXISTS idx_category ON products(category);
```

#### 📝 Descrição dos Campos:

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único do produto |
| `name` | VARCHAR(255) | NOT NULL | Nome do produto |
| `price` | DECIMAL(10,2) | NOT NULL | Preço do produto (ex: 18.90) |
| `description` | TEXT | - | Descrição detalhada do produto |
| `image` | VARCHAR(500) | - | URL da imagem do produto |
| `category` | VARCHAR(100) | NOT NULL | Categoria: `potato` (batatas) ou `pasta` (massas) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de cadastro do produto |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Data da última modificação |

#### 📦 Categorias Válidas:
- **`potato`** - Batatas Recheadas
- **`pasta`** - Massas

#### 🗂️ Índices:
- **`idx_category`**: Índice na coluna `category` para buscas rápidas por categoria

#### 📊 Dados de Exemplo:

```sql
-- Batatas Recheadas
INSERT INTO products (name, price, description, image, category) VALUES
('Batata Assada Simples', 12.00, 'Batata assada com manteiga', 'url-imagem', 'potato'),
('Batata com Carne', 18.00, 'Batata recheada com carne moída e queijo', 'url-imagem', 'potato'),
('Batata com Frango', 16.00, 'Batata recheada com frango desfiado', 'url-imagem', 'potato'),
('Batata Vegetariana', 15.00, 'Batata com legumes e queijo', 'url-imagem', 'potato'),
('Batata Especial', 20.00, 'Batata com bacon, queijo e creme de leite', 'url-imagem', 'potato');

-- Massas
INSERT INTO products (name, price, description, image, category) VALUES
('Macarrão ao Molho Branco', 22.00, 'Macarrão com molho branco cremoso', 'url-imagem', 'pasta'),
('Macarrão à Bolonhesa', 24.00, 'Macarrão com molho de carne', 'url-imagem', 'pasta'),
('Macarrão ao Pesto', 23.00, 'Macarrão com molho pesto de manjericão', 'url-imagem', 'pasta'),
('Macarrão Carbonara', 26.00, 'Macarrão com bacon e molho carbonara', 'url-imagem', 'pasta'),
('Macarrão ao Molho de Tomate', 20.00, 'Macarrão tradicional ao molho de tomate', 'url-imagem', 'pasta');
```

---

## 🔧 Configuração e Setup

### 📄 Variáveis de Ambiente (.env)

```env
# Database Configuration (XAMPP Local)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_batata
DB_PORT=3306

# Server Configuration
PORT=3000

# Session Configuration
SESSION_SECRET=batata-recheada-secret-key-2024

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 🚀 Criar Banco de Dados

#### Opção 1: Via phpMyAdmin (Recomendado para Iniciantes)

1. Abra o XAMPP Control Panel
2. Inicie o módulo **MySQL** (clique em Start)
3. Clique em **Admin** no módulo MySQL
4. No phpMyAdmin, clique na aba **SQL**
5. Cole o conteúdo do arquivo `server/database/schema.sql`
6. Clique em **Executar**
7. Repita o processo com `server/database/seeds.sql` para inserir dados de exemplo

#### Opção 2: Script Automatizado (Mais Rápido)

```bash
# Execute na pasta raiz do projeto
node server/setup-db.js
```

Este script:
- ✅ Cria o banco de dados `ecommerce_batata`
- ✅ Cria todas as tabelas
- ✅ Insere o usuário root
- ✅ Insere produtos de exemplo

#### Opção 3: MySQL CLI (Linha de Comando)

```bash
# Windows (XAMPP)
cd C:\xampp\mysql\bin

# Criar banco
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce_batata;"

# Executar schema
mysql -u root ecommerce_batata < "caminho/completo/server/database/schema.sql"

# Executar seeds
mysql -u root ecommerce_batata < "caminho/completo/server/database/seeds.sql"
```

---

## 🔐 Segurança e Criptografia

### 🔒 Criptografia de Senhas (bcrypt)

**Biblioteca:** `bcrypt` (10 rounds de salt)

**Como funciona:**
1. Usuário cria senha: `admin`
2. Sistema aplica bcrypt com 10 rounds
3. Hash gerado: `$2b$10$qzlCTX185IAdrzlsBnsyi.Ux/yI6pf6cOK.M52Vmi2IFtHVh3RpqO`
4. Hash é armazenado no banco (não a senha original)
5. No login, sistema compara hash armazenado com hash da senha digitada

**Características:**
- ✅ **Unidirecional**: Impossível reverter hash para senha original
- ✅ **Salt único**: Cada senha tem um "tempero" aleatório
- ✅ **Resistente**: Protege contra ataques de força bruta
- ✅ **Único**: Mesmo senha gera hashes diferentes cada vez

**Exemplo de geração de hash:**
```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('admin', 10); // 10 = rounds
console.log(hash); // $2b$10$...
```

### 🛡️ Validações de Dados

#### Usuários:
- **Username**: Mínimo 3 caracteres, único no sistema
- **Password**: Mínimo 4 caracteres (recomendado 8+)
- **Role**: Apenas `admin` ou `manager`
- **Proteções**:
  - ❌ Não pode deletar usuário root (id = 1)
  - ❌ Não pode deletar a si mesmo
  - ❌ Username não pode ser duplicado

#### Produtos:
- **Name**: Obrigatório, não vazio
- **Price**: Obrigatório, maior que 0
- **Category**: Apenas `potato` ou `pasta`
- **Image**: Formato URL válido

---

## 📊 Diagrama de Relacionamentos

```
┌─────────────────────────┐
│        users            │
├─────────────────────────┤
│ 🔑 id (PK)              │
│ 👤 username (UNIQUE)    │
│ 🔐 password (HASH)      │
│ 📝 name                 │
│ 🎭 role (ENUM)          │
│ ✅ active (BOOLEAN)     │
│ 📅 created_at           │
│ 🔄 updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│       products          │
├─────────────────────────┤
│ 🔑 id (PK)              │
│ 📦 name                 │
│ 💰 price (DECIMAL)      │
│ 📝 description (TEXT)   │
│ 🖼️ image (URL)          │
│ 🏷️ category             │
│ 📅 created_at           │
│ 🔄 updated_at           │
└─────────────────────────┘
```

**Nota:** Não há relacionamento direto entre tabelas (sem foreign keys). São tabelas independentes.

---

## 🛠️ Consultas SQL Úteis

### 👥 Gerenciamento de Usuários

```sql
-- Listar todos os usuários
SELECT id, username, name, role, active, created_at 
FROM users 
ORDER BY id;

-- Buscar usuário específico
SELECT * FROM users WHERE username = 'root';

-- Contar usuários por role
SELECT role, COUNT(*) as total 
FROM users 
GROUP BY role;

-- Listar apenas admins ativos
SELECT username, name 
FROM users 
WHERE role = 'admin' AND active = TRUE;

-- Desativar usuário (não deletar)
UPDATE users 
SET active = FALSE 
WHERE username = 'gerente01';

-- Mudar role de um usuário
UPDATE users 
SET role = 'admin' 
WHERE username = 'gerente01';
```

### 📦 Gerenciamento de Produtos

```sql
-- Listar todos os produtos
SELECT * FROM products ORDER BY created_at DESC;

-- Produtos por categoria
SELECT * FROM products WHERE category = 'potato';
SELECT * FROM products WHERE category = 'pasta';

-- Contar produtos por categoria
SELECT category, COUNT(*) as total, AVG(price) as preco_medio
FROM products 
GROUP BY category;

-- Produtos mais caros
SELECT name, price, category 
FROM products 
ORDER BY price DESC 
LIMIT 5;

-- Buscar produto por nome
SELECT * FROM products WHERE name LIKE '%Batata%';

-- Atualizar preço de um produto
UPDATE products 
SET price = 25.90 
WHERE id = 1;

-- Deletar produto
DELETE FROM products WHERE id = 10;
```

### 🔍 Consultas Avançadas

```sql
-- Total de produtos e valor do estoque
SELECT 
  COUNT(*) as total_produtos,
  SUM(price) as valor_total_estoque,
  MIN(price) as produto_mais_barato,
  MAX(price) as produto_mais_caro
FROM products;

-- Produtos por faixa de preço
SELECT 
  CASE 
    WHEN price < 15 THEN 'Barato'
    WHEN price BETWEEN 15 AND 25 THEN 'Médio'
    ELSE 'Caro'
  END as faixa_preco,
  COUNT(*) as quantidade
FROM products
GROUP BY faixa_preco;
```

### 🔐 Segurança e Auditoria

```sql
-- Verificar usuários criados recentemente
SELECT username, name, role, created_at 
FROM users 
WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY created_at DESC;

-- Verificar senhas que nunca foram atualizadas
SELECT username, name, created_at, updated_at
FROM users
WHERE created_at = updated_at;
```

---

## 🔄 Backup e Restore

### 💾 Fazer Backup Completo

```bash
# Windows (XAMPP)
cd C:\xampp\mysql\bin

# Backup completo do banco
mysqldump -u root ecommerce_batata > backup_ecommerce_20241103.sql

# Backup apenas estrutura (sem dados)
mysqldump -u root --no-data ecommerce_batata > schema_backup.sql

# Backup apenas dados (sem estrutura)
mysqldump -u root --no-create-info ecommerce_batata > data_backup.sql

# Backup apenas tabela específica
mysqldump -u root ecommerce_batata users > backup_users.sql
```

### 📥 Restaurar Backup

```bash
# Restaurar banco completo
mysql -u root ecommerce_batata < backup_ecommerce_20241103.sql

# Restaurar tabela específica
mysql -u root ecommerce_batata < backup_users.sql
```

### 📅 Backup Automático (Script)

Crie um arquivo `backup.bat` (Windows):
```batch
@echo off
cd C:\xampp\mysql\bin
set DATA=%date:~-4,4%%date:~-7,2%%date:~-10,2%
mysqldump -u root ecommerce_batata > "C:\backups\ecommerce_%DATA%.sql"
echo Backup realizado: ecommerce_%DATA%.sql
```

---

## 📁 Arquivos Relacionados ao Banco de Dados

| Arquivo | Localização | Descrição |
|---------|-------------|-----------|
| **schema.sql** | `server/database/schema.sql` | Estrutura das tabelas (DDL) |
| **seeds.sql** | `server/database/seeds.sql` | Dados iniciais (DML) |
| **db.js** | `server/db.js` | Configuração do pool de conexões MySQL |
| **setup-db.js** | `server/setup-db.js` | Script de criação automática |
| **auth.js** | `server/routes/auth.js` | Rotas de autenticação (login/logout) |
| **users.js** | `server/routes/users.js` | CRUD de usuários |
| **products.js** | `server/routes/products.js` | CRUD de produtos |
| **.env** | `.env` | Variáveis de ambiente (credenciais) |

---

## ⚠️ Troubleshooting (Resolução de Problemas)

### ❌ Erro: "Access denied for user 'root'@'localhost'"

**Causa:** Senha incorreta ou usuário não existe

**Solução:**
```sql
-- No MySQL CLI
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;
```

**Ou verifique o .env:**
```env
DB_USER=root
DB_PASSWORD=
```

---

### ❌ Erro: "Unknown database 'ecommerce_batata'"

**Causa:** Banco de dados não foi criado

**Solução:**
```bash
# Opção 1: Via script
node server/setup-db.js

# Opção 2: Via MySQL
mysql -u root -e "CREATE DATABASE ecommerce_batata;"
```

---

### ❌ Erro: "Table 'users' doesn't exist"

**Causa:** Tabela não foi criada

**Solução:**
```bash
# Execute o schema.sql
mysql -u root ecommerce_batata < server/database/schema.sql
```

---

### ❌ Erro: "ER_DUP_ENTRY: Duplicate entry 'root' for key 'username'"

**Causa:** Tentando inserir usuário root novamente

**Solução:** Já existe. Use `ON DUPLICATE KEY UPDATE` no INSERT ou ignore o erro.

---

### ❌ Erro: "Connection timeout" ou "ETIMEDOUT"

**Causa:** Conexão lenta ou MySQL não está rodando

**Solução:**
1. Verifique se MySQL está verde no XAMPP
2. Aumente `connectTimeout` no `db.js`:
```javascript
connectTimeout: 60000, // 60 segundos
```

---

### ❌ Erro: "Too many connections"

**Causa:** Muitas conexões abertas

**Solução:** Aumente `connectionLimit` no pool:
```javascript
connectionLimit: 10, // Aumentar de 5 para 10
```

---

## 🎓 Boas Práticas

### ✅ DO (Faça):

1. **Sempre use prepared statements** (proteção contra SQL Injection)
```javascript
// ✅ Correto
db.query('SELECT * FROM users WHERE username = ?', [username]);

// ❌ Errado (vulnerável)
db.query(`SELECT * FROM users WHERE username = '${username}'`);
```

2. **Sempre criptografe senhas**
```javascript
const hash = await bcrypt.hash(password, 10);
```

3. **Use transações para operações múltiplas**
```javascript
const connection = await pool.getConnection();
await connection.beginTransaction();
try {
  await connection.query('INSERT INTO users...');
  await connection.query('INSERT INTO logs...');
  await connection.commit();
} catch (err) {
  await connection.rollback();
}
```

4. **Feche conexões após uso**
```javascript
connection.release();
```

5. **Faça backups regulares**

### ❌ DON'T (Não faça):

1. ❌ Armazenar senhas em texto puro
2. ❌ Usar `SELECT *` em produção (especifique colunas)
3. ❌ Expor erro de banco no frontend
4. ❌ Commitar arquivo `.env` no Git
5. ❌ Usar credenciais padrão em produção

---

## 📚 Referências e Links Úteis

- **MySQL Documentation**: https://dev.mysql.com/doc/
- **bcrypt npm**: https://www.npmjs.com/package/bcrypt
- **mysql2 npm**: https://www.npmjs.com/package/mysql2
- **SQL Tutorial**: https://www.w3schools.com/sql/
- **XAMPP**: https://www.apachefriends.org/

---

## 📞 Suporte

Para dúvidas sobre o banco de dados:
1. Verifique esta documentação primeiro
2. Consulte o arquivo `AUTENTICACAO.md` para detalhes de auth
3. Veja logs do servidor: terminal onde rodou `npm run server`
4. Use phpMyAdmin para inspecionar dados visualmente

---

**Última atualização:** 03/11/2025  
**Versão do Banco:** 1.0  
**Projeto:** E-commerce Batatas Recheadas e Massas
