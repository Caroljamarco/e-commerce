# MySQL Integration - Backend Setup

## 📁 Estrutura do Servidor

```
server/
├── index.js              # Servidor Express principal
├── db.js                 # Configuração da conexão MySQL
├── routes/
│   └── products.js       # Rotas CRUD de produtos
└── database/
    ├── schema.sql        # Estrutura das tabelas
    └── seeds.sql         # Dados de exemplo
```

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (copie de `.env.example`):
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=3306
PORT=3000
```

### 2. Criar Banco de Dados Local

```bash
# Conectar ao MySQL
mysql -u root -p

# Criar banco
CREATE DATABASE nome_do_banco;
USE nome_do_banco;

# Executar schema
source server/database/schema.sql;

# Inserir dados de exemplo
source server/database/seeds.sql;
```

### 3. Iniciar o Servidor

```bash
# Desenvolvimento (com auto-reload)
npm run server

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

### 4. Iniciar o Frontend

Em outro terminal:
```bash
npm run dev
```

## 🔌 API Endpoints

### Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products` | Lista todos os produtos |
| GET | `/api/products/:id` | Busca produto por ID |
| POST | `/api/products` | Cria novo produto |
| PUT | `/api/products/:id` | Atualiza produto |
| DELETE | `/api/products/:id` | Deleta produto |

### Exemplo de Requisições

**GET /api/products**
```bash
curl http://localhost:3000/api/products
```

**POST /api/products**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Produto",
    "price": 25.00,
    "description": "Descrição do produto",
    "image": "https://example.com/image.jpg",
    "category": "potato"
  }'
```

**PUT /api/products/1**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto Atualizado",
    "price": 30.00,
    "description": "Nova descrição",
    "image": "https://example.com/image.jpg",
    "category": "potato"
  }'
```

**DELETE /api/products/1**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

## 🔧 Integração Frontend

O frontend já está configurado para usar a API através do serviço em `src/services/api.ts`.

Configure a URL da API no arquivo `.env.local`:
```env
VITE_API_URL=http://localhost:3000/api
```

## 🗄️ Estrutura do Banco

### Tabela: products

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT AUTO_INCREMENT | Chave primária |
| name | VARCHAR(255) | Nome do produto |
| price | DECIMAL(10,2) | Preço |
| description | TEXT | Descrição |
| image | VARCHAR(500) | URL da imagem |
| category | VARCHAR(100) | Categoria (potato/pasta) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

## 📦 Dependências

Backend:
- `express` - Framework web
- `mysql2` - Driver MySQL
- `cors` - Middleware CORS
- `dotenv` - Variáveis de ambiente
- `nodemon` - Auto-reload (dev)

## 🐛 Troubleshooting

### Erro de conexão com MySQL
- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Verifique se o banco de dados foi criado

### CORS Error
- Certifique-se que o servidor está rodando na porta 3000
- Verifique se o CORS está habilitado no `server/index.js`

### Produtos não aparecem
- Verifique se o servidor está rodando
- Confirme que os dados foram inseridos (execute `seeds.sql`)
- Verifique o console do navegador para erros de API
