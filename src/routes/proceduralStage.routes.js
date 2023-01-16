import { Router } from "express";
import {
  createProceduralStage,
  deleteProceduralStage,
  getAllProceduralStage,
  updateProceduralStage,
} from "../controllers/proceduralStage.cotroller";
const router = Router();

router.get("/", getAllProceduralStage);
router.post("/", createProceduralStage);
router.put("/:id", updateProceduralStage);
router.delete("/:id", deleteProceduralStage);

export default router;
