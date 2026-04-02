#!/usr/bin/env node

/**
 * Test API Connection from Frontend Perspective
 */

import axios from "axios";

async function testConnection() {
  console.log("\n╔═══════════════════════════════════════════╗");
  console.log("║  Testing Frontend → Backend Connection  ║");
  console.log("╚═══════════════════════════════════════════╝\n");

  try {
    console.log("[1/3] Checking backend health...");
    const healthResponse = await axios.get("http://localhost:5000/");
    console.log(`✅ Backend responds: "${healthResponse.data}"\n`);

    console.log("[2/3] Testing login endpoint...");
    const loginResponse = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: "himanshuagrawal257@gmail.com",
        password: "Himanshu@2004",
      },
    );

    console.log("Response Status:", loginResponse.status);
    console.log("Response Data:", JSON.stringify(loginResponse.data, null, 2));

    if (loginResponse.data.success) {
      console.log("\n✅ LOGIN SUCCESSFUL!");
      console.log(
        "Token:",
        loginResponse.data.data.token.substring(0, 50) + "...",
      );
      console.log("User:", loginResponse.data.data.user);

      console.log("\n[3/3] Verifying token...");
      const meResponse = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${loginResponse.data.data.token}`,
        },
      });
      console.log("✅ Token verified!");
      console.log("User data:", meResponse.data);
    } else {
      console.log("\n❌ LOGIN FAILED!");
      console.log("Error:", loginResponse.data.message);
    }
  } catch (error) {
    console.error("\n❌ Error:");
    console.error("Message:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
  }
}

testConnection();
