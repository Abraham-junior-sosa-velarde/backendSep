//config express
import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import { createRoles } from "./utils/initialSetup";
//routes
import branchOffice from "./routes/branchOffice.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import cityRoutes from "./routes/city.routes";
import crimesRoutes from "./routes/crimes.routes";
import instructionDegreeRoutes from "./routes/instructioDegree.routes";
import occupationRoutes from "./routes/ocupation.routes";
import sexualOrientationRoutes from "./routes/sexualOrientation.routes";
import registerRoutes from "./routes/register.routes";
import specificReportsRoutes from "./routes/specificReports.routes";
import utilsRoutes from "./routes/utils.routes";
import proceduralStageRoutes from "./routes/proceduralStage.routes";
import victimRelationshipRoutes from "./routes/victimRelationship.routes";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

createRoles();
app.set("pkg", pkg);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").versions,
  });
});
app.use("/api/branchesOffices", branchOffice);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/crimes", crimesRoutes);
app.use("/api/instructionDegree", instructionDegreeRoutes);
app.use("/api/occupation", occupationRoutes);
app.use("/api/sexualOrientation", sexualOrientationRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/reporter", specificReportsRoutes);
app.use("/api/utils", utilsRoutes);
app.use("/api/proceduralStage", proceduralStageRoutes);
app.use("/api/victimRelationship", victimRelationshipRoutes);
export default app;
