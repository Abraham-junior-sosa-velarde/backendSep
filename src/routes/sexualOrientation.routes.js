import { Router } from "express";
import {
  createSexualOrientations,
  deleteSexualOrientations,
  getAllSexualOrientations,
  updateSexualOrientations,
} from "../controllers/sexualOrientation.controller";
import { verifyToken, isAdmin } from "../middlewares";
const router = Router();

router.get("/", getAllSexualOrientations);
router.delete("/:id", [verifyToken, isAdmin], deleteSexualOrientations);
router.put("/:id", [verifyToken, isAdmin], updateSexualOrientations);
router.post("/", [verifyToken, isAdmin], createSexualOrientations);
export default router;
