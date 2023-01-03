import { DataTypes } from "sequelize";
import sequelize from "../database";

const VictimInformation = sequelize.define("informacionVictimas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
});

export default VictimInformation;
