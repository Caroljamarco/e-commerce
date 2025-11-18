-- Adicionar coluna active à tabela products
-- Execute este script no MySQL para atualizar a estrutura da tabela

-- Adicionar a coluna active com valor padrão TRUE
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE AFTER category;

-- Atualizar todos os produtos existentes para ativo
UPDATE products SET active = TRUE WHERE active IS NULL;

-- Verificar resultado
SELECT id, name, category, active FROM products;
