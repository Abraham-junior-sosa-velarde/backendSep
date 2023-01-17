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
export const deleteCities = async (req, res) => {
  try {
    const { id } = req.params;
    await City.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCities = async (req, res) => {
  const { nombre } = req.body;
  try {
    const data = await City.create({ nombre });
    const created = await City.findByPk(data.id, {
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
    res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateCities = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await City.findByPk(id, {
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
    data.nombre = name;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
