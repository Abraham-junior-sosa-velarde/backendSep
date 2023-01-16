import { Router } from "express";
import { getAllVictimRelationship } from "../controllers/victimRelationship.controller";
const router = Router();

router.get("/", getAllVictimRelationship);
export default router;
