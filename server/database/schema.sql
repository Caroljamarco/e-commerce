-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role ENUM('admin', 'manager') DEFAULT 'manager',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  delivery_type ENUM('delivery','pickup') NOT NULL,
  payment_method ENUM('money','credit','debit','pix') NOT NULL,
  change_for VARCHAR(50),
  cep VARCHAR(10),
  street VARCHAR(255),
  number VARCHAR(20),
  complement VARCHAR(255),
  neighborhood VARCHAR(255),
  city VARCHAR(255),
  uf VARCHAR(2),
  additional_comments TEXT,
  status ENUM('recebido','em preparo','pronto','em entrega','entregue') NOT NULL DEFAULT 'recebido',
  total DECIMAL(10,2) NOT NULL,
  items JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on category for faster queries (ignora se já existir)
CREATE INDEX IF NOT EXISTS idx_category ON products(category);

-- Insert root admin user (password: admin)
-- Senha hash gerado com bcrypt para 'admin'
INSERT INTO users (username, password, name, role, active) 
VALUES ('root', '$2b$10$qzlCTX185IAdrzlsBnsyi.Ux/yI6pf6cOK.M52Vmi2IFtHVh3RpqO', 'Administrador Root', 'admin', true)
ON DUPLICATE KEY UPDATE username=username;
