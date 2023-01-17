import { Router } from "express";
import {
  createOccupation,
  deleteOccupation,
  getAllOccupations,
  updateOccupation,
} from "../controllers/ocupation.controller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

router.get("/", getAllOccupations);
router.post("/", [verifyToken, isAdmin], createOccupation);
router.put("/:id", [verifyToken, isAdmin], updateOccupation);
router.delete("/:id", [verifyToken, isAdmin], deleteOccupation);
export default router;
