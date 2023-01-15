import { Sequelize } from "sequelize";
import Crimes from "../models/Crimes";
import RegisterCrimes from "../models/RegisterCrimes";

export const getAllCrimes = async (req, res) => {
  try {
    const crimes = await Crimes.findAll({
      include: [
        {
          model: RegisterCrimes,
          attributes: [
            [
              Sequelize.fn("COUNT", Sequelize.col("registroDelitos.id")),
              "count",
            ],
          ],
        },
      ],
      group: ["delitos.id", "registroDelitos.id"],
    });
    res.status(200).json(crimes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
