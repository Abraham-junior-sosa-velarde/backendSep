import { DataTypes } from "sequelize";
import sequelize from "../database";
import Peoople from "./Peoople";

const InstructionDegree = sequelize.define("gradoInstrucciones", {
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
InstructionDegree.hasMany(Peoople, {
  foreignKey: "gradoInstruccionId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
Peoople.belongsTo(InstructionDegree, {
  foreignKey: "gradoInstruccionId",
  targetId: "id",
  allowNull: false,
});
export default InstructionDegree;
