import { Sequelize } from "sequelize";
import BranchOffice from "../models/BranchesOffice";
import User from "../models/User";

export const getBranchesOffices = async (req, res) => {
  try {
    const branches = await BranchOffice.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("usuarios.id")), "count"],
          ],
        },
      ],
      group: ["sucursales.id", "usuarios.id"],
    });
    res.status(200).json(branches);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBranchesOffices = async (req, res) => {
  try {
    const { id } = req.params;
    await BranchOffice.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBranchesOffices = async (req, res) => {
  const { nombre } = req.body;
  try {
    const data = await BranchOffice.create({ nombre });
    const created = await BranchOffice.findByPk(data.id, {
      include: [
        {
          model: User,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("usuarios.id")), "count"],
          ],
        },
      ],
      group: ["sucursales.id", "usuarios.id"],
    });
    res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateBranchesOffices = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await BranchOffice.findByPk(id, {
      include: [
        {
          model: User,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("usuarios.id")), "count"],
          ],
        },
      ],
      group: ["sucursales.id", "usuarios.id"],
    });
    data.nombre = name;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
