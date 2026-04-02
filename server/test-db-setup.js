#!/usr/bin/env node

import "dotenv/config";
import mysql from "mysql2/promise";
import sequelize from "./src/config/db.js";
import User from "./src/models/User.js";
import { seedDefaultUser } from "./src/seeds/seedUsers.js";

console.log("\n╔════════════════════════════════════════╗");
console.log("║  CRM System - Database Setup Test     ║");
console.log("╚════════════════════════════════════════╝\n");

async function testSetup() {
  try {
    console.log("[1/4] Testing MySQL connection...");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    console.log("✅ MySQL connection successful\n");

    console.log("[2/4] Creating database if not exists...");
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    );
    console.log(`✅ Database '${process.env.DB_NAME}' ready\n`);
    await connection.end();

    console.log("[3/4] Syncing database models...");
    await sequelize.sync({ force: false });
    console.log("✅ Models synced successfully\n");

    console.log("[4/4] Checking/creating default user...");
    await seedDefaultUser();
    console.log("✅ Default user verified\n");

    // Verify user exists
    const user = await User.findOne({
      where: { email: "himanshuagrawal257@gmail.com" },
    });

    if (user) {
      console.log("╔════════════════════════════════════════╗");
      console.log("║  ✅ SETUP SUCCESSFUL!                 ║");
      console.log("╚════════════════════════════════════════╝\n");
      console.log("📧 Email: himanshuagrawal257@gmail.com");
      console.log("🔑 Password: Himanshu@2004");
      console.log("\n🌐 Login at: http://localhost:5173\n");
    } else {
      console.log("⚠️  User not found in database");
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup test failed:", error.message);
    console.error("\nTroubleshooting:");
    console.error("1. Make sure MySQL is running");
    console.error("2. Check .env file settings:");
    console.log(`   DB_HOST: ${process.env.DB_HOST}`);
    console.log(`   DB_USER: ${process.env.DB_USER}`);
    console.log(`   DB_NAME: ${process.env.DB_NAME}`);
    console.error("\n3. Verify database credentials");
    process.exit(1);
  }
}

testSetup();
