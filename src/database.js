import Sequelize from "sequelize";
import { DB_HOST, DB_PASSWORD, DB_NAME } from "./config";
const sequelize = new Sequelize(DB_NAME, "postgres", DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

export default sequelize;
