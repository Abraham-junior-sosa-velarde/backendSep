import { Router } from "express";
import {
  createInstructionDegree,
  deleteInstructionDegree,
  getAllInstructionDegree,
  updateInstructionDegree,
} from "../controllers/instructionDegree.controller";
const router = Router();

router.get("/", getAllInstructionDegree);
router.delete("/:id", deleteInstructionDegree);
router.put("/:id", updateInstructionDegree);
router.post("/", createInstructionDegree);
export default router;
