#!/usr/bin/env node

import { spawn } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("\n========================================");
console.log("  CRM System - Starting All Services");
console.log("========================================\n");

// Check if running from client directory
let projectRoot = process.cwd();
if (projectRoot.endsWith("client")) {
  projectRoot = path.join(projectRoot, "..");
}

console.log(`[*] Project Root: ${projectRoot}\n`);

// Verify folders exist
if (!existsSync(path.join(projectRoot, "server"))) {
  console.error("[ERROR] Server folder not found!");
  process.exit(1);
}

if (!existsSync(path.join(projectRoot, "client"))) {
  console.error("[ERROR] Client folder not found!");
  process.exit(1);
}

const serverPath = path.join(projectRoot, "server");
const clientPath = path.join(projectRoot, "client");

// Function to check and install dependencies
function installDependencies(folder, name) {
  return new Promise((resolve) => {
    const nodeModulesPath = path.join(folder, "node_modules");

    if (!existsSync(nodeModulesPath)) {
      console.log(`[INFO] Installing ${name} dependencies...`);

      const npm = process.platform === "win32" ? "npm.cmd" : "npm";
      const install = spawn(npm, ["install"], {
        cwd: folder,
        stdio: "inherit",
        shell: true,
      });

      install.on("close", (code) => {
        if (code === 0) {
          console.log(`[OK] ${name} dependencies installed\n`);
          resolve();
        } else {
          console.error(`[ERROR] Failed to install ${name} dependencies`);
          process.exit(1);
        }
      });
    } else {
      console.log(`[OK] ${name} dependencies already installed\n`);
      resolve();
    }
  });
}

// Main startup function
async function startup() {
  try {
    // Install dependencies
    console.log("[*] Checking dependencies...\n");
    await installDependencies(serverPath, "Server");
    await installDependencies(clientPath, "Client");

    console.log("[*] Starting Backend Server...");
    const npm = process.platform === "win32" ? "npm.cmd" : "npm";

    const server = spawn(npm, ["start"], {
      cwd: serverPath,
      stdio: "inherit",
      shell: true,
    });

    server.on("error", (err) => {
      console.error("[ERROR] Failed to start server:", err);
      process.exit(1);
    });

    // Wait 3 seconds for server to start
    console.log("[*] Waiting for backend to initialize...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("[*] Starting Frontend...");
    const client = spawn(npm, ["run", "dev"], {
      cwd: clientPath,
      stdio: "inherit",
      shell: true,
    });

    client.on("error", (err) => {
      console.error("[ERROR] Failed to start client:", err);
      process.exit(1);
    });

    // Handle process termination
    process.on("SIGINT", () => {
      console.log("\n[*] Shutting down services...");
      server.kill();
      client.kill();
      process.exit(0);
    });

    console.log("\n========================================");
    console.log("[OK] All services started!");
    console.log("========================================\n");
    console.log("[INFO] Backend:  http://localhost:5000");
    console.log("[INFO] Frontend: http://localhost:5173");
    console.log("[INFO] MySQL:    localhost:3306\n");
    console.log("[*] Open your browser and go to: http://localhost:5173");
    console.log("[*] Press Ctrl+C to stop all services\n");
  } catch (error) {
    console.error("[ERROR]", error);
    process.exit(1);
  }
}

startup();
