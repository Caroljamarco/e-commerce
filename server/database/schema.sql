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
