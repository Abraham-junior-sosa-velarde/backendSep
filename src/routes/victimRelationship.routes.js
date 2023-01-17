import { Router } from "express";
import {
  createVictimRelationship,
  deleteVictimRelationship,
  getAllVictimRelationship,
  updateVictimRelationship,
} from "../controllers/victimRelationship.controller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

router.get("/", getAllVictimRelationship);
router.delete("/:id", [verifyToken, isAdmin], deleteVictimRelationship);
router.put("/:id", [verifyToken, isAdmin], updateVictimRelationship);
router.post("/", [verifyToken, isAdmin], createVictimRelationship);
export default router;
