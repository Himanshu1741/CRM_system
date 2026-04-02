#!/usr/bin/env node

import "dotenv/config";
import sequelize from "./src/config/db.js";
import User from "./src/models/User.js";

console.log("\n╔════════════════════════════════════════╗");
console.log("║  Resetting User Database               ║");
console.log("╚════════════════════════════════════════╝\n");

async function resetUser() {
  try {
    console.log("[1/3] Connecting to database...");
    await sequelize.sync({ force: false });
    console.log("  ✅ Connected\n");

    console.log("[2/3] Deleting corrupted user...");
    const deleted = await User.destroy({
      where: { email: "himanshuagrawal257@gmail.com" },
    });
    console.log(`  ✅ Deleted ${deleted} user record(s)\n`);

    console.log("[3/3] Creating fresh user with correct hashing...");
    const newUser = await User.create({
      firstName: "Himanshu",
      lastName: "Agrawal",
      email: "himanshuagrawal257@gmail.com",
      password: "Himanshu@2004", // Plain password - will be hashed by beforeCreate hook
      role: "admin",
      isActive: true,
    });
    console.log("  ✅ User created successfully\n");

    // Verify it works
    console.log("[Verification] Testing password verification...");
    const testUser = await User.findOne({
      where: { email: "himanshuagrawal257@gmail.com" },
    });

    const correctMatch = await testUser.comparePassword("Himanshu@2004");
    const wrongMatch = await testUser.comparePassword("wrongpassword");

    console.log(
      `  Correct password: ${correctMatch ? "✅ MATCH" : "❌ NO MATCH"}`,
    );
    console.log(
      `  Wrong password: ${wrongMatch ? "❌ MATCH (BAD)" : "✅ CORRECT"}\n`,
    );

    if (correctMatch && !wrongMatch) {
      console.log("╔════════════════════════════════════════╗");
      console.log("║  ✅ USER RESET SUCCESSFUL!             ║");
      console.log("╚════════════════════════════════════════╝\n");
      console.log("📧 Email:    himanshuagrawal257@gmail.com");
      console.log("🔑 Password: Himanshu@2004\n");
      console.log("Now you can:");
      console.log("  1. cd server && npm start");
      console.log("  2. cd client && npm run dev (in new terminal)");
      console.log("  3. Go to http://localhost:5173 and login\n");
    } else {
      console.log("⚠️  Password verification still has issues!");
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

resetUser();
