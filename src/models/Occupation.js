import { DataTypes } from "sequelize";
import sequelize from "../database";
import Peoople from "./Peoople";

const Occupation = sequelize.define("ocupaciones", {
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
Occupation.hasMany(Peoople, {
  foreignKey: "ocupacionId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
Peoople.belongsTo(Occupation, {
  foreignKey: "ocupacionId",
  targetId: "id",
  allowNull: false,
});
export default Occupation;
