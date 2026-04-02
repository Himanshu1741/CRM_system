async function testConnection() {
  console.log("\n╔═══════════════════════════════════════════╗");
  console.log("║  Testing Frontend → Backend Connection  ║");
  console.log("╚═══════════════════════════════════════════╝\n");

  try {
    console.log("[1/3] Checking backend health...");
    const healthResponse = await fetch("http://localhost:5000/");
    const healthText = await healthResponse.text();
    console.log(`✅ Backend responds: "${healthText}"\n`);

    console.log("[2/3] Testing login endpoint...");
    const loginResponse = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "himanshuagrawal257@gmail.com",
        password: "Himanshu@2004",
      }),
    });

    const loginData = await loginResponse.json();
    console.log("Response Status:", loginResponse.status);
    console.log("Response Data:", JSON.stringify(loginData, null, 2));

    if (loginData.success) {
      console.log("\n✅ LOGIN SUCCESSFUL!");
      console.log("Token:", loginData.data.token.substring(0, 50) + "...");
      console.log("User:", loginData.data.user);

      console.log("\n[3/3] Verifying token...");
      const meResponse = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${loginData.data.token}`,
        },
      });
      const meData = await meResponse.json();
      console.log("✅ Token verified!");
      console.log("User data:", meData);
    } else {
      console.log("\n❌ LOGIN FAILED!");
      console.log("Error:", loginData.message);
    }
  } catch (error) {
    console.error("\n❌ Error:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
  }
}

testConnection();
