import { Router } from "express";
import { getYearsRegister } from "../controllers/register.controller";

import { isAdmin, isOperator, verifyToken } from "../middlewares";
const router = Router();

router.get("/years", getYearsRegister);

export default router;
