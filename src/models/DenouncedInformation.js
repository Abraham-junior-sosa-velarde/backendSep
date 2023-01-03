import { DataTypes } from "sequelize";
import sequelize from "../database";

const DenouncedInformation = sequelize.define("informacionDenunciados", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
});

export default DenouncedInformation;
