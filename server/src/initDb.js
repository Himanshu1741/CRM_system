import sequelize from "./config/db.js";

async function initDatabase() {
  try {
    // Drop all tables and recreate them
    await sequelize.sync({ alter: true });
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    process.exit(1);
  }
}

export default initDatabase;
