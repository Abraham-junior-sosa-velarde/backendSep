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
export const getBranchesOfficesById = (req, res) => {};
export const creatBranchOffice = async (req, res) => {
  const { name } = req.body;
  try {
    const newBranch = await BranchOffice.create({ nombre: name });
    res.status(201).json(newBranch);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateBranchesOfficesById = (req, res) => {};
export const deleteBranchesOfficesById = (req, res) => {};
