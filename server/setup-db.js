const mysql = require("mysql2/promise");
const fs = require("fs");
require("dotenv").config();

async function setupDatabase() {
  console.log("🔌 Conectando ao MySQL local (XAMPP)...");
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Port: ${process.env.DB_PORT}`);
  console.log(`User: ${process.env.DB_USER}`);
  console.log(`Database: ${process.env.DB_NAME}\n`);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT),
      // Sem SSL para MySQL local (XAMPP)
      connectTimeout: 30000,
      multipleStatements: true,
    });

    console.log("✅ Conectado com sucesso!\n");

    // Executar schema
    console.log("📋 Criando tabela de produtos...");
    const schema = fs.readFileSync("./database/schema.sql", "utf8");
    await connection.query(schema);
    console.log("✅ Tabela criada com sucesso!\n");

    // Executar seeds
    console.log("🌱 Inserindo produtos de exemplo...");
    const seeds = fs.readFileSync("./database/seeds.sql", "utf8");
    await connection.query(seeds);
    console.log("✅ Produtos inseridos com sucesso!\n");

    // Verificar dados
    const [rows] = await connection.query(
      "SELECT COUNT(*) as total FROM products",
    );
    console.log(`📊 Total de produtos no banco: ${rows[0].total}\n`);

    await connection.end();
    console.log("✅ Setup concluído! Banco de dados pronto para uso.");
  } catch (error) {
    console.error("❌ Erro ao configurar banco:", error.message);
    process.exit(1);
  }
}

setupDatabase();
