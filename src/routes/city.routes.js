import { Router } from "express";
import {
  createCities,
  deleteCities,
  getAllCities,
  updateCities,
} from "../controllers/city.controller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

router.get("/", getAllCities);
router.delete("/:id", [verifyToken, isAdmin], deleteCities);
router.put("/:id", [verifyToken, isAdmin], updateCities);
router.post("/", [verifyToken, isAdmin], createCities);
export default router;
