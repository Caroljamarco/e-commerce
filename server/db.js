const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool com promises
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_batata',
  port: parseInt(process.env.DB_PORT) || 3306,
  // Disable SSL for local MySQL or servers without SSL support
  ssl: false,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 5,
  maxIdle: 5,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection com async/await
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado ao MySQL local (XAMPP)!');
    connection.release();
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco:', err.message);
  }
})();

// Export promise-based pool
module.exports = pool;
