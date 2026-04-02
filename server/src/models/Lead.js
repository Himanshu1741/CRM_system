import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Lead = sequelize.define(
  "Lead",
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
    },
    phone: DataTypes.STRING,
    company: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("new", "contacted", "qualified", "unqualified"),
      defaultValue: "new",
    },
    source: {
      type: DataTypes.ENUM(
        "website",
        "referral",
        "campaign",
        "cold-call",
        "other",
      ),
      defaultValue: "website",
    },
    notes: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "leads",
    timestamps: false,
  },
);

export default Lead;
