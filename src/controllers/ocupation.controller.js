import { Sequelize } from "sequelize";
import Occupation from "../models/Occupation";
import Peoople from "../models/Peoople";

export const getAllOcupations = async (req, res) => {
  try {
    const occupations = await Occupation.findAll({
      include: [
        {
          model: Peoople,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("personas.id")), "count"],
          ],
        },
      ],
      group: ["ocupaciones.id", "personas.id"],
    });
    res.status(200).json(occupations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
