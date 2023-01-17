import { Sequelize } from "sequelize";
import InstructionDegree from "../models/InstructionDegree";
import Peoople from "../models/Peoople";

export const getAllInstructionDegree = async (req, res) => {
  try {
    const instructionDegree = await InstructionDegree.findAll({
      include: [
        {
          model: Peoople,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("personas.id")), "count"],
          ],
        },
      ],
      group: ["gradoInstrucciones.id", "personas.id"],
    });
    res.status(200).json(instructionDegree);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteInstructionDegree = async (req, res) => {
  try {
    const { id } = req.params;
    await InstructionDegree.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createInstructionDegree = async (req, res) => {
  const { nombre } = req.body;
  try {
    const data = await InstructionDegree.create({ nombre });
    const created = await InstructionDegree.findByPk(data.id, {
      include: [
        {
          model: Peoople,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("personas.id")), "count"],
          ],
        },
      ],
      group: ["gradoInstrucciones.id", "personas.id"],
    });
    res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateInstructionDegree = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await InstructionDegree.findByPk(id, {
      include: [
        {
          model: Peoople,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("personas.id")), "count"],
          ],
        },
      ],
      group: ["gradoInstrucciones.id", "personas.id"],
    });
    data.nombre = name;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
