import { Router } from "express";
import {
  createBranchesOffices,
  deleteBranchesOffices,
  getBranchesOffices,
  updateBranchesOffices,
} from "../controllers/branchOffice.controller";

import { verifyToken, isAdmin } from "../middlewares";
const router = Router();

router.get("/", getBranchesOffices);
router.delete("/:id", [verifyToken, isAdmin], deleteBranchesOffices);
router.put("/:id", [verifyToken, isAdmin], updateBranchesOffices);
router.post("/", [verifyToken, isAdmin], createBranchesOffices);
export default router;
