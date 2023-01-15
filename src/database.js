import Sequelize from "sequelize";
import { DB_HOST, DB_PASSWORD, DB_NAME, DB_PORT } from "./config";
const sequelize = new Sequelize(DB_NAME, "postgres", DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
});

export default sequelize;
