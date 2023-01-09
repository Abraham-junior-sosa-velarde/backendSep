import { Router } from "express";
import { getAllCities } from "../controllers/city.controller";
const router = Router();

router.get("/", getAllCities);
export default router;
