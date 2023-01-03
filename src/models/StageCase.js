import { DataTypes } from "sequelize";
import sequelize from "../database";

const StageCase = sequelize.define("etapaCasos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  fechaRegistro: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  accionSeguir: {
    type: DataTypes.STRING(200),
  },
});

export default StageCase;
