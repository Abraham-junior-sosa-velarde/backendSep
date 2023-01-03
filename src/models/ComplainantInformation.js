import { DataTypes } from "sequelize";
import sequelize from "../database";

const ComplainantInformation = sequelize.define("informacionDenunciantes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
});

export default ComplainantInformation;
