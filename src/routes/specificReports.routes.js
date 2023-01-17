import { Router } from "express";
import {
  generalReports,
  getSpecificReporter,
} from "../controllers/specificReports.controller";
import { verifyToken } from "../middlewares";
const router = Router();

router.post("/", [verifyToken], getSpecificReporter);
router.get("/general", [verifyToken], generalReports);

export default router;
