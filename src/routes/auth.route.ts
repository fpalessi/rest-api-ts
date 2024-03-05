import express from "express";
import {
  loginAdminHandler,
  loginUserHandler,
  logoutAdminHandler,
  logoutUserHandler,
} from "../controllers/auth.controller";
import requireAdmin from "../middlewares/requireAdmin";
import requireUser from "../middlewares/requireUser";
import validateResource from "../middlewares/validateResource";
import { loginSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/admin/login", validateResource(loginSchema), loginAdminHandler);

router.post("/admin/logout", requireAdmin, logoutAdminHandler);

router.post("/user/login", validateResource(loginSchema), loginUserHandler);

router.post("/user/logout", requireUser, logoutUserHandler);

export default router;
