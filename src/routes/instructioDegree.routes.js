import { Router } from "express";
import {
  createInstructionDegree,
  deleteInstructionDegree,
  getAllInstructionDegree,
  updateInstructionDegree,
} from "../controllers/instructionDegree.controller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

router.get("/", getAllInstructionDegree);
router.delete("/:id", [verifyToken, isAdmin], deleteInstructionDegree);
router.put("/:id", [verifyToken, isAdmin], updateInstructionDegree);
router.post("/", [verifyToken, isAdmin], createInstructionDegree);
export default router;
