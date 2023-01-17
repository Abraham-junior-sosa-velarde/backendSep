import { Router } from "express";
import {
  getSpecificReporter,
  getYearsRegister,
} from "../controllers/register.controller";

import { isAdmin, isOperator, verifyToken } from "../middlewares";
const router = Router();

router.get("/years", getYearsRegister);
router.get("/register/:id", getSpecificReporter);

export default router;
