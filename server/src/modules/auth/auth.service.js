import jwt from "jsonwebtoken";
import User from "../../models/User.js";

export class AuthService {
  static generateToken(id, role) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });
  }

  static async register(name, email, password) {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();
    return user;
  }

  static async login(email, password) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return user;
  }

  static async getUserById(id) {
    return await User.findById(id);
  }
}
