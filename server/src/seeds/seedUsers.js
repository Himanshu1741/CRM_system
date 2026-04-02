import User from "../models/User.js";

export async function seedDefaultUser() {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: "himanshuagrawal257@gmail.com" },
    });

    if (existingUser) {
      console.log("✅ Default user already exists");
      console.log("📧 Email: himanshuagrawal257@gmail.com");
      console.log("🔑 Password: Himanshu@2004");
      return;
    }

    // Create default user - DO NOT hash password here, let the model hook handle it
    await User.create({
      firstName: "Himanshu",
      lastName: "Agrawal",
      email: "himanshuagrawal257@gmail.com",
      password: "Himanshu@2004", // Plain password - will be hashed by beforeCreate hook
      role: "admin",
      isActive: true,
    });

    console.log("✅ Default user created successfully");
    console.log("📧 Email: himanshuagrawal257@gmail.com");
    console.log("🔑 Password: Himanshu@2004");
  } catch (error) {
    console.error("Error seeding default user:", error);
  }
}
