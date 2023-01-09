import BranchOffice from "../models/BranchesOffice";
import Role from "../models/Role";
import User, { encryptPassword } from "../models/User";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "sucursalId",
          "rolId",
          "contrasenia",
        ],
      },
      include: [
        { model: Role, attributes: ["nombre", "id"] },
        { model: BranchOffice, attributes: ["nombre", "id"] },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//getUserById
export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "contrasenia"],
      },
    });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createUser = async (req, res) => {
  const {
    nombre,
    apellido,
    correoElectronico,
    contrasenia,
    estado,
    rolId,
    sucursalId,
    cargo,
  } = req.body;
  try {
    const newUser = await User.create({
      nombre,
      apellido,
      correoElectronico,
      contrasenia: await encryptPassword(contrasenia),
      estado,
      rolId: rolId,
      sucursalId: sucursalId,
      cargo,
    });
    const users = await User.findOne({
      where: { id: newUser.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "sucursalId", "rolId"],
      },
      include: [
        { model: Role, attributes: ["nombre", "id"] },
        { model: BranchOffice, attributes: ["nombre", "id"] },
      ],
    });
    res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      apellido,
      contrasenia,
      correoElectronico,
      estado,
      rolId,
      sucursalId,
      cargo,
    } = req.body;

    const updateUser = await User.findByPk(id);
    updateUser.nombre = nombre;
    updateUser.apellido = apellido;
    if (contrasenia)
      updateUser.contrasenia = await encryptPassword(contrasenia);
    updateUser.correoElectronico = correoElectronico;
    updateUser.estado = estado;
    updateUser.rolId = rolId;
    updateUser.sucursalId = sucursalId;
    updateUser.cargo = cargo;
    await updateUser.save();
    const user = await User.findByPk(updateUser.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "contrasenia"],
      },
      include: [
        { model: Role, attributes: ["nombre", "id"] },
        { model: BranchOffice, attributes: ["nombre", "id"] },
      ],
    });
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const updateUser = await User.findByPk(id, {
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "sucursalId",
          "rolId",
          "contrasenia",
        ],
      },
      include: [
        { model: Role, attributes: ["nombre", "id"] },
        { model: BranchOffice, attributes: ["nombre", "id"] },
      ],
    });
    updateUser.estado = estado;
    await updateUser.save();
    res.status(201).json(updateUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
