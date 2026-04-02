import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Communication = sequelize.define(
  "Communication",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("call", "whatsapp", "email", "sms", "meeting"),
      allowNull: false,
    },
    direction: {
      type: DataTypes.ENUM("inbound", "outbound"),
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      field: "client_id",
    },
    staffId: {
      type: DataTypes.INTEGER,
      field: "staff_id",
      allowNull: false,
    },
    leadId: {
      type: DataTypes.INTEGER,
      field: "lead_id",
    },
    dealId: {
      type: DataTypes.INTEGER,
      field: "deal_id",
    },
    contactNumber: {
      type: DataTypes.STRING,
      field: "contact_number",
    },
    duration: {
      type: DataTypes.INTEGER,
      comment: "Duration in seconds for calls",
    },
    status: {
      type: DataTypes.ENUM("completed", "missed", "pending", "scheduled"),
      defaultValue: "completed",
    },
    subject: DataTypes.STRING,
    description: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    followUpDate: {
      type: DataTypes.DATE,
      field: "follow_up_date",
    },
  },
  {
    tableName: "communications",
    timestamps: false,
  },
);

export default Communication;
