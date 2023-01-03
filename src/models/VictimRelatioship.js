import { DataTypes } from "sequelize";
import sequelize from "../database";
import ComplainantInformation from "./ComplainantInformation";
import DenouncedInformation from "./DenouncedInformation";

const VictimRelatioship = sequelize.define("relacionVictimas", {
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
VictimRelatioship.hasMany(ComplainantInformation, {
  foreignKey: "relacionVictimaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
ComplainantInformation.belongsTo(VictimRelatioship, {
  foreignKey: "relacionVictimaId",
  targetId: "id",
  allowNull: false,
});

//relacion uno a muchos
VictimRelatioship.hasMany(DenouncedInformation, {
  foreignKey: "relacionVictimaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
DenouncedInformation.belongsTo(VictimRelatioship, {
  foreignKey: "relacionVictimaId",
  targetId: "id",
  allowNull: false,
});
export default VictimRelatioship;
