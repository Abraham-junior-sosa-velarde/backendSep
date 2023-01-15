import { Router } from "express";
import { getSpecificReporter } from "../controllers/specificReports.controller";
const router = Router();

router.post("/", getSpecificReporter);

export default router;
