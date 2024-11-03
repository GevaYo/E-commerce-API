import mysql from "mysql2/promise";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function setupDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Execute migration file
    const sql = await fs.readFile("./migrations/01_initial_schema.sql", "utf8");
    await connection.query(sql);

    console.log("Database setup completed!");
    await connection.end();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

setupDatabase();
