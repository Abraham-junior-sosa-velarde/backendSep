import { DataTypes } from "sequelize";
import sequelize from "../database";
import ComplainantInformation from "./ComplainantInformation";
import DenouncedInformation from "./DenouncedInformation";
import VictimInformation from "./VictimInformation";

const Peoople = sequelize.define("personas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  fechaNacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  typoDocumento: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  numeroDocumento: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(200),
  },
  telefono: {
    type: DataTypes.INTEGER,
  },
  observacion: {
    type: DataTypes.STRING,
  },
  nacionalidad: {
    type: DataTypes.STRING(50),
  },
});
//relacion uno a uno
Peoople.hasOne(ComplainantInformation, {
  foreignKey: "personaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a uno (inversa)
ComplainantInformation.belongsTo(Peoople, {
  foreignKey: "personaId",
  targetId: "id",
  allowNull: false,
  onDelete: "CASCADE",
});

//relacion uno a uno
Peoople.hasOne(DenouncedInformation, {
  foreignKey: "personaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a uno (inversa)
DenouncedInformation.belongsTo(Peoople, {
  foreignKey: "personaId",
  targetId: "id",
  allowNull: false,
  onDelete: "CASCADE",
});

//relacion uno a uno
Peoople.hasOne(VictimInformation, {
  foreignKey: "personaId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a uno (inversa)
VictimInformation.belongsTo(Peoople, {
  foreignKey: "personaId",
  targetId: "id",
  allowNull: false,
  onDelete: "CASCADE",
});

export default Peoople;
