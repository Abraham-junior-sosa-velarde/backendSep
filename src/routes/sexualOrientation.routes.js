import { Router } from "express";
import {
  createSexualOrientations,
  deleteSexualOrientations,
  getAllSexualOrientations,
  updateSexualOrientations,
} from "../controllers/sexualOrientation.controller";
const router = Router();

router.get("/", getAllSexualOrientations);
router.delete("/:id", deleteSexualOrientations);
router.put("/:id", updateSexualOrientations);
router.post("/", createSexualOrientations);
export default router;
