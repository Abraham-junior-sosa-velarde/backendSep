import { Router } from "express";

import {
  deleteStageCases,
  getAllStageCases,
  postStageCases,
  updateStageCases,
} from "../controllers/stageCases.controller";
import {
  verifyToken,
  isAdmin,
  isOperator,
  isAdminOrOperator,
} from "../middlewares";

const router = Router();

router.get("/:id", [verifyToken, isAdminOrOperator], getAllStageCases);
router.post("/", [verifyToken, isAdminOrOperator], postStageCases);
router.delete("/:id", [verifyToken, isAdminOrOperator], deleteStageCases);
router.put("/:id", [verifyToken, isAdminOrOperator], updateStageCases);
export default router;
