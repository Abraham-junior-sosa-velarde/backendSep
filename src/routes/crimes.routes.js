import { Router } from "express";
import { getAllCrimes } from "../controllers/crimes.controller";
const router = Router();

router.get("/", getAllCrimes);
export default router;
