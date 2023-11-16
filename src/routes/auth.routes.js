import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
const router = Router();

//registro de usuario
router.post("/signUp", authCtrl.signUp);
//inicio de sesion
router.post("/signIn", authCtrl.signIn);
export default router;
