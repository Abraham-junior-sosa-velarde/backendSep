import { DataTypes } from "sequelize";
import sequelize from "../database";
import RegisterTypology from "./RegisterTypology";
import SecondaryTypology from "./SecondaryTypology";

const Typology = sequelize.define("tipologiasPrincipales", {
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
Typology.hasMany(RegisterTypology, {
  foreignKey: "tipologiaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
RegisterTypology.belongsTo(Typology, {
  foreignKey: "tipologiaId",
  targetId: "id",
  allowNull: false,
});
//relacion uno a muchos
Typology.hasMany(SecondaryTypology, {
  foreignKey: "tipologiaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
SecondaryTypology.belongsTo(Typology, {
  foreignKey: "tipologiaId",
  targetId: "id",
  allowNull: false,
});
export default Typology;
