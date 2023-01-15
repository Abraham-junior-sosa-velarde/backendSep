// run app
import app from "./app";
import sequelize from "./database";

import "./models/BranchesOffice";
import "./models/Role";
import "./models/VictimRelatioship";
import "./models/User";
import "./models/City";
import "./models/ComplainantInformation";
import "./models/DenouncedInformation";
import "./models/InstructionDegree";
import "./models/Occupation";
import "./models/Peoople";
import "./models/ProceduralStage";
import "./models/Record";
import "./models/RegisterCrimes";
import "./models/SexualOrientation";
import "./models/StageCase";
import "./models/VictimInformation";
import "./models/Crimes";

const main = async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(process.env.PORT || 3000);
    console.log("server listen on port ", process.env.PORT || 3000);
  } catch (error) {
    console.log("no se pudo conectar con la base de datos");
  }
};

main();
