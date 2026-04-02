#!/usr/bin/env node

/**
 * CRM - Test Actual Login Endpoint
 * Simulates what the frontend does when logging in
 */

import "dotenv/config";
import jwt from "jsonwebtoken";
import sequelize from "./src/config/db.js";
import User from "./src/models/User.js";

console.log("\n╔════════════════════════════════════════╗");
console.log("║  Testing Login Endpoint Logic         ║");
console.log("╚════════════════════════════════════════╝\n");

async function testLogin() {
  try {
    console.log("[1/4] Connecting to database...");
    await sequelize.sync({ force: false });
    console.log("  ✅ Connected\n");

    console.log(
      "[2/4] Testing login with: himanshuagrawal257@gmail.com / Himanshu@2004",
    );
    const email = "himanshuagrawal257@gmail.com";
    const password = "Himanshu@2004";

    // Step 1: Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("  ❌ User not found in database\n");
      throw new Error("User not found");
    }
    console.log("  ✅ User found\n");

    console.log("[3/4] Verifying password...");
    // Step 2: Compare password
    const isPasswordCorrect = await user.comparePassword(password);
    console.log(`  Password match: ${isPasswordCorrect ? "✅ YES" : "❌ NO"}`);

    if (!isPasswordCorrect) {
      console.log("  ❌ Password verification failed\n");
      throw new Error("Invalid password");
    }
    console.log("  ✅ Password correct\n");

    console.log("[4/4] Generating JWT token...");
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const jwtExpire = process.env.JWT_EXPIRE || "7d";

    console.log(`  JWT_SECRET: ${jwtSecret}`);
    console.log(`  JWT_EXPIRE: ${jwtExpire}`);

    // Step 3: Generate token
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
      expiresIn: jwtExpire,
    });

    console.log(`  ✅ Token generated\n`);
    console.log(`Token: ${token.substring(0, 50)}...\n`);

    // Step 4: Verify token
    try {
      const decoded = jwt.verify(token, jwtSecret);
      console.log(
        `✅ Token verified - User ID: ${decoded.id}, Role: ${decoded.role}\n`,
      );
    } catch (err) {
      console.log(`❌ Token verification failed: ${err.message}\n`);
    }

    console.log("╔════════════════════════════════════════╗");
    console.log("║  ✅ LOGIN SIMULATION SUCCESSFUL!       ║");
    console.log("╚════════════════════════════════════════╝\n");

    console.log("Response Object (sent to frontend):");
    console.log(
      JSON.stringify(
        {
          success: true,
          message: "User logged in successfully",
          data: {
            token: token,
            user: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              role: user.role,
            },
          },
        },
        null,
        2,
      ),
    );

    console.log("\n📋 Next: Start backend and try login on frontend");
    console.log("  1. cd server && npm start");
    console.log("  2. cd client && npm run dev (new terminal)");
    console.log("  3. http://localhost:5173 → Login\n");

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Login test failed:", error.message);
    console.error("\nDebugging info:");
    console.error("- Check if MySQL is running");
    console.error("- Verify .env file has correct credentials");
    console.error("- Check if user exists in database");
    process.exit(1);
  }
}

testLogin();
