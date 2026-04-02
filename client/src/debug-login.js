import axios from "axios";

const API_URL = "http://localhost:5000/api";

async function testLogin() {
  console.log("🔍 Testing CRM Login...");
  console.log(`📍 API URL: ${API_URL}`);

  try {
    // Test 1: Check backend connection
    console.log("\n[1/3] Testing backend connection...");
    const healthCheck = await axios.get("http://localhost:5000/");
    console.log("✅ Backend is running:", healthCheck.data);

    // Test 2: Test login endpoint
    console.log("\n[2/3] Testing login endpoint...");
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: "himanshuagrawal257@gmail.com",
      password: "Himanshu@2004",
    });

    console.log("✅ Login successful!");
    console.log("Response:", loginResponse.data);
    console.log("Token:", loginResponse.data.data.token);
    console.log("User:", loginResponse.data.data.user);

    // Test 3: Verify token
    console.log("\n[3/3] Verifying token...");
    const meResponse = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${loginResponse.data.data.token}`,
      },
    });
    console.log("✅ Token verified!");
    console.log("User data:", meResponse.data);
  } catch (error) {
    console.error("❌ Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
      url: error.config?.url,
    });
  }
}

testLogin();
