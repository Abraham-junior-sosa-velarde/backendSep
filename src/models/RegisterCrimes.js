import { DataTypes } from "sequelize";
import sequelize from "../database";

const RegisterCrimes = sequelize.define("registroDelitos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  principal: {
    type: DataTypes.BOOLEAN(0),
    allowNull: false,
  },
  oservaciones: {
    type: DataTypes.STRING(200),
  },
});

export default RegisterCrimes;
