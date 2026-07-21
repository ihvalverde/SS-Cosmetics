const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Error en la conexión a PostgreSQL:', err);
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      offer_price REAL,
      stock INTEGER DEFAULT 0,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Tabla products inicializada');
};

initDB();

module.exports = pool;