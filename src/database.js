import Sequelize from "sequelize";
const sequelize = new Sequelize("sepdaviDB", "postgres", "juniorsosa", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
