import { Router } from "express";
import * as branchesOfficesCtrl from "../controllers/branchOffice.controller";

import { verifyToken, isAdmin } from "../middlewares";
const router = Router();

router.get("/", branchesOfficesCtrl.getBranchesOffices);
router.post("/", [verifyToken, isAdmin], branchesOfficesCtrl.creatBranchOffice);
router.get("/:branchOfficeId", branchesOfficesCtrl.getBranchesOfficesById);
router.put(
  "/:branchOfficeId",
  verifyToken,
  branchesOfficesCtrl.updateBranchesOfficesById
);
router.delete(
  "/:branchOfficeId",
  verifyToken,
  branchesOfficesCtrl.deleteBranchesOfficesById
);

export default router;
