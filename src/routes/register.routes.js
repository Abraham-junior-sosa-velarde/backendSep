import { Router } from "express";
import {
  createRegister,
  getALLRegisters,
  deleteRegister,
} from "../controllers/register.controller";

import { isAdmin, isOperator, verifyToken } from "../middlewares";
const router = Router();

router.get("/:id", [verifyToken], getALLRegisters);
router.post("/", [verifyToken, isAdmin], createRegister);
router.delete("/:id", [verifyToken], deleteRegister);

export default router;
