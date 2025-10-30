import mysql from 'mysql2/promise';

let pool: mysql.Pool | undefined = (globalThis as any).mysqlPool;

if (!pool) {
  pool = mysql.createPool({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false },
  });
  (globalThis as any).mysqlPool = pool;
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [rows] = await pool!.query(sql, params);
  return rows as T;
}
