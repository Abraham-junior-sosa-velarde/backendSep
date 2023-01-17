import { Router } from "express";
import {
  createProceduralStage,
  deleteProceduralStage,
  getAllProceduralStage,
  updateProceduralStage,
} from "../controllers/proceduralStage.cotroller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

router.get("/", getAllProceduralStage);
router.post("/", [verifyToken, isAdmin], createProceduralStage);
router.put("/:id", [verifyToken, isAdmin], updateProceduralStage);
router.delete("/:id", [verifyToken, isAdmin], deleteProceduralStage);

export default router;
