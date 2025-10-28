# 🔐 Credenciais de Administrador

Para acessar o painel administrativo do sistema, utilize as seguintes credenciais:

## Acesso Administrativo

**URL:** `http://localhost:5173/admin` (ou a URL do seu servidor + `/admin`)  
**Usuário:** `admin`  
**Senha:** `admin123`

## Como Acessar

1. Acesse a URL específica do admin: `/admin`
2. Um modal de login será exibido automaticamente
3. Digite as credenciais acima
4. Clique em **Entrar**

## Funcionalidades do Painel Admin

- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Excluir produtos
- ✅ Visualizar todos os produtos por categoria
- ✅ Fazer logout com segurança

## Segurança

✅ **Melhorias implementadas:**
- URL específica para administradores (`/admin`)
- Botão Admin removido da tela principal dos clientes
- Sistema de autenticação antes de acessar o painel
- Redirecionamento automático após logout

⚠️ **IMPORTANTE:** Em um ambiente de produção, essas credenciais devem ser:
- Armazenadas de forma segura em um backend
- Criptografadas
- Validadas através de uma API REST segura
- Protegidas com tokens JWT ou sessões

Esta é uma implementação de demonstração apenas para fins de desenvolvimento.
