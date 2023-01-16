import { Router } from "express";
import {
  createOccupation,
  deleteOccupation,
  getAllOccupations,
  updateOccupation,
} from "../controllers/ocupation.controller";
const router = Router();

router.get("/", getAllOccupations);
router.post("/", createOccupation);
router.put("/:id", updateOccupation);
router.delete("/:id", deleteOccupation);
export default router;
