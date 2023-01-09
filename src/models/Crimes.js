import { DataTypes } from "sequelize";
import sequelize from "../database";
import RegisterCrimes from "./RegisterCrimes";

const Crimes = sequelize.define("delitos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
});
//relacion uno a muchos
Crimes.hasMany(RegisterCrimes, {
  foreignKey: "tipologiaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
RegisterCrimes.belongsTo(Crimes, {
  foreignKey: "tipologiaId",
  targetId: "id",
  allowNull: false,
});

export default Crimes;
