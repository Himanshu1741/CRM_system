import "dotenv/config";
import mysql from "mysql2/promise";
import app from "./app.js";
import sequelize from "./config/db.js";
import { seedDefaultUser } from "./seeds/seedUsers.js";

// Import all models to register relationships before sync

const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME;

// Create database if it doesn't exist
async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await connection.end();
    console.log(`Database ${DB_NAME} ready`);

    // Now sync with the database - use force: false to preserve existing data
    await sequelize.sync({ force: false });
    console.log("Database connected");

    // Seed default user
    await seedDefaultUser();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database initialization error:", error);
    process.exit(1);
  }
}

initializeDatabase();
