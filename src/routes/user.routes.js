import { Router } from "express";
import {
  createUser,
  getUsers,
  getUsersById,
  updateUser,
  changeStatus,
} from "../controllers/user.controller";
import { isAdmin, verifyToken } from "../middlewares";
const router = Router();

router.get("/", [verifyToken, isAdmin], getUsers);
router.post("/", [verifyToken, isAdmin], createUser);
router.put("/:id", [verifyToken, isAdmin], updateUser);
router.get("/:id", [verifyToken, isAdmin], getUsersById);
router.put("/changeStatus/:id", [verifyToken, isAdmin], changeStatus);

export default router;
