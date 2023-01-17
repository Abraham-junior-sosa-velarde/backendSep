import Record from "../models/Record";
import StageCase from "../models/StageCase";
import ProceduralStage from "../models/ProceduralStage";
export const getAllStageCases = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Record.findAll({
      where: { usuarioId: id },
      include: [
        {
          model: StageCase,
          include: [
            {
              model: ProceduralStage,
            },
          ],
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const postStageCases = async (req, res) => {
  try {
    const values = req.body;
    const valueCreate = await StageCase.create(values);
    const data = await Record.findAll({
      include: [
        {
          model: StageCase,
          where: { id: valueCreate.id },
          include: [
            {
              model: ProceduralStage,
            },
          ],
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteStageCases = async (req, res) => {
  try {
    const { id } = req.params;
    await StageCase.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStageCases = async (req, res) => {
  try {
    const { id } = req.params;
    const { fechaRegistro, accionSeguir } = req.body;
    const data = await StageCase.findByPk(id, {
      include: [
        {
          model: ProceduralStage,
        },
      ],
    });
    data.fechaRegistro = fechaRegistro;
    data.accionSeguir = accionSeguir;
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
