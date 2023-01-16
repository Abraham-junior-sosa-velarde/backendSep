import { Sequelize } from "sequelize";
import ProceduralStage from "../models/ProceduralStage";
import StageCase from "../models/StageCase";

export const getAllProceduralStage = async (req, res) => {
  try {
    const data = await ProceduralStage.findAll({
      include: [
        {
          model: StageCase,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("etapaCasos.id")), "count"],
          ],
        },
      ],
      group: ["etapasProcesales.id", "etapaCasos.id"],
    });
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProceduralStage = async (req, res) => {
  const { nombre } = req.body;
  try {
    const data = await ProceduralStage.create({ nombre });
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProceduralStage = async (req, res) => {
  try {
    const { id } = req.params;
    await ProceduralStage.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateProceduralStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await ProceduralStage.findByPk(id, {
      include: [
        {
          model: StageCase,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("etapaCasos.id")), "count"],
          ],
        },
      ],
      group: ["etapasProcesales.id", "etapaCasos.id"],
    });
    data.nombre = name;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
