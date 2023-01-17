import { Router } from "express";
import {
  createVictimRelationship,
  deleteVictimRelationship,
  getAllVictimRelationship,
  updateVictimRelationship,
} from "../controllers/victimRelationship.controller";
const router = Router();

router.get("/", getAllVictimRelationship);
router.delete("/:id", deleteVictimRelationship);
router.put("/:id", updateVictimRelationship);
router.post("/", createVictimRelationship);
export default router;
