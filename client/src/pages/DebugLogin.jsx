import axios from "axios";
import { useState } from "react";

export default function DebugLogin() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    console.log(message);
    setLogs((prev) => [...prev, message]);
  };

  const testLogin = async () => {
    setLogs([]);
    addLog("🔍 Starting API test...");

    try {
      // Test 1: Backend availability
      addLog("\n--- Test 1: Backend Availability ---");
      const healthResponse = await fetch("http://localhost:5000/");
      addLog(`✅ Backend responds: ${await healthResponse.text()}`);

      // Test 2: Direct login call
      addLog("\n--- Test 2: Direct Login Call ---");
      const loginResponse = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "himanshuagrawal257@gmail.com",
            password: "Himanshu@2004",
          }),
        },
      );

      const loginData = await loginResponse.json();
      addLog(`Status: ${loginResponse.status}`);
      addLog(`Response: ${JSON.stringify(loginData, null, 2)}`);

      if (loginData.success) {
        addLog("✅ LOGIN SUCCESSFUL!");
        addLog(`Token: ${loginData.data.token.substring(0, 50)}...`);
        addLog(`User: ${loginData.data.user.name}`);
      } else {
        addLog(`❌ Login failed: ${loginData.message}`);
      }

      // Test 3: Axios login
      addLog("\n--- Test 3: Axios Login (Like Frontend) ---");
      const api = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: { "Content-Type": "application/json" },
      });

      const axiosResponse = await api.post("/auth/login", {
        email: "himanshuagrawal257@gmail.com",
        password: "Himanshu@2004",
      });

      addLog(
        `✅ Axios response: ${JSON.stringify(axiosResponse.data, null, 2)}`,
      );
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
      if (error.response) {
        addLog(`Response status: ${error.response.status}`);
        addLog(`Response data: ${JSON.stringify(error.response.data)}`);
      }
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>🐛 CRM Debug Panel</h1>
      <button
        onClick={testLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Run API Tests
      </button>

      <div
        style={{
          marginTop: "20px",
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "5px",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          maxHeight: "600px",
          overflow: "y-auto",
          fontSize: "12px",
          lineHeight: "1.5",
        }}
      >
        {logs.length === 0
          ? "(Click button to start tests)"
          : logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  );
}
