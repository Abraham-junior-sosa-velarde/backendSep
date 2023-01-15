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
