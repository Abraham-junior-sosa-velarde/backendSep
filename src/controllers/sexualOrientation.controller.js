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

export const deleteSexualOrientations = async (req, res) => {
  try {
    const { id } = req.params;
    await SexualOrientation.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSexualOrientations = async (req, res) => {
  const { nombre } = req.body;
  try {
    const data = await SexualOrientation.create({ nombre });
    const created = await SexualOrientation.findByPk(data.id, {
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
    res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateSexualOrientations = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await SexualOrientation.findByPk(id, {
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
    data.nombre = name;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
