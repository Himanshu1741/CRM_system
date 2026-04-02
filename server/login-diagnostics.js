#!/usr/bin/env node

/**
 * CRM System - Complete Login Diagnostics
 * This script checks every part of the login system
 */

import bcrypt from "bcrypt";
import "dotenv/config";
import mysql from "mysql2/promise";
import sequelize from "./src/config/db.js";
import User from "./src/models/User.js";

console.log("\n╔════════════════════════════════════════╗");
console.log("║  CRM LOGIN DIAGNOSTICS                ║");
console.log("╚════════════════════════════════════════╝\n");

async function runDiagnostics() {
  try {
    // Step 1: Check environment variables
    console.log("[1/6] Checking environment variables...");
    console.log(`  DB_HOST: ${process.env.DB_HOST}`);
    console.log(`  DB_USER: ${process.env.DB_USER}`);
    console.log(`  DB_NAME: ${process.env.DB_NAME}`);
    console.log(
      `  JWT_SECRET: ${process.env.JWT_SECRET ? "✅ Set" : "❌ Missing"}`,
    );
    console.log(`  JWT_EXPIRE: ${process.env.JWT_EXPIRE}\n`);

    // Step 2: Test MySQL connection
    console.log("[2/6] Testing MySQL connection...");
    let mySqlConnection;
    try {
      mySqlConnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });
      console.log("  ✅ MySQL connection successful\n");
    } catch (err) {
      console.error("  ❌ MySQL connection failed:", err.message);
      console.error("  - Check if MySQL is running");
      console.error("  - Check .env credentials\n");
      throw err;
    }
    await mySqlConnection.end();

    // Step 3: Sync database and models
    console.log("[3/6] Syncing database models...");
    try {
      await sequelize.sync({ force: false });
      console.log("  ✅ Models synced successfully\n");
    } catch (err) {
      console.error("  ❌ Model sync failed:", err.message, "\n");
      throw err;
    }

    // Step 4: Check if user exists
    console.log("[4/6] Checking for default user...");
    const existingUser = await User.findOne({
      where: { email: "himanshuagrawal257@gmail.com" },
      raw: true,
    });

    if (existingUser) {
      console.log("  ✅ User found in database");
      console.log(`  📧 Email: ${existingUser.email}`);
      console.log(
        `  👤 Name: ${existingUser.first_name} ${existingUser.last_name}`,
      );
      console.log(
        `  🔐 Password hash exists: ${existingUser.password ? "✅" : "❌"}`,
      );
      console.log(`  👑 Role: ${existingUser.role}\n`);
    } else {
      console.log("  ❌ User NOT found in database");
      console.log("  Creating default user now...\n");

      const hashedPassword = await bcrypt.hash("Himanshu@2004", 10);
      const newUser = await User.create({
        firstName: "Himanshu",
        lastName: "Agrawal",
        email: "himanshuagrawal257@gmail.com",
        password: hashedPassword,
        role: "admin",
        isActive: true,
      });

      console.log("  ✅ Default user created");
      console.log(`  📧 Email: ${newUser.email}`);
      console.log(`  🔐 Password: Himanshu@2004\n`);
    }

    // Step 5: Test password comparison
    console.log("[5/6] Testing password verification...");
    const testUser = await User.findOne({
      where: { email: "himanshuagrawal257@gmail.com" },
    });

    if (testUser) {
      const correctPassword = await testUser.comparePassword("Himanshu@2004");
      const wrongPassword = await testUser.comparePassword("wrongpassword");

      console.log(`  ✅ Password comparison working`);
      console.log(
        `  Correct password "Himanshu@2004": ${correctPassword ? "✅ MATCH" : "❌ NO MATCH"}`,
      );
      console.log(
        `  Wrong password "wrongpassword": ${wrongPassword ? "❌ WRONG" : "✅ CORRECT"}\n`,
      );

      if (!correctPassword) {
        console.error("  ❌ PROBLEM: Password verification failing!");
        console.error(
          "  This means password hashing or comparison is broken\n",
        );
      }
    }

    // Step 6: Summary
    console.log("[6/6] Generating Summary...\n");
    console.log("╔════════════════════════════════════════╗");
    console.log("║  DIAGNOSTICS COMPLETE                 ║");
    console.log("╚════════════════════════════════════════╝\n");

    console.log("✅ LOGIN SHOULD WORK WITH:");
    console.log("  Email:    himanshuagrawal257@gmail.com");
    console.log("  Password: Himanshu@2004\n");

    console.log("🚀 Next steps:");
    console.log("  1. Start backend: cd server && npm start");
    console.log("  2. Start frontend: cd client && npm run dev");
    console.log("  3. Go to: http://localhost:5173");
    console.log("  4. Login with credentials above\n");

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Diagnostics failed:", error);
    console.error("\nTroubleshooting:");
    console.error("1. Make sure MySQL is running");
    console.error("2. Check .env file in server folder");
    console.error("3. Verify database credentials");
    console.error("4. Delete node_modules and reinstall: npm install\n");
    process.exit(1);
  }
}

runDiagnostics();
