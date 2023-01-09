import ComplainantInformation from "../models/ComplainantInformation";
import Peoople from "../models/Peoople";
import Record from "../models/Record";
import RegisterCrimes from "../models/RegisterCrimes";
import VictimInformation from "../models/VictimInformation";
import DenouncedInformation from "../models/DenouncedInformation";

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
    res.status(201).json({
      newRegister,
      newRegisterCrimes,
      newVictimInformation,
      newComplaintantInformation,
      newDenouncedformation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
