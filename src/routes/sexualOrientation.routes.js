import { Router } from "express";
import { getAllSexualOrientations } from "../controllers/sexualOrientation.controller";
const router = Router();

router.get("/", getAllSexualOrientations);
export default router;
