import { Router } from "express";
import { createRegister } from "../controllers/register.controller";

import { isAdmin, isOperator, verifyToken } from "../middlewares";
const router = Router();

router.post("/", [verifyToken, isAdmin], createRegister);

export default router;
