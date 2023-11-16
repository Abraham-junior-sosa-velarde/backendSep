import { Sequelize } from "sequelize";
import sequelize from "../database";
import City from "../models/City";
import Crimes from "../models/Crimes";
import InstructionDegree from "../models/InstructionDegree";
import Occupation from "../models/Occupation";
import Peoople from "../models/Peoople";
import Record from "../models/Record";
import RegisterCrimes from "../models/RegisterCrimes";
import SexualOrientation from "../models/SexualOrientation";
import StageCase from "../models/StageCase";
import VictimInformation from "../models/VictimInformation";
import ProceduralStage from "../models/ProceduralStage";

export const getSpecificReporter = async (req, res) => {
  try {
    const { age, month, crimes } = req.body;
    let defMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if (month !== "") {
      defMonth = month;
    }
    let arrayCrimes = {};
    if (crimes.length > 0) {
      arrayCrimes = {
        id: {
          [Sequelize.Op.in]: crimes,
        },
      };
    }
    const registroAux = await Record.findAll({
      where: [
        Sequelize.where(
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('MONTH FROM "fechaRegistro"')
          ),
          { [Sequelize.Op.in]: defMonth }
        ),
        Sequelize.where(
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('YEAR FROM "fechaRegistro"')
          ),
          { [Sequelize.Op.in]: age }
        ),
      ],
      include: [
        {
          model: VictimInformation,
          include: [
            {
              model: Peoople,
              include: [
                { model: SexualOrientation },
                {
                  model: InstructionDegree,
                },
                {
                  model: Occupation,
                },
              ],
            },
          ],
        },
        {
          model: RegisterCrimes,

          include: [
            {
              model: Crimes,
              where: arrayCrimes,
            },
          ],
        },
        {
          model: City,
        },
      ],
    });
    const registro = registroAux.filter((e) => e.registroDelitos.length > 0);
    const orientationVictim = Object.values(
      registro.reduce((acc, obj) => {
        obj.informacionVictimas.map((e) => {
          acc[e.persona.orientacionesSexuale.nombre] =
            acc[e.persona.orientacionesSexuale.nombre] || [];
          acc[e.persona.orientacionesSexuale.nombre].push(
            e.persona.orientacionesSexuale.nombre
          );
          return acc;
        });
        return acc;
      }, {})
    );
    const occupationVictim = Object.values(
      registro.reduce((acc, obj) => {
        obj.informacionVictimas.map((e) => {
          acc[e.persona.gradoInstruccione.nombre] =
            acc[e.persona.gradoInstruccione.nombre] || [];
          acc[e.persona.gradoInstruccione.nombre].push(
            e.persona.gradoInstruccione.nombre
          );
          return acc;
        });
        return acc;
      }, {})
    );
    const instructionVictim = Object.values(
      registro.reduce((acc, obj) => {
        obj.informacionVictimas.map((e) => {
          acc[e.persona.ocupacione.nombre] =
            acc[e.persona.ocupacione.nombre] || [];
          acc[e.persona.ocupacione.nombre].push(e.persona.ocupacione.nombre);
          return acc;
        });
        return acc;
      }, {})
    );
    const sexVictim = Object.values(
      registro.reduce((acc, obj) => {
        obj.informacionVictimas.map((e) => {
          acc[e.persona.sexo] = acc[e.persona.sexo] || [];
          acc[e.persona.sexo].push(e.persona.sexo);
          return acc;
        });
        return acc;
      }, {})
    );
    const departament = Object.values(
      registro.reduce((acc, obj) => {
        acc[obj.ciudade.nombre] = acc[obj.ciudade.nombre] || [];
        acc[obj.ciudade.nombre].push(obj.ciudade.nombre);
        return acc;
      }, {})
    );
    const generalCrimes = Object.values(
      registro.reduce((acc, obj) => {
        obj.registroDelitos.map((e) => {
          acc[e.delito.nombre] = acc[e.delito.nombre] || [];
          acc[e.delito.nombre].push(e.delito.nombre);
          return acc;
        });
        return acc;
      }, {})
    );
    res.status(200).json({
      orientationVictim,
      sexVictim,
      generalCrimes,
      departament,
      occupationVictim,
      instructionVictim,
      registro,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const generalReports = async (req, res) => {
  try {
    var currentDate = new Date();

    const data = await Record.findAll({
      attributes: [
        [
          Sequelize.fn("date_part", "year", Sequelize.col("fechaRegistro")),
          "year",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      group: ["year"],
      order: [[Sequelize.col("year"), "ASC"]],
    });
    const registroAux = await Record.findAll({
      where: [
        Sequelize.where(
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('MONTH FROM "fechaRegistro"')
          ),
          { [Sequelize.Op.in]: [currentDate.getMonth() + 1] }
        ),
        Sequelize.where(
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('YEAR FROM "fechaRegistro"')
          ),
          { [Sequelize.Op.in]: [currentDate.getFullYear()] }
        ),
      ],
      include: [
        {
          model: City,
        },
        {
          model: VictimInformation,
          include: [
            {
              model: Peoople,
              include: [
                { model: SexualOrientation },
                {
                  model: InstructionDegree,
                },
                {
                  model: Occupation,
                },
              ],
            },
          ],
        },
      ],
    });
    const departament = Object.values(
      registroAux.reduce((acc, obj) => {
        acc[obj.ciudade.nombre] = acc[obj.ciudade.nombre] || [];
        acc[obj.ciudade.nombre].push(obj.ciudade.nombre);
        return acc;
      }, {})
    );
    const sexVictim = Object.values(
      registroAux.reduce((acc, obj) => {
        obj.informacionVictimas.map((e) => {
          acc[e.persona.sexo] = acc[e.persona.sexo] || [];
          acc[e.persona.sexo].push(e.persona.sexo);
          return acc;
        });
        return acc;
      }, {})
    );

    const statusCases = await ProceduralStage.findAll({
      attributes: ["id", "nombre"],
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

    res
      .status(201)
      .json({ status: statusCases, years: data, departament, sexVictim });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
