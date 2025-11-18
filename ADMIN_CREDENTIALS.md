# 🔐 Credenciais de Administrador

Para acessar o painel administrativo do sistema, utilize as seguintes credenciais:

## Acesso Administrativo

**URL de Login:** `http://localhost:5173/admin`  
**Usuário:** `root`  
**Senha:** `admin`

## Como Acessar

1. Acesse a URL de login do admin: `/admin`
2. Um modal de login será exibido automaticamente
3. Digite as credenciais acima
4. Clique em **Entrar**
5. Você será redirecionado para `/admin/dashboard` onde pode gerenciar os produtos

## Estrutura de Rotas

### Rotas Públicas:
- **`/`** - Página principal dos clientes (comprar produtos)

### Rotas Administrativas:
- **`/admin`** - Página de login do administrador
- **`/admin/dashboard`** - Painel de controle (protegido, requer autenticação)

## Funcionalidades do Painel Admin

- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Excluir produtos
- ✅ Visualizar todos os produtos por categoria
- ✅ Fazer logout com segurança

## Fluxo de Uso

1. **Login**: Acesse `/admin` → Faça login
2. **Gerenciar**: Você será redirecionado para `/admin/dashboard`
3. **Adicionar/Editar/Excluir**: Use os botões na interface
4. **Voltar ou Sair**: Retorna para a página inicial dos clientes

## Segurança

✅ **Implementações de segurança:**
- Rotas separadas para login e dashboard
- Proteção de rota: `/admin/dashboard` só é acessível após login
- Sessão armazenada no `sessionStorage`
- Redirecionamento automático se não autenticado
- Logout limpa a sessão e redireciona

⚠️ **IMPORTANTE:** Em um ambiente de produção, essas credenciais devem ser:
- Armazenadas de forma segura em um backend
- Criptografadas
- Validadas através de uma API REST segura
- Protegidas com tokens JWT ou sessões HTTP-only

Esta é uma implementação de demonstração apenas para fins de desenvolvimento.
