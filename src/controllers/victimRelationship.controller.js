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

export const deleteVictimRelationship = async (req, res) => {
  try {
    const { id } = req.params;
    await VictimRelatioship.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createVictimRelationship = async (req, res) => {
  const { nombre } = req.body;
  try {
    const data = await VictimRelatioship.create({ nombre });
    const created = await VictimRelatioship.findByPk(data.id, {
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
    res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateVictimRelationship = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await VictimRelatioship.findByPk(id, {
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
    data.nombre = name;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
