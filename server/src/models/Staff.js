import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Staff = sequelize.define(
  "Staff",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: DataTypes.STRING,
    joinDate: {
      type: DataTypes.DATE,
      field: "join_date",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "on-leave"),
      defaultValue: "active",
    },
    salary: DataTypes.DECIMAL(10, 2),
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: {
      type: DataTypes.STRING,
      field: "zip_code",
    },
    country: DataTypes.STRING,
    performanceRating: {
      type: DataTypes.DECIMAL(3, 2),
      field: "performance_rating",
    },
    notes: DataTypes.TEXT,
  },
  {
    tableName: "staff",
    timestamps: false,
  },
);

export default Staff;
