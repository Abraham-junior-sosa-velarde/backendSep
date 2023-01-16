import { Sequelize } from "sequelize";
import ComplainantInformation from "../models/ComplainantInformation";
import DenouncedInformation from "../models/DenouncedInformation";
import VictimRelatioship from "../models/VictimRelatioship";

export const getAllVictimRelationship = async (req, res) => {
  try {
    const data = await VictimRelatioship.findAll({
      include: [
        {
          model: DenouncedInformation,
          attributes: [
            [
              Sequelize.fn("COUNT", Sequelize.col("informacionDenunciados.id")),
              "count",
            ],
          ],
        },
        {
          model: ComplainantInformation,
          attributes: [
            [
              Sequelize.fn(
                "COUNT",
                Sequelize.col("informacionDenunciantes.id")
              ),
              "count",
            ],
          ],
        },
      ],
      group: [
        "relacionVictimas.id",
        "informacionDenunciados.id",
        "informacionDenunciantes.id",
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
