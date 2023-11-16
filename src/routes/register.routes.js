import { Router } from "express";
import {
  createRegister,
  getALLRegisters,
  deleteRegister,
  searchALLRegisters,
} from "../controllers/register.controller";

import {
  isAdmin,
  isAdminOrOperator,
  isOperator,
  verifyToken,
} from "../middlewares";
const router = Router();

router.get("/:id", [verifyToken, isAdminOrOperator], getALLRegisters);
router.post(
  "/search/:id",
  [verifyToken, isAdminOrOperator],
  searchALLRegisters
);
router.post("/", [verifyToken, isAdminOrOperator], createRegister);
router.delete("/:id", [verifyToken, isAdminOrOperator], deleteRegister);

export default router;
