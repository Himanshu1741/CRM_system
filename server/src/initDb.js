import sequelize from "./config/db.js";
import User from "./models/User.js";
import Lead from "./models/Lead.js";
import Customer from "./models/Customer.js";
import Deal from "./models/Deal.js";
import Task from "./models/Task.js";
import Note from "./models/Note.js";
import Activity from "./models/Activity.js";

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
