import { Router } from "express";

import {
  deleteStageCases,
  getAllStageCases,
  postStageCases,
  updateStageCases,
} from "../controllers/stageCases.controller";
const router = Router();

router.get("/:id", getAllStageCases);
router.post("/", postStageCases);
router.delete("/:id", deleteStageCases);
router.put("/:id", updateStageCases);
export default router;
