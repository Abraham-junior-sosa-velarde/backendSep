import { DataTypes } from "sequelize";
import sequelize from "../database";
import ComplainantInformation from "./ComplainantInformation";
import DenouncedInformation from "./DenouncedInformation";
import RegisterCrimes from "./RegisterCrimes";
import StageCase from "./StageCase";
import VictimInformation from "./VictimInformation";

const Record = sequelize.define("registros", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  casoAntiguo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  area: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  observacion: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING(100),
  },
  fechaInicioProceso: {
    type: DataTypes.DATE,
  },
  numeroCaso: {
    type: DataTypes.STRING(50),
  },
  tipoAsistencia: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  accionesSepdavi: {
    type: DataTypes.STRING,
  },
  tieneSentencia: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  fechaSentencia: {
    type: DataTypes.DATE,
  },
  numeroSentencia: {
    type: DataTypes.STRING(100),
  },
});

//relacion uno a muchos
Record.hasMany(StageCase, {
  foreignKey: "registroId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
StageCase.belongsTo(Record, {
  foreignKey: "registroId",
  targetId: "id",
  allowNull: false,
});
//relacion uno a muchos
Record.hasMany(RegisterCrimes, {
  foreignKey: "registroId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
RegisterCrimes.belongsTo(Record, {
  foreignKey: "registroId",
  targetId: "id",
  allowNull: false,
});
//relacion uno a muchos
Record.hasMany(VictimInformation, {
  foreignKey: "registroId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
VictimInformation.belongsTo(Record, {
  foreignKey: "registroId",
  targetId: "id",
  allowNull: false,
});

//relacion uno a muchos
Record.hasMany(ComplainantInformation, {
  foreignKey: "registroId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
ComplainantInformation.belongsTo(Record, {
  foreignKey: "registroId",
  targetId: "id",
  allowNull: false,
});

//relacion uno a muchos
Record.hasMany(DenouncedInformation, {
  foreignKey: "registroId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos (inversa)
DenouncedInformation.belongsTo(Record, {
  foreignKey: "registroId",
  targetId: "id",
  allowNull: false,
});
export default Record;
