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
router.delete("/:id", deleteBranchesOffices);
router.put("/:id", updateBranchesOffices);
router.post("/", createBranchesOffices);
export default router;
