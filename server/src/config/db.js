import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
    },
  },
);

// Enable foreign key constraints in MySQL
sequelize.authenticate().then(() => {
  sequelize.query("SET FOREIGN_KEY_CHECKS = 1").catch(console.error);
});

export default sequelize;
