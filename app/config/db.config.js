const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  database: process.env.DB_NAME || "todoist_database",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Enable SSL only if using Render
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL database."))
  .catch((err) => console.error("Database connection error:", err.message));

module.exports = pool;
