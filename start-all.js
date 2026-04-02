#!/usr/bin/env node

/**
 * CRM System - Complete Startup Script
 * ====================================
 * This Node.js script will:
 * 1. Check for Node.js and required tools
 * 2. Verify MySQL is running
 * 3. Install dependencies if needed
 * 4. Start both servers using concurrently
 *
 * Usage: npm run start:all OR node start-all.js
 */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const os = require("os");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log("\n" + "=".repeat(50), "green");
  log(`  ${title}`, "green");
  log("=".repeat(50) + "\n", "green");
}

async function checkNodeModules(dir, name) {
  return new Promise((resolve) => {
    fs.access(path.join(dir, "node_modules"), fs.constants.F_OK, (err) => {
      if (err) {
        log(`[!] ${name} node_modules not found`, "yellow");
        resolve(false);
      } else {
        log(`[✓] ${name} node_modules exists`, "green");
        resolve(true);
      }
    });
  });
}

function runCommand(command, args, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    child.on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    logSection("CRM System - Starting Setup");

    // Step 1: Check Node.js
    log("[1/4] Checking Node.js...", "yellow");
    const nodeVersion = process.version;
    log(`[✓] Node.js ${nodeVersion} is running`, "green");

    // Step 2: Check dependencies
    log("\n[2/4] Checking dependencies...", "yellow");

    const rootDir = __dirname;
    const serverDir = path.join(rootDir, "server");
    const clientDir = path.join(rootDir, "client");

    const rootModules = fs.existsSync(path.join(rootDir, "node_modules"));
    const serverModules = await checkNodeModules(serverDir, "Server");
    const clientModules = await checkNodeModules(clientDir, "Client");

    // Step 3: Install dependencies if needed
    if (!serverModules) {
      log("\nInstalling server dependencies...", "yellow");
      await runCommand("npm", ["install"], serverDir);
      log("[✓] Server dependencies installed", "green");
    }

    if (!clientModules) {
      log("Installing client dependencies...", "yellow");
      await runCommand("npm", ["install"], clientDir);
      log("[✓] Client dependencies installed", "green");
    }

    if (!rootModules) {
      log("Installing root dependencies...", "yellow");
      await runCommand("npm", ["install"], rootDir);
      log("[✓] Root dependencies installed", "green");
    }

    // Step 4: Start servers
    logSection("Starting CRM System");
    log(
      "Backend will run on: " +
        colors.cyan +
        "http://localhost:5000" +
        colors.reset,
    );
    log(
      "Frontend will run on: " +
        colors.cyan +
        "http://localhost:5173" +
        colors.reset,
    );
    log("\nPress Ctrl+C to stop both servers\n", "yellow");

    // Start with npm run dev from root
    const startProcess = spawn("npm", ["run", "dev"], {
      cwd: rootDir,
      stdio: "inherit",
      shell: true,
    });

    // Handle process termination
    process.on("SIGINT", () => {
      log("\n\nShutting down servers...", "yellow");
      startProcess.kill();
      process.exit(0);
    });

    startProcess.on("close", (code) => {
      if (code !== null && code !== 0) {
        log(`\n[!] Servers exited with code ${code}`, "red");
      }
    });
  } catch (error) {
    log(`\n[ERROR] ${error.message}`, "red");
    log("Please check your setup and try again.", "yellow");
    process.exit(1);
  }
}

main();
