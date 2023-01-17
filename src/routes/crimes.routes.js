import { Router } from "express";
import {
  createCrimes,
  deleteCrimes,
  getAllCrimes,
  updateCrimes,
} from "../controllers/crimes.controller";
const router = Router();

router.get("/", getAllCrimes);
router.delete("/:id", deleteCrimes);
router.put("/:id", updateCrimes);
router.post("/", createCrimes);
export default router;
