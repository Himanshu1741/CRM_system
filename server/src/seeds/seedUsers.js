import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export async function seedDefaultUser() {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: "himanshuagrawal257@gmail.com" },
    });

    if (existingUser) {
      console.log("Default user already exists");
      return;
    }

    // Create default user
    const hashedPassword = await bcrypt.hash("Himanshu@2004", 10);

    await User.create({
      firstName: "Himanshu",
      lastName: "Agrawal",
    console.log("✅ Default user created successfully");
    console.log("📧 Email: himanshuagrawal257@gmail.com");
    console.log("🔑 Password: Himanshu@2004");
  } catch (error) {
    console.error("Error seeding default user:", error);
  }
}
