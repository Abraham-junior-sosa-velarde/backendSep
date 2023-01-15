import { Sequelize } from "sequelize";
import City from "../models/City";
import Record from "../models/Record";

export const getAllCities = async (req, res) => {
  try {
    const Cities = await City.findAll({
      include: [
        {
          model: Record,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("registros.id")), "count"],
          ],
        },
      ],
      group: ["ciudades.id", "registros.id"],
    });
    res.status(200).json(Cities);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
