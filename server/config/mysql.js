import { configDotenv } from 'dotenv';
configDotenv();

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caPath = path.join(__dirname, '..', 'certs', 'ca.pem');

let sslConfig = undefined;

if (fs.existsSync(caPath)) {
  sslConfig = {
    ca: fs.readFileSync(caPath),
  };
} else {
  console.warn('⚠️  ca.pem not found — continuing without SSL');
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'ashutosh',
  database: process.env.MYSQL_DATABASE || 'sqlgen_db',
  port: Number(process.env.MYSQL_PORT) || 3306,
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    await pool.getConnection();
    console.log('✅ Connected to the database');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
}

testConnection();

export default pool;
