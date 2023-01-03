import { DataTypes } from "sequelize";
import sequelize from "../database";
import Peoople from "./Peoople";

const SexualOrientation = sequelize.define("orientacionesSexuales", {
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
SexualOrientation.hasMany(Peoople, {
  foreignKey: "orientacionSexualId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
Peoople.belongsTo(SexualOrientation, {
  foreignKey: "orientacionSexualId",
  targetId: "id",
  allowNull: false,
});
export default SexualOrientation;
