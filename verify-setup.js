#!/usr/bin/env node

import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("\n╔════════════════════════════════════════╗");
console.log("║  CRM System - Startup Verification     ║");
console.log("╚════════════════════════════════════════╝\n");

let currentPath = process.cwd();
if (currentPath.endsWith("client")) {
  currentPath = path.join(currentPath, "..");
}

const projectRoot = currentPath;
const checks = {
  projectRoot: true,
  serverFolder: existsSync(path.join(projectRoot, "server")),
  clientFolder: existsSync(path.join(projectRoot, "client")),
  serverPackageJson: existsSync(
    path.join(projectRoot, "server", "package.json"),
  ),
  clientPackageJson: existsSync(
    path.join(projectRoot, "client", "package.json"),
  ),
  serverEnv: existsSync(path.join(projectRoot, "server", ".env")),
  serverMain: existsSync(path.join(projectRoot, "server", "src", "server.js")),
  clientMain: existsSync(path.join(projectRoot, "client", "src", "main.jsx")),
  startupBat: existsSync(path.join(projectRoot, "START-ALL.bat")),
  startupJs: existsSync(path.join(projectRoot, "start-all.js")),
  startupPs1: existsSync(path.join(projectRoot, "START-ALL.ps1")),
};

let allGood = true;

console.log("📋 Checking Project Structure:\n");
console.log(`Project Root: ${projectRoot}\n`);

const checkItems = [
  { key: "serverFolder", label: "Backend folder (server/)", icon: "📁" },
  { key: "clientFolder", label: "Frontend folder (client/)", icon: "📁" },
  { key: "serverPackageJson", label: "Backend package.json", icon: "📦" },
  { key: "clientPackageJson", label: "Frontend package.json", icon: "📦" },
  { key: "serverEnv", label: "Backend .env configuration", icon: "⚙️" },
  { key: "serverMain", label: "Backend server entry point", icon: "🔧" },
  { key: "clientMain", label: "Frontend main entry point", icon: "🔧" },
  {
    key: "startupBat",
    label: "Startup batch file (START-ALL.bat)",
    icon: "🚀",
  },
  { key: "startupJs", label: "Startup Node script (start-all.js)", icon: "🚀" },
  {
    key: "startupPs1",
    label: "Startup PowerShell script (START-ALL.ps1)",
    icon: "🚀",
  },
];

checkItems.forEach(({ key, label, icon }) => {
  const status = checks[key];
  const symbol = status ? "✅" : "❌";
  const info = status ? "Found" : "Missing";
  console.log(`${symbol} ${icon} ${label}... ${info}`);
  if (!status) allGood = false;
});

console.log("\n" + "═".repeat(50) + "\n");

if (allGood) {
  console.log("✨ All checks passed!\n");
  console.log("🚀 Ready to start! Choose one method:\n");
  console.log("   Option 1 (Easiest):");
  console.log("   → Double-click START-ALL.bat\n");
  console.log("   Option 2 (Command Line):");
  console.log("   → npm run start-all\n");
  console.log("   Option 3 (PowerShell):");
  console.log("   → .\\START-ALL.ps1\n");
  console.log("📖 See STARTUP-GUIDE.md for detailed instructions\n");
} else {
  console.log("⚠️  Some files are missing!\n");
  console.log("Please make sure you're in the project root directory");
  console.log("and all files have been properly downloaded.\n");
}

console.log("═".repeat(50) + "\n");

// Show startup options
if (allGood) {
  console.log("💾 Server Configuration:");
  const serverEnvPath = path.join(projectRoot, "server", ".env");
  if (existsSync(serverEnvPath)) {
    console.log(`   Location: ${serverEnvPath}`);
    console.log("   ✅ Configuration found\n");
  }

  console.log("🌐 Frontend Configuration:");
  const clientEnvPath = path.join(projectRoot, "client", ".env");
  if (existsSync(clientEnvPath)) {
    console.log(`   Location: ${clientEnvPath}`);
    console.log("   ✅ Configuration found\n");
  }

  console.log("🔗 Service URLs:");
  console.log("   Backend API:  http://localhost:5000/api");
  console.log("   Frontend:     http://localhost:5173");
  console.log("   Database:     localhost:3306 (MySQL)\n");
}
