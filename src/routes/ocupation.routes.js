import { Router } from "express";
import { getAllOcupations } from "../controllers/ocupation.controller";
const router = Router();

router.get("/", getAllOcupations);
export default router;
