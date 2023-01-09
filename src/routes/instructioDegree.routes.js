import { Router } from "express";
import { getAllInstructionDegree } from "../controllers/instructionDegree.controller";
const router = Router();

router.get("/", getAllInstructionDegree);
export default router;
