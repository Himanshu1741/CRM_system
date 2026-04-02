const API_URL = "http://localhost:5000";

// Generate unique email for testing
const timestamp = Date.now();
const testEmail = `test${timestamp}@example.com`;

// Test registration
async function testRegistration() {
  console.log("Testing Registration...");
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: testEmail,
        password: "password123",
      }),
    });
    const data = await response.json();
    console.log("Registration Response:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Registration Error:", error.message);
  }
}

// Test login
async function testLogin() {
  console.log("\nTesting Login...");
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testEmail,
        password: "password123",
      }),
    });
    const data = await response.json();
    console.log("Login Response:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Login Error:", error.message);
  }
}

// Run tests
async function runTests() {
  const registrationResult = await testRegistration();
  await testLogin();
}

runTests();
