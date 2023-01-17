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

export const deleteCrimes = async (req, res) => {
  try {
    const { id } = req.params;
    await Crimes.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCrimes = async (req, res) => {
  const { nombre } = req.body;
  try {
    const data = await Crimes.create({ nombre });
    const created = await Crimes.findByPk(data.id, {
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
    res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateCrimes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await Crimes.findByPk(id, {
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
    data.nombre = name;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
