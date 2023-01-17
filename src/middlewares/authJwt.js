import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import User from "../models/User";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token)
      return res.status(403).json({ message: "No se proporciono un token" });
    const decoded = jwt.verify(token, config.SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["contrasenia"] },
    });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};

export const isAdmin = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findByPk(userId);
  const role = await Role.findOne({ where: { id: user.rolId } });
  if (role.nombre === "Administrador") return next();
  return res.status(403).json({ message: "Requiere el rol de Administrador" });
};
export const isAdminOrOperator = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findByPk(userId);
  const role = await Role.findOne({ where: { id: user.rolId } });
  if (role.nombre === "Administrador" || role.nombre === "Operador")
    return next();
  return res
    .status(403)
    .json({ message: "Requiere el rol de Administrador o operador" });
};
export const isOperator = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findByPk(userId);
  const role = await Role.findOne({ where: { id: user.rolId } });
  if (role.nombre === "Operador") return next();
  return res.status(403).json({ message: "Requiere el rol de Operador" });
};
export const isGuest = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findByPk(userId);
  const role = await Role.findOne({ where: { id: user.rolId } });
  if (role.nombre === "Invitado") return next();
  return res.status(403).json({ message: "Requiere el rol de Invitado" });
};
