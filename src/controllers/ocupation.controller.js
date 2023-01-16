import { Sequelize } from "sequelize";
import Occupation from "../models/Occupation";
import Peoople from "../models/Peoople";

export const getAllOccupations = async (req, res) => {
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

export const createOccupation = async (req, res) => {
  const { nombre } = req.body;
  try {
    const data = await Occupation.create({ nombre });
    const created = await Occupation.findByPk(data.id, {
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
    res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOccupation = async (req, res) => {
  try {
    const { id } = req.params;
    await Occupation.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateOccupation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await Occupation.findByPk(id, {
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
    data.nombre = name;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
