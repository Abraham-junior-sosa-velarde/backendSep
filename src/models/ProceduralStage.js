import { DataTypes } from "sequelize";
import sequelize from "../database";
import StageCase from "./StageCase";

const ProceduralStage = sequelize.define("etapasProcesales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
});
//relacion uno a muchos
ProceduralStage.hasMany(StageCase, {
  foreignKey: "etapaProcesalId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
StageCase.belongsTo(ProceduralStage, {
  foreignKey: "etapaProcesalId",
  targetId: "id",
  allowNull: false,
});
export default ProceduralStage;
