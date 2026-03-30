const mysql = require("mysql2/promise");
require("dotenv").config();

async function viewDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT),
    });

    console.log("\n📊 ========== VISUALIZADOR DE BANCO DE DADOS ==========\n");

    // Listar tabelas
    const [tables] = await connection.query("SHOW TABLES");
    console.log("📋 Tabelas no banco:");
    console.table(tables);

    // Produtos
    console.log("\n🛍️  PRODUTOS:");
    const [products] = await connection.query("SELECT * FROM products");
    console.table(products);

    // Usuários (se existir)
    try {
      const [users] = await connection.query(
        "SELECT id, email, role FROM users LIMIT 10",
      );
      console.log("\n👥 USUÁRIOS:");
      console.table(users);
    } catch (err) {
      console.log('\n⚠️  Tabela "users" não encontrada');
    }

    // Estatísticas
    console.log("\n📈 ESTATÍSTICAS:");
    const [stats] = await connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM products) as total_produtos,
        (SELECT COUNT(*) FROM users) as total_usuarios
    `);
    console.table(stats);

    await connection.end();
  } catch (error) {
    console.error("❌ Erro:", error.message);
    process.exit(1);
  }
}

viewDatabase();
