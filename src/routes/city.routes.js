import { Router } from "express";
import {
  createCities,
  deleteCities,
  getAllCities,
  updateCities,
} from "../controllers/city.controller";
const router = Router();

router.get("/", getAllCities);
router.delete("/:id", deleteCities);
router.put("/:id", updateCities);
router.post("/", createCities);
export default router;
