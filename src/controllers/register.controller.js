import ComplainantInformation from "../models/ComplainantInformation";
import Peoople from "../models/Peoople";
import Record from "../models/Record";
import RegisterCrimes from "../models/RegisterCrimes";
import VictimInformation from "../models/VictimInformation";
import DenouncedInformation from "../models/DenouncedInformation";
import StageCase from "../models/StageCase";
import ProceduralStage from "../models/ProceduralStage";
import Crimes from "../models/Crimes";
import { Sequelize } from "sequelize";

export const createRegister = async (req, res) => {
  const { register, delito, complainant, perpetrator, victim } = req.body;
  try {
    const newRegister = await Record.create(register);
    delito.principal = true;
    delito.oservaciones = "ninguno";
    delito.tipologiaId = delito.delito[0].id;
    delito.registroId = newRegister.id;
    const newRegisterCrimes = await RegisterCrimes.create(delito);
    victim.gradoInstruccionId = victim.gradoInstruccionId[0].id;
    victim.ocupacionId = victim.ocupacionId[0].id;
    const newVicitim = await Peoople.create(victim);
    const newVictimInformation = await VictimInformation.create({
      registroId: newRegister.id,
      personaId: newVicitim.id,
    });
    //denunciante
    complainant.gradoInstruccionId = complainant.gradoInstruccionId[0].id;
    complainant.ocupacionId = complainant.ocupacionId[0].id;
    const newComplainant = await Peoople.create(complainant);
    const newComplaintantInformation = await ComplainantInformation.create({
      registroId: newRegister.id,
      personaId: newComplainant.id,
      relacionVictimaId: 1,
    });
    //denunciado
    perpetrator.gradoInstruccionId = perpetrator.gradoInstruccionId[0].id;
    perpetrator.ocupacionId = perpetrator.ocupacionId[0].id;
    const newPerpetrator = await Peoople.create(perpetrator);
    const newDenouncedformation = await DenouncedInformation.create({
      registroId: newRegister.id,
      personaId: newPerpetrator.id,
      relacionVictimaId: 1,
    });
    const records = await Record.findByPk(newRegister.id, {
      attributes: ["id", "fechaRegistro", "numeroCaso", "tipoAsistencia"],
      include: [
        {
          model: DenouncedInformation,
          attributes: ["id"],
          include: [
            {
              model: Peoople,
              attributes: ["nombre", "apellido"],
            },
          ],
        },
        {
          model: VictimInformation,
          attributes: ["id"],
          include: [
            {
              model: Peoople,
              attributes: ["nombre", "apellido"],
            },
          ],
        },
        {
          model: StageCase,
          attributes: ["id"],
          include: [
            {
              model: ProceduralStage,
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: RegisterCrimes,
          attributes: ["id"],
          include: [
            {
              model: Crimes,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });
    res.status(201).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getALLRegisters = async (req, res) => {
  try {
    const { id } = req.params;
    const records = await Record.findAll({
      where: { usuarioId: id },
      attributes: ["id", "fechaRegistro", "numeroCaso", "tipoAsistencia"],
      include: [
        {
          model: DenouncedInformation,
          attributes: ["id"],
          include: [
            {
              model: Peoople,
              attributes: ["nombre", "apellido"],
            },
          ],
        },
        {
          model: VictimInformation,
          attributes: ["id"],
          include: [
            {
              model: Peoople,
              attributes: ["nombre", "apellido"],
            },
          ],
        },
        {
          model: StageCase,
          attributes: ["id"],
          include: [
            {
              model: ProceduralStage,
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: RegisterCrimes,
          attributes: ["id"],
          include: [
            {
              model: Crimes,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });
    res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteRegister = async (req, res) => {
  try {
    const { id } = req.params;
    await Record.destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Se elimino el registro con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getYearsRegister = async (req, res) => {
  try {
    const records = await Record.findAll({
      attributes: [
        [
          Sequelize.fn(
            "DISTINCT",
            Sequelize.fn("DATE_TRUNC", "year", Sequelize.col("fechaRegistro"))
          ),
          "year",
        ],
      ],
      group: ["year"],
    });

    res.status(201).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
