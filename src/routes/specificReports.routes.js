import { Router } from "express";
import {
  generalReports,
  getSpecificReporter,
} from "../controllers/specificReports.controller";
const router = Router();

router.post("/", getSpecificReporter);
router.get("/general", generalReports);

export default router;
