import { Sequelize } from "sequelize";
import Peoople from "../models/Peoople";
import SexualOrientation from "../models/SexualOrientation";

export const getAllSexualOrientations = async (req, res) => {
  try {
    const sexualOrientations = await SexualOrientation.findAll({
      include: [
        {
          model: Peoople,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("personas.id")), "count"],
          ],
        },
      ],
      group: ["orientacionesSexuales.id", "personas.id"],
    });
    res.status(200).json(sexualOrientations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
