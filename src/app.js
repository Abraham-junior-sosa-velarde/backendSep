//config express
import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
//routes
import branchOffice from "./routes/branchOffice.routes";
import authRoutes from "./routes/auth.routes";
import { createRoles } from "./utils/initialSetup";
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
export default app;
