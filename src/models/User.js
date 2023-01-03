import { DataTypes } from "sequelize";
import sequelize from "../database";
import bcrypt from "bcryptjs";
import Record from "./Record";

const User = sequelize.define("usuarios", {
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
  correoElectronico: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN(1),
    allowNull: false,
  },
});

//relacion uno a muchos
User.hasMany(Record, {
  foreignKey: "usuarioId",
  sourceKey: "id",
  allowNull: false,
});
//relacion uno a muchos inversa
Record.belongsTo(User, {
  foreignKey: "usuarioId",
  targetId: "id",
  allowNull: false,
});
export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
export const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default User;
