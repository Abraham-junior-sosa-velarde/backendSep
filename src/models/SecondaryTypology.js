import { DataTypes } from "sequelize";
import sequelize from "../database";
import RegisterTypology from "./RegisterTypology";

const SecondaryTypology = sequelize.define("tipologiasSecundarias", {
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
SecondaryTypology.hasMany(RegisterTypology, {
  foreignKey: "tipologiaSecundariaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
RegisterTypology.belongsTo(SecondaryTypology, {
  foreignKey: "tipologiaSecundariaId",
  targetId: "id",
  allowNull: false,
});
export default SecondaryTypology;
