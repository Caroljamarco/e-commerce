# 📚 Documentação Técnica - Sistema E-Commerce
## Projeto Acadêmico - Análise e Desenvolvimento de Sistemas

---

## 📋 Índice
1. [Visão Geral do Projeto](#visão-geral)
2. [Conceitos Fundamentais](#conceitos-fundamentais)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Frontend (Interface do Usuário)](#frontend)
5. [Backend (Servidor)](#backend)
6. [Banco de Dados](#banco-de-dados)
7. [Fluxos de Usuário](#fluxos-de-usuário)
8. [Instalação e Configuração](#instalação-e-configuração)
9. [Deploy (Publicação)](#deploy)

---

## 🎯 Visão Geral

### O que é este projeto?
Este é um **sistema de e-commerce completo** desenvolvido para venda de **Batatas Recheadas** e **Massas Artesanais**. O diferencial é que os pedidos são enviados diretamente pelo **WhatsApp**, facilitando a comunicação entre cliente e estabelecimento.

### Objetivos do Sistema
- Permitir que clientes naveguem pelo catálogo de produtos
- Adicionar produtos ao carrinho de compras
- Finalizar pedidos com envio automático via WhatsApp
- Gerenciar produtos através de um painel administrativo

### Público-Alvo
- **Clientes:** Pessoas que desejam comprar os produtos
- **Administradores:** Funcionários/donos que gerenciam o catálogo

---

## 💡 Conceitos Fundamentais

### O que é Frontend?
É a **"parte da frente"** do sistema - tudo que o usuário vê e interage no navegador:
- Páginas web
- Botões e formulários
- Design e cores
- Animações

**Analogia:** É como a vitrine de uma loja física.

### O que é Backend?
É a **"parte de trás"** do sistema - o servidor que processa as solicitações:
- Regras de negócio
- Processamento de dados
- Comunicação com banco de dados
- Segurança

**Analogia:** É como o estoque e a administração de uma loja física.

### O que é Banco de Dados?
É onde os dados são **armazenados permanentemente**:
- Produtos disponíveis
- Informações de cada produto
- Histórico

**Analogia:** É como o arquivo/fichário de uma loja.

### O que é API REST?
É a **forma de comunicação** entre Frontend e Backend:
- Frontend faz **requisições** (pedidos)
- Backend responde com **dados**
- Usa protocolo HTTP (mesmo da internet)

**Analogia:** É como um garçom que leva pedidos do cliente para a cozinha.

---

## 🌟 Funcionalidades do Sistema

### Para Clientes:
- ✅ Ver catálogo de produtos organizados por categoria
- ✅ Adicionar produtos ao carrinho com quantidade e observações
- ✅ Visualizar resumo do pedido em tempo real
- ✅ Preencher dados de entrega com busca automática de CEP
- ✅ Escolher entre entrega ou retirada
- ✅ Enviar pedido diretamente pelo WhatsApp
- ✅ Alternar entre tema claro e escuro

### Para Administradores:
- ✅ Login protegido por senha
- ✅ Adicionar novos produtos ao catálogo
- ✅ Editar informações de produtos existentes
- ✅ Excluir produtos do catálogo
- ✅ Visualizar todos os produtos por categoria
- ✅ Fazer logout com segurança

### Recursos Técnicos:
- ✅ Design responsivo (funciona em celular, tablet e computador)
- ✅ Integração com API de CEP (ViaCEP)
- ✅ Máscaras automáticas para telefone e CEP
- ✅ Notificações visuais (toasts)
- ✅ Validação de formulários

---

## 🛠️ Tecnologias Utilizadas (Stack)

### Frontend (Lado do Cliente)

#### React 19.1.1
**O que é:** Biblioteca JavaScript para criar interfaces de usuário  
**Por que usar:** Permite criar componentes reutilizáveis e atualizações eficientes na tela  
**Analogia:** É como ter blocos de LEGO que você pode reutilizar em diferentes páginas

#### TypeScript 5.8.3
**O que é:** JavaScript com tipagem (define o tipo de cada variável)  
**Por que usar:** Previne erros e facilita manutenção do código  
**Exemplo:** Em vez de `let idade`, você escreve `let idade: number`

#### Vite 7.1.7
**O que é:** Ferramenta para desenvolvimento e build do projeto  
**Por que usar:** Muito rápido e facilita o desenvolvimento  
**Função:** Compila o código e cria servidor de desenvolvimento

#### React Router DOM 7.9.4
**O que é:** Biblioteca para navegação entre páginas  
**Por que usar:** Cria Single Page Application (SPA) sem recarregar a página  
**Função:** Gerencia rotas como `/`, `/admin`, `/admin/dashboard`

#### CSS Puro
**O que é:** Linguagem de estilização  
**Por que usar:** Controle total sobre o design sem dependências  
**Características:** Variáveis CSS, media queries responsivas

#### Bibliotecas Auxiliares
- **Lucide React:** Ícones modernos (carrinho, lixeira, etc.)
- **IMask 7.6.1:** Máscaras automáticas (telefone, CEP)
- **Sonner 2.0.7:** Notificações estilo "toast"

---

### Backend (Lado do Servidor)

#### Node.js >= 18.18.0
**O que é:** Ambiente para executar JavaScript no servidor  
**Por que usar:** Permite usar JavaScript tanto no frontend quanto no backend  
**Função:** Executa o código do servidor

#### Express 5.1.0
**O que é:** Framework web minimalista para Node.js  
**Por que usar:** Facilita criação de APIs REST  
**Função:** Gerencia rotas, requisições e respostas HTTP

#### MySQL2 3.15.3
**O que é:** Driver para conectar Node.js ao MySQL  
**Por que usar:** Permite executar queries SQL do JavaScript  
**Função:** Ponte entre aplicação e banco de dados

#### CORS 2.8.5
**O que é:** Middleware para Cross-Origin Resource Sharing  
**Por que usar:** Permite que frontend e backend em domínios diferentes se comuniquem  
**Função:** Configuração de segurança

#### dotenv 17.2.3
**O que é:** Carrega variáveis de ambiente de arquivo .env  
**Por que usar:** Mantém dados sensíveis (senhas, URLs) fora do código  
**Função:** Gerenciamento de configurações

---

### Banco de Dados

#### MySQL 8.0+
**O que é:** Sistema de Gerenciamento de Banco de Dados Relacional (SGBD)  
**Por que usar:** Robusto, amplamente usado, suporta relações complexas  
**Tipo:** SQL (Structured Query Language)  
**Características:** 
- Tabelas com linhas e colunas
- Relacionamentos entre tabelas
- Transações ACID

#### Aiven Cloud
**O que é:** Plataforma de hospedagem de bancos de dados  
**Por que usar:** Banco na nuvem, não precisa instalar localmente em produção  
**Vantagens:**
- Alta disponibilidade
- Backups automáticos
- Acesso remoto seguro

---

## 📊 Padrões e Conceitos Aplicados

### Padrão MVC (Model-View-Controller)
**Separação de responsabilidades:**
- **Model (Modelo):** Banco de dados MySQL
- **View (Visão):** Componentes React
- **Controller (Controlador):** Rotas Express

### API RESTful
**Princípios aplicados:**
- Uso correto de métodos HTTP (GET, POST, PUT, DELETE)
- URLs descritivas (`/api/products`, `/api/products/:id`)
- Respostas em JSON
- Stateless (sem estado entre requisições)

### Componentização
**React Components:**
- Componentes pequenos e reutilizáveis
- Props para passagem de dados
- State para dados dinâmicos
- Hooks para lógica (useState, useEffect)

### Responsividade
**Mobile First:**
- Design pensado primeiro para mobile
- Media queries para adaptar a telas maiores
- Breakpoints: 640px, 768px, 1024px

### Segurança
**Medidas implementadas:**
- Prepared Statements (prevenção SQL Injection)
- Validação de dados no frontend e backend
- Autenticação via sessionStorage
- Variáveis de ambiente para dados sensíveis

---

## 🏗️ Arquitetura do Sistema

### Estrutura de Diretórios

```
meu-projeto/
├── api/                          # Serverless functions (Vercel)
│   ├── _db.ts                   # Configuração DB para serverless
│   └── products/
│       ├── index.ts             # GET all, POST create
│       └── [id].ts              # GET, PUT, DELETE por ID
│
├── server/                       # Backend Express (desenvolvimento)
│   ├── index.js                 # Servidor principal
│   ├── db.js                    # Configuração conexão MySQL
│   ├── routes/
│   │   └── products.js          # Rotas CRUD de produtos
│   └── database/
│       ├── schema.sql           # Estrutura das tabelas
│       └── seeds.sql            # Dados de exemplo
│
├── src/                         # Frontend React
│   ├── main.tsx                # Entry point
│   ├── App.tsx                 # Componente raiz com rotas
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── services/
│   │   ├── api.ts              # Service para API de produtos
│   │   ├── whatsapp.ts         # Integração WhatsApp
│   │   └── cep.ts              # Consulta ViaCEP
│   ├── components/
│   │   ├── HomePage/           # Página principal (clientes)
│   │   ├── AdminLogin/         # Login administrativo
│   │   ├── AdminDashboard/     # Dashboard protegido
│   │   ├── AdminPage/          # Página de gerenciamento
│   │   ├── Cart/               # Carrinho de compras
│   │   ├── CheckoutModal/      # Modal de finalização
│   │   ├── ProductCard/        # Card de produto
│   │   ├── ProductCarousel/    # Carrossel de produtos
│   │   ├── ThemeToggle/        # Toggle tema claro/escuro
│   │   ├── AddToCartModal/     # Modal adicionar ao carrinho
│   │   └── ui/                 # Componentes de UI reutilizáveis
│   │       ├── Button/
│   │       ├── Card/
│   │       ├── Dialog/
│   │       ├── Input/
│   │       ├── Label/
│   │       ├── Textarea/
│   │       └── Badge/
│   └── styles/
│       ├── globals.css         # Estilos globais e variáveis CSS
│       └── theme.ts            # Configuração de tema
│
├── public/                      # Arquivos estáticos
│   └── logobatata.png          # Logo da aplicação
│
├── package.json                 # Dependências e scripts
├── vite.config.ts              # Configuração Vite
├── tsconfig.json               # Configuração TypeScript
├── vercel.json                 # Configuração deploy Vercel
└── .env                        # Variáveis de ambiente (não commitado)
```

### 🔄 Fluxo de Dados (Como a Informação Trafega)

**Analogia:** É como fazer um pedido em um restaurante:

1. **Cliente (Browser)** → Você olha o cardápio e faz o pedido
2. **Frontend (React)** → Garçom que anota e leva até a cozinha  
3. **Backend (Express)** → Cozinha que prepara o pedido
4. **Banco de Dados (MySQL)** → Despensa com todos os ingredientes

```
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│    CLIENTE      │  HTTP    │    FRONTEND     │  HTTP    │    BACKEND      │
│   (Browser)     │ ───────> │     React       │ ───────> │    Express      │
│                 │ <─────── │   TypeScript    │ <─────── │     Node.js     │
└─────────────────┘   JSON   └─────────────────┘   JSON   └─────────────────┘
                                                                    │
                                                                    │ SQL
                                                                    ▼
                                                            ┌─────────────────┐
                                                            │  BANCO DE DADOS │
                                                            │      MySQL      │
                                                            │     (Aiven)     │
                                                            └─────────────────┘
```

**Exemplo prático - Adicionar produto ao carrinho:**

1. Cliente clica em "Adicionar ao carrinho"
2. Frontend captura o evento e atualiza estado local (useState)
3. Carrinho lateral aparece com o produto
4. Ao finalizar pedido, frontend envia requisição HTTP POST ao backend
5. Backend valida dados e consulta/atualiza banco de dados
6. Banco responde ao backend se operação foi bem-sucedida
7. Backend retorna resposta ao frontend (sucesso/erro)
8. Frontend exibe notificação ao cliente

---

## 🎨 Frontend (Interface do Usuário)

> **O que é Frontend?** É tudo que o usuário vê e interage no navegador: botões, imagens, textos, formulários.

### 🛣️ Rotas da Aplicação (Páginas)

**O que são rotas?** São os "endereços" das páginas dentro da aplicação (SPA - Single Page Application).

| Rota | Componente | Para quem? | Descrição | Proteção |
|------|------------|------------|-----------|----------|
| `/` | `HomePage` | 👥 Clientes | Página inicial com catálogo de produtos | ✅ Pública |
| `/admin` | `AdminLogin` | 👤 Admin | Tela de login administrativo | ✅ Pública |
| `/admin/dashboard` | `AdminDashboard` | 👤 Admin | Painel de gerenciamento (CRUD produtos) | 🔒 Protegida |

**Como funciona a proteção?**  
- Rotas protegidas verificam se existe autenticação no `sessionStorage`
- Se não autenticado, redireciona para `/admin`
- Componente `AdminRoute` faz essa verificação

### 🧩 Componentes Principais (Blocos da Interface)

**O que é um componente React?**  
É um pedaço reutilizável da interface. Como peças de LEGO que você monta para criar a aplicação completa.

---

#### 📄 1. App.tsx (Componente Raiz)

**O que faz:** É o "maestro" da aplicação - coordena tudo  
**Responsabilidade:** Gerencia estado global e define rotas

**Estado gerenciado:**
```typescript
products: Product[]  // Lista de todos os produtos carregados
loading: boolean     // Indica se está carregando dados
```

**Funções importantes:**
```typescript
loadProducts()                      // Busca produtos da API
handleAddProduct(productData)       // Adiciona novo produto
handleEditProduct(id, productData)  // Atualiza produto existente
handleDeleteProduct(id)             // Remove produto
```

**Como funciona:**
1. Ao iniciar, chama `loadProducts()` para buscar produtos da API
2. Passa `products` e funções como props para componentes filhos
3. Define rotas com React Router (`/`, `/admin`, `/admin/dashboard`)

---

#### 🏠 2. HomePage (Página do Cliente)

**O que faz:** Página inicial onde clientes veem e compram produtos  
**Responsabilidade:** Catálogo de produtos + carrinho de compras

**Recursos:**
- 🎠 Carrosséis de produtos organizados por categoria
- 🛒 Carrinho lateral fixo (sticky)
- ➕ Modal para adicionar produto (quantidade, observação)
- ✅ Modal de checkout (dados pessoais, endereço)
- 🌙 Botão alternar tema (dark/light)

**Estado gerenciado:**
```typescript
cartItems: CartItem[]           // Produtos no carrinho
selectedProduct: Product | null // Produto clicado (para modal)
isAddToCartModalOpen: boolean   // Controla modal adicionar
isCheckoutModalOpen: boolean    // Controla modal finalizar
```

**Fluxo de uso:**
1. Cliente vê produtos em carrosséis
2. Clica em "Adicionar ao carrinho"
3. Modal abre para definir quantidade/observação
4. Produto é adicionado ao carrinho lateral
5. Cliente clica em "Finalizar Pedido"
6. Modal de checkout abre para preencher dados
7. Ao confirmar, gera pedido no WhatsApp

---

#### 🔐 3. AdminDashboard (Proteção de Rota)

**O que faz:** Garante que só administradores acessem painel admin  
**Responsabilidade:** Verificar autenticação e controlar acesso

**Como funciona a verificação:**
```typescript
// Checa se há autenticação salva no navegador
const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";

// Se não autenticado → redireciona para /admin
// Se autenticado → mostra AdminPage
```

**Por que sessionStorage?**
- Armazena dados temporários no navegador
- Dados são perdidos ao fechar aba (mais seguro)
- Alternativa: localStorage (persiste mesmo após fechar)

---

#### 🔑 4. AdminLogin (Tela de Login)

**O que faz:** Autentica administradores para acessar painel  
**Responsabilidade:** Validar credenciais e criar sessão

**Credenciais padrão:**
```typescript
Usuário: "admin"
Senha: "admin123"
```

**Fluxo de login:**
1. Admin digita usuário e senha
2. Sistema valida (comparação simples - sem banco)
3. Se correto: salva `adminAuth = true` no sessionStorage
4. Redireciona para `/admin/dashboard`
5. Se incorreto: exibe mensagem de erro

**⚠️ Nota de segurança:**  
Autenticação atual é simples (hardcoded). Em produção real deveria:
- Validar contra banco de dados
- Usar hash de senha (bcrypt)
- Implementar JWT (JSON Web Tokens)
- Rate limiting para prevenir ataques

---

#### ⚙️ 5. AdminPage (Painel de Gerenciamento)

**O que faz:** Interface CRUD completa para gerenciar produtos  
**Responsabilidade:** Criar, visualizar, editar e deletar produtos

**Funcionalidades:**
- 📋 Listagem de produtos organizados por categoria
- ➕ Adicionar novo produto (modal com formulário)
- ✏️ Editar produto existente (modal pré-preenchido)
- 🗑️ Excluir produto (modal de confirmação)
- 🚪 Botão de logout (limpa sessão)

**CRUD - O que significa?**
- **C**reate (Criar): Adicionar novo produto
- **R**ead (Ler): Visualizar lista de produtos
- **U**pdate (Atualizar): Editar informações do produto
- **D**elete (Deletar): Remover produto

---

#### 🛒 6. Cart (Carrinho de Compras)

**O que faz:** Exibe produtos adicionados e gerencia quantidades  
**Responsabilidade:** Manipulação de itens do carrinho

**Funcionalidades:**
- 📦 Listar produtos adicionados
- ➕➖ Aumentar/diminuir quantidade
- 🗑️ Remover item do carrinho
- 💰 Calcular total automaticamente
- ✅ Botão "Finalizar Pedido"

**Como funciona o cálculo:**
```typescript
// Para cada item: preço × quantidade
// Total = soma de todos os itens
const total = cartItems.reduce((sum, item) => 
  sum + (item.price * item.quantity), 0
);
```

**Estado:**
- Carrinho fica fixo na lateral direita (sticky position)
- Acompanha scroll da página
- Responsivo: vira drawer (gaveta) no mobile

---

#### 📋 7. CheckoutModal (Finalizar Pedido)

**O que faz:** Coleta dados do cliente para enviar pedido  
**Responsabilidade:** Formulário completo de checkout

**Dados coletados:**
```typescript
interface CustomerData {
  name: string;              // Nome completo
  phone: string;             // (00) 00000-0000
  deliveryType: string;      // "delivery" ou "pickup"
  
  // Campos de endereço (se delivery)
  cep?: string;              // 00000-000
  street?: string;           // Preenchido automaticamente
  number?: string;
  complement?: string;
  neighborhood?: string;     // Preenchido automaticamente
  city?: string;             // Preenchido automaticamente
  uf?: string;               // Preenchido automaticamente
  
  additionalComments: string; // Observações
}
```

**Funcionalidades inteligentes:**

1. **Máscaras automáticas (IMask):**
   - Telefone: `(00) 00000-0000`
   - CEP: `00000-000`

2. **Busca de CEP (ViaCEP API):**
   - Cliente digita CEP
   - Sistema busca automaticamente: rua, bairro, cidade, estado
   - Cliente só precisa completar número e complemento

3. **Validação:**
   - Campos obrigatórios marcados
   - Valida formato de telefone e CEP
   - Se "delivery" → endereço obrigatório
   - Se "pickup" → endereço opcional

4. **Finalização:**
   - Gera mensagem formatada
   - Abre WhatsApp com pedido pronto
   - Cliente só precisa enviar

---

### 🔌 Services (Camada de Serviços)

**O que são Services?**  
Camada intermediária que encapsula comunicação com APIs externas. Separa lógica de negócio dos componentes.

**Por que usar?**  
- Reutilização: vários componentes usam o mesmo service
- Manutenção: se API mudar, altera só o service
- Organização: componentes ficam mais limpos

---

#### 🌐 api.ts - Product Service

**Função:** Comunicação com API de produtos (backend)

**Endpoint Base:**
- 🌍 **Produção:** `/api` (mesmo domínio - Vercel)
- 💻 **Desenvolvimento:** `http://localhost:3000/api` (Express local)

**Métodos disponíveis:**
```typescript
// Buscar todos os produtos
productService.getAll() 
// → GET /api/products

// Buscar por categoria específica
productService.getByCategory(category) 
// → GET /api/products?category=doces

// Buscar produto específico por ID
productService.getById(id) 
// → GET /api/products/5

// Criar novo produto
productService.create(product) 
// → POST /api/products
productService.update(id, product) // PUT /api/products/:id
productService.delete(id) // DELETE /api/products/:id
```

#### whatsapp.ts - WhatsApp Integration
**Funcionalidades:**
- `sendOrderToRestaurant()` - Envia pedido para o restaurante
- `sendConfirmationToCustomer()` - Envia confirmação para o cliente

**Números WhatsApp:**
```typescript
const restaurantPhone = "5516993343948";
const customerPhone = customerData.phone; // Dinâmico
```

**Formato da Mensagem:**
```
🛵 NOVO PEDIDO

Cliente: João Silva
Telefone: (16) 99334-3948
Entrega: Rua Exemplo, 123

ITENS DO PEDIDO:
- 2x Batata com Carne (R$ 18.00)
  Obs: Sem cebola
- 1x Macarrão Carbonara (R$ 26.00)

TOTAL: R$ 62.00

Observações: Entregar após 19h
```

#### cep.ts - CEP Lookup
**API:** ViaCEP (https://viacep.com.br/ws/{cep}/json/)

**Função:**
```typescript
searchCEP(cep: string): Promise<ViaCEPResponse>
```

**Retorno:**
```typescript
{
  cep: string;
  logradouro: string; // Rua
  bairro: string;
  localidade: string; // Cidade
  uf: string;
  complemento: string;
}
```

### Tipos TypeScript

#### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "potato" | "pasta";
}
```

#### CartItem
```typescript
interface CartItem {
  product: Product;
  quantity: number;
  comment?: string; // Observação do cliente
}
```

#### CustomerData
```typescript
interface CustomerData {
  name: string;
  phone: string;
  deliveryType: "delivery" | "pickup";
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  additionalComments: string;
}
```

### Estilização

#### Sistema de Temas
**Variáveis CSS (globals.css):**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 22 61% 45%;
  --card: 0 0% 100%;
  /* ... mais variáveis */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... cores invertidas */
}
```

#### CSS Customizado
- Estilização baseada em classes customizadas e CSS modules
- Variáveis CSS para temas (claro/escuro)
- Cores baseadas em HSL para fácil manipulação
- Media queries para responsividade
- Breakpoints: 640px, 768px, 1024px, 1280px, 1400px
- Dark mode via classe `.dark` no elemento raiz

---

## 🔧 Backend

### Servidor Express (server/index.js)

**Configuração:**
```javascript
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir requisições cross-origin
app.use(express.json()); // Parse JSON

// Rotas
app.use('/api/products', productsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
```

### Conexão com Banco de Dados (server/db.js)

**Pool de Conexões:**
```javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3306,
  ssl: false, // Desabilitado para MySQL local
  connectTimeout: 60000,
  connectionLimit: 5,
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true
});

module.exports = pool.promise(); // Exporta versão com promises
```

### API REST - Products Routes

#### GET /api/products
**Descrição:** Lista todos os produtos

**Response:**
```json
[
  {
    "id": "1",
    "name": "Batata Assada Simples",
    "price": 12.00,
    "description": "Batata assada com manteiga",
    "image": "https://...",
    "category": "potato"
  }
]
```

#### GET /api/products/:id
**Descrição:** Busca produto por ID

**Response:**
```json
{
  "id": "1",
  "name": "Batata Assada Simples",
  "price": 12.00,
  "description": "Batata assada com manteiga",
  "image": "https://...",
  "category": "potato"
}
```

**Erros:**
- `404` - Produto não encontrado

#### POST /api/products
**Descrição:** Cria novo produto

**Request Body:**
```json
{
  "name": "Novo Produto",
  "price": 25.00,
  "description": "Descrição do produto",
  "image": "https://...",
  "category": "potato"
}
```

**Response:**
```json
{
  "id": "11",
  "name": "Novo Produto",
  "price": 25.00,
  "description": "Descrição do produto",
  "image": "https://...",
  "category": "potato"
}
```

#### PUT /api/products/:id
**Descrição:** Atualiza produto existente

**Request Body:**
```json
{
  "name": "Produto Atualizado",
  "price": 30.00,
  "description": "Nova descrição",
  "image": "https://...",
  "category": "potato"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "Produto Atualizado",
  "price": 30.00,
  "description": "Nova descrição",
  "image": "https://...",
  "category": "potato"
}
```

**Erros:**
- `404` - Produto não encontrado

#### DELETE /api/products/:id
**Descrição:** Remove produto

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

**Erros:**
- `404` - Produto não encontrado

### Helper Functions

```javascript
// Formata produto para garantir tipos corretos
const formatProduct = (product) => ({
  ...product,
  id: product.id.toString(),
  price: parseFloat(product.price)
});
```

---

## 🗄️ Banco de Dados

### Estrutura do Banco

**Nome:** Configurável via `.env` (DB_NAME)

**Tabelas:** 1 tabela principal

### Tabela: products

**Schema:**
```sql
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_category ON products(category);
```

**Campos:**
| Campo | Tipo | Descrição | Obrigatório | Default |
|-------|------|-----------|-------------|---------|
| `id` | INT | Chave primária auto-incremento | Sim | AUTO |
| `name` | VARCHAR(255) | Nome do produto | Sim | - |
| `price` | DECIMAL(10,2) | Preço (ex: 25.50) | Sim | - |
| `description` | TEXT | Descrição detalhada | Não | NULL |
| `image` | VARCHAR(500) | URL da imagem | Não | NULL |
| `category` | VARCHAR(100) | Categoria: "potato" ou "pasta" | Sim | - |
| `created_at` | TIMESTAMP | Data de criação | Sim | CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Data de atualização | Sim | CURRENT_TIMESTAMP |

**Índices:**
- `PRIMARY KEY` em `id`
- `INDEX idx_category` em `category` (otimiza consultas por categoria)

### Seeds (Dados de Exemplo)

**Batatas (5 produtos):**
1. Batata Assada Simples - R$ 12.00
2. Batata com Carne - R$ 18.00
3. Batata com Frango - R$ 16.00
4. Batata Vegetariana - R$ 15.00
5. Batata Especial - R$ 20.00

**Massas (5 produtos):**
1. Macarrão ao Molho Branco - R$ 22.00
2. Macarrão à Bolonhesa - R$ 24.00
3. Macarrão ao Pesto - R$ 23.00
4. Macarrão Carbonara - R$ 26.00
5. Macarrão ao Molho de Tomate - R$ 20.00

**Todas com imagens do Unsplash**

### Queries Principais

**Listar todos os produtos:**
```sql
SELECT * FROM products ORDER BY id DESC;
```

**Buscar por categoria:**
```sql
SELECT * FROM products WHERE category = 'potato' ORDER BY id DESC;
```

**Buscar por ID:**
```sql
SELECT * FROM products WHERE id = ?;
```

**Inserir produto:**
```sql
INSERT INTO products (name, price, description, image, category) 
VALUES (?, ?, ?, ?, ?);
```

**Atualizar produto:**
```sql
UPDATE products 
SET name = ?, price = ?, description = ?, image = ?, category = ? 
WHERE id = ?;
```

**Deletar produto:**
```sql
DELETE FROM products WHERE id = ?;
```

---

## 👥 Fluxos de Usuário

### Fluxo do Cliente (Compra)

```
1. Cliente acessa a página principal (/)
   ↓
2. Visualiza produtos em carrosséis (Batatas e Massas)
   ↓
3. Clica em "Adicionar ao Carrinho" em um produto
   ↓
4. Modal abre para selecionar quantidade e adicionar observação
   ↓
5. Confirma adição ao carrinho
   ↓
6. Item aparece no carrinho (sidebar em desktop, abaixo em mobile)
   ↓
7. Repete passos 3-6 para mais produtos
   ↓
8. Clica em "Finalizar Pedido" no carrinho
   ↓
9. Modal de checkout abre
   ↓
10. Preenche dados pessoais (nome, telefone)
    ↓
11. Escolhe tipo de entrega (Delivery ou Retirada)
    ↓
12. Se Delivery:
    - Insere CEP
    - Sistema busca endereço automaticamente (ViaCEP)
    - Completa número e complemento
    ↓
13. Adiciona observações adicionais (opcional)
    ↓
14. Clica em "Enviar Pedido"
    ↓
15. Sistema abre WhatsApp com mensagem formatada para restaurante
    ↓
16. Cliente envia mensagem
    ↓
17. Sistema abre novo WhatsApp com confirmação para cliente
    ↓
18. Carrinho é limpo
    ↓
19. Cliente recebe toast de sucesso
```

### Fluxo do Administrador (Gerenciamento)

```
1. Admin acessa /admin
   ↓
2. Modal de login abre automaticamente
   ↓
3. Insere credenciais (admin/admin123)
   ↓
4. Sistema valida credenciais
   ↓
5. Se válido:
   - Salva token em sessionStorage
   - Redireciona para /admin/dashboard
   ↓
6. Dashboard carrega produtos do banco
   ↓
7. Produtos exibidos por categoria (Batatas e Massas)
   ↓
8. Admin pode:
   
   A) ADICIONAR PRODUTO:
      - Clica em "Adicionar Produto"
      - Modal abre
      - Preenche: nome, preço, descrição, URL imagem, categoria
      - Clica "Salvar"
      - Produto é criado no banco via POST /api/products
      - Lista atualiza automaticamente
      
   B) EDITAR PRODUTO:
      - Clica em "Editar" no produto desejado
      - Modal abre com dados preenchidos
      - Modifica campos desejados
      - Clica "Salvar"
      - Produto é atualizado no banco via PUT /api/products/:id
      - Lista atualiza automaticamente
      
   C) EXCLUIR PRODUTO:
      - Clica em "Excluir" no produto desejado
      - Modal de confirmação abre
      - Confirma exclusão
      - Produto é removido do banco via DELETE /api/products/:id
      - Lista atualiza automaticamente
   ↓
9. Admin pode fazer logout
   ↓
10. sessionStorage é limpo
    ↓
11. Redireciona para página principal (/)
```

### Fluxo de Autenticação

```
┌─────────────────────────────────────────┐
│  Usuário tenta acessar /admin/dashboard │
└────────────────┬────────────────────────┘
                 │
                 ▼
      ┌─────────────────────┐
      │  Está autenticado?  │
      │ (sessionStorage)    │
      └────────┬────────────┘
               │
       ┌───────┴───────┐
       │               │
      Sim             Não
       │               │
       ▼               ▼
┌────────────┐  ┌──────────────┐
│  Permite   │  │  Redireciona │
│   acesso   │  │  para /admin │
└────────────┘  └──────────────┘
```

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- **Node.js** >= 18.18.0
- **npm** ou **yarn**
- **MySQL** 8.0+ (local ou cloud)
- **Git**

### 1. Clonar Repositório

```bash
git clone https://github.com/Caroljamarco/e-commerce.git
cd meu-projeto
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=ecommerce_batatas
DB_PORT=3306

# Servidor
PORT=3000

# Frontend (opcional - para desenvolvimento)
VITE_API_URL=http://localhost:3000/api
```

### 4. Configurar Banco de Dados

#### Opção A: MySQL Local

```bash
# Conectar ao MySQL
mysql -u root -p

# Executar no prompt do MySQL:
CREATE DATABASE ecommerce_batatas;
USE ecommerce_batatas;

# Executar schema
source server/database/schema.sql;

# Executar seeds (dados de exemplo)
source server/database/seeds.sql;

# Verificar
SELECT * FROM products;
```

#### Opção B: Aiven Cloud (Produção)

1. Criar conta em https://aiven.io
2. Criar serviço MySQL
3. Copiar credenciais de conexão
4. Atualizar `.env` com dados do Aiven
5. Executar schema e seeds via MySQL Workbench ou CLI

### 5. Executar Aplicação

#### Desenvolvimento (Frontend + Backend)

**Terminal 1 - Backend:**
```bash
npm run server
# Servidor rodando em http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Frontend rodando em http://localhost:5173
```

#### Produção

```bash
# Build do frontend
npm run build

# Iniciar servidor
npm start
```

### 6. Acessar Aplicação

- **Página Principal:** http://localhost:5173
- **Área Admin:** http://localhost:5173/admin
- **API:** http://localhost:3000/api/products
- **Health Check:** http://localhost:3000/health

### 7. Credenciais de Administrador

```
Usuário: admin
Senha: admin123
```

---

## 🚀 Deploy

### Vercel (Frontend + Serverless Backend)

#### Configuração

**vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Passos para Deploy

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login na Vercel:**
```bash
vercel login
```

3. **Configurar Variáveis de Ambiente:**
   - Acessar dashboard Vercel
   - Settings > Environment Variables
   - Adicionar:
     - `DB_HOST`
     - `DB_USER`
     - `DB_PASSWORD`
     - `DB_NAME`
     - `DB_PORT`

4. **Deploy:**
```bash
vercel --prod
```

#### Serverless Functions

As funções em `/api` são automaticamente convertidas em serverless functions pela Vercel:

- `/api/products/index.ts` → `GET /api/products`, `POST /api/products`
- `/api/products/[id].ts` → `GET /api/products/:id`, `PUT /api/products/:id`, `DELETE /api/products/:id`

### Heroku (Backend Express)

#### Preparação

**Procfile:**
```
web: node server/index.js
```

#### Passos para Deploy

1. **Criar app no Heroku:**
```bash
heroku create nome-do-app
```

2. **Configurar variáveis de ambiente:**
```bash
heroku config:set DB_HOST=seu-host
heroku config:set DB_USER=seu-usuario
heroku config:set DB_PASSWORD=sua-senha
heroku config:set DB_NAME=seu-banco
heroku config:set DB_PORT=3306
```

3. **Deploy:**
```bash
git push heroku main
```

4. **Verificar logs:**
```bash
heroku logs --tail
```

### Aiven Cloud (Banco de Dados)

#### Configuração

1. **Criar conta:** https://aiven.io
2. **Criar serviço MySQL**
3. **Configurar:**
   - Cloud provider: AWS/Google/Azure
   - Região: mais próxima
   - Plano: Startup (grátis) ou Business
4. **Obter credenciais:**
   - Host
   - Port
   - User
   - Password
   - Database name
5. **Executar schema e seeds:**
   - Via MySQL Workbench
   - Via CLI
   - Via DBeaver

---

## 📱 Recursos e Funcionalidades

### Sistema de Carrinho

- **Adicionar itens:** Modal com seleção de quantidade e observações
- **Atualizar quantidade:** Botões +/- no carrinho
- **Remover itens:** Botão de lixeira
- **Cálculo automático:** Total atualiza em tempo real
- **Persistência:** Mantido em memória durante a sessão

### Integração WhatsApp

- **Mensagens formatadas:** Template profissional
- **Duplo envio:**
  1. Pedido para restaurante
  2. Confirmação para cliente
- **Números dinâmicos:** Cliente usa seu próprio número
- **Abrir automaticamente:** `window.open()` com deep link WhatsApp

### Busca de CEP

- **API:** ViaCEP (gratuita, sem limite)
- **Ativação:** Automática ao digitar 8 dígitos
- **Preenchimento:** Rua, bairro, cidade e UF preenchidos automaticamente
- **Máscara:** 00000-000

### Máscaras de Input

- **Telefone:** (00) 00000-0000
- **CEP:** 00000-000
- **Biblioteca:** IMask.js
- **Aplicação:** Automática via useRef e useEffect

### Sistema de Temas

- **Temas:** Claro e Escuro
- **Alternância:** Botão de toggle na navbar
- **Persistência:** localStorage
- **Implementação:** Classe `.dark` no HTML
- **Variáveis:** CSS custom properties

### Design Responsivo

- **Mobile First:** Design otimizado para mobile
- **Breakpoints via Media Queries:**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
  - Wide: > 1280px
- **Carrinho:**
  - Desktop: Sidebar sticky
  - Mobile: Abaixo dos produtos
- **Layout:**
  - Desktop: Grid 2 colunas (produtos + carrinho)
  - Mobile: Stack vertical

### Notificações

- **Biblioteca:** Sonner
- **Posição:** Top-center
- **Tipos:**
  - Success (verde)
  - Error (vermelho)
  - Info (azul)
- **Duração:** 3 segundos (padrão)
- **Exemplos:**
  - "Produto adicionado com sucesso!"
  - "Pedido enviado!"
  - "Erro ao carregar produtos"

---

## 🔒 Segurança

### Autenticação Admin

- **Método:** Credenciais hardcoded (desenvolvimento)
- **Storage:** sessionStorage
- **Duração:** Até fechar o navegador
- **Proteção:** Validação em cada acesso à rota protegida
- **⚠️ Produção:** Implementar JWT, bcrypt, backend auth

### CORS

- **Configuração:** Habilitado para todas as origens (desenvolvimento)
- **⚠️ Produção:** Restringir origens permitidas

```javascript
// Produção recomendado:
app.use(cors({
  origin: 'https://seu-dominio.vercel.app'
}));
```

### SQL Injection

- **Proteção:** Prepared statements (mysql2)
- **Exemplo:**
```javascript
// ✅ Seguro
db.query('SELECT * FROM products WHERE id = ?', [id]);

// ❌ Vulnerável
db.query(`SELECT * FROM products WHERE id = ${id}`);
```

### XSS (Cross-Site Scripting)

- **Proteção:** React escapa strings automaticamente
- **Inputs:** Validação no frontend e backend

---

## 🧪 Testes

### Testes Manuais

#### Frontend

1. **Navegação:**
   - [ ] Acessar página principal
   - [ ] Navegar para /admin
   - [ ] Login com credenciais corretas
   - [ ] Acesso ao dashboard após login
   - [ ] Logout funciona

2. **Carrinho:**
   - [ ] Adicionar produto ao carrinho
   - [ ] Aumentar quantidade
   - [ ] Diminuir quantidade
   - [ ] Remover item
   - [ ] Total calcula corretamente

3. **Checkout:**
   - [ ] Abrir modal de checkout
   - [ ] Máscaras funcionam (telefone, CEP)
   - [ ] Busca de CEP preenche endereço
   - [ ] Alternar delivery/retirada
   - [ ] Enviar pedido abre WhatsApp

4. **Admin:**
   - [ ] Adicionar produto
   - [ ] Editar produto
   - [ ] Excluir produto
   - [ ] Produtos aparecem imediatamente

#### Backend

1. **API:**
   - [ ] GET /api/products retorna array
   - [ ] GET /api/products/:id retorna produto
   - [ ] POST /api/products cria produto
   - [ ] PUT /api/products/:id atualiza
   - [ ] DELETE /api/products/:id remove

2. **Banco de Dados:**
   - [ ] Conexão estabelecida
   - [ ] Queries executam corretamente
   - [ ] Dados persistem após reiniciar servidor

---

## 📊 Melhorias Futuras

### Curto Prazo
- [ ] Autenticação JWT para admin
- [ ] Upload de imagens (Cloudinary/S3)
- [ ] Paginação de produtos
- [ ] Busca e filtros
- [ ] Validação de formulários com Zod
- [ ] Mensagens de erro mais detalhadas

### Médio Prazo
- [ ] Sistema de categorias dinâmico
- [ ] Múltiplos administradores
- [ ] Dashboard com estatísticas
- [ ] Histórico de pedidos
- [ ] Integração com pagamento (Stripe/PagSeguro)
- [ ] E-mail de confirmação

### Longo Prazo
- [ ] App mobile (React Native)
- [ ] Sistema de avaliações
- [ ] Programa de fidelidade
- [ ] Cupons de desconto
- [ ] Rastreamento de entrega
- [ ] Chat em tempo real

---

## 📞 Suporte

### Contatos
- **Repositório:** https://github.com/Caroljamarco/e-commerce
- **Branch:** e-commerce-v2
- **WhatsApp Restaurante:** +55 (16) 99334-3948

### Problemas Comuns

#### "Erro ao conectar ao banco"
- Verificar credenciais no `.env`
- Confirmar que MySQL está rodando
- Testar conexão: `mysql -h host -u user -p`

#### "CORS error"
- Verificar se backend está rodando
- Confirmar URL da API no frontend
- Verificar configuração CORS no Express

#### "Produtos não carregam"
- Verificar console do navegador
- Confirmar que seeds foram executados
- Testar API diretamente: `curl http://localhost:3000/api/products`

#### "Admin não autentica"
- Limpar sessionStorage: `sessionStorage.clear()`
- Verificar credenciais: admin/admin123
- Verificar console para erros

---

## 📄 Licença

Este projeto é de uso educacional e não possui licença comercial definida.

---

## 🙏 Agradecimentos

- **Unsplash:** Imagens dos produtos
- **ViaCEP:** API de consulta de CEP
- **Aiven:** Hospedagem MySQL
- **Vercel:** Deploy frontend
- **React Community:** Bibliotecas e ferramentas

---

**Última atualização:** 31/10/2025  
**Versão:** 2.0  
**Status:** ✅ Em produção
