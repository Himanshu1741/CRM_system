import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.getDataValue("firstName")} ${this.getDataValue("lastName")}`.trim();
      },
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "manager", "user"),
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: "is_active",
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

User.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;
