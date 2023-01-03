import { DataTypes } from "sequelize";
import sequelize from "../database";
import User from "./User";

const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    unique: true,
    allowNull: false,
  },
});

//relacion uno a muchos
Role.hasMany(User, {
  foreignKey: "rolId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos inversa
User.belongsTo(Role, {
  foreignKey: "rolId",
  targetId: "id",
  allowNull: false,
});
export default Role;
