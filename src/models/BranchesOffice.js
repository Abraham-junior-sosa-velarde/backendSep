import { DataTypes } from "sequelize";
import sequelize from "../database";
import User from "./User";

const BranchOffice = sequelize.define("sucursales", {
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
BranchOffice.hasMany(User, {
  foreignKey: "sucursalId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos inversa
User.belongsTo(BranchOffice, {
  foreignKey: "sucursalId",
  targetId: "id",
  allowNull: false,
});
export default BranchOffice;
