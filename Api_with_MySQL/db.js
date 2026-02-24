import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kaushal@21",
  database: "products",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;