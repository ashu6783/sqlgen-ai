import { configDotenv } from 'dotenv';
configDotenv();
import fs from 'fs';
import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host:process.env.MYSQL_HOST || 'localhost',
    user:process.env.MYSQL_USER || 'root',
    password:process.env.MYSQL_PASSWORD||'ashutosh',
    database:process.env.MYSQL_DATABASE|| 'sqlgen_db',
    port: Number(process.env.MYSQL_PORT),
  ssl: {
    ca: fs.readFileSync("C:/Users/ashu0/Downloads/ca.pem")
  },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


async function testConnection() {
    try {
      await pool.getConnection();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
  
  testConnection();



export default pool;
