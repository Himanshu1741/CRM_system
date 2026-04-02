import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    company: {
      type: DataTypes.STRING,
    },
    industry: {
      type: DataTypes.STRING,
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: {
      type: DataTypes.STRING,
      field: "zip_code",
    },
    country: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("active", "inactive", "prospect"),
      defaultValue: "prospect",
    },
    source: DataTypes.STRING,
    notes: DataTypes.TEXT,
    createdBy: {
      type: DataTypes.INTEGER,
      field: "created_by",
      allowNull: false,
    },
  },
  {
    tableName: "clients",
    timestamps: false,
  },
);

export default Client;
