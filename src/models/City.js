import { DataTypes } from "sequelize";
import sequelize from "../database";
import Record from "./Record";

const City = sequelize.define("ciudades", {
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
City.hasMany(Record, {
  foreignKey: "ciudadId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos inversa
Record.belongsTo(City, {
  foreignKey: "ciudadId",
  targetId: "id",
  allowNull: false,
});
export default City;
