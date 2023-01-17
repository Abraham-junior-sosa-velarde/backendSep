import { Router } from "express";
import {
  createCrimes,
  deleteCrimes,
  getAllCrimes,
  updateCrimes,
} from "../controllers/crimes.controller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

router.get("/", getAllCrimes);
router.delete("/:id", [verifyToken, isAdmin], deleteCrimes);
router.put("/:id", [verifyToken, isAdmin], updateCrimes);
router.post("/", [verifyToken, isAdmin], createCrimes);
export default router;
