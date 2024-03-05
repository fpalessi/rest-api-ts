import express from "express";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schemas/user.schema";
import {
  deleteUserHandler,
  getUsersHandler,
  registerUserHandler,
} from "../controllers/user.controller";
import requireAdmin from "../middlewares/requireAdmin";

const router = express.Router();

router.post(
  "/register",
  validateResource(createUserSchema),
  registerUserHandler
);

router.get("/", requireAdmin, getUsersHandler);

router.delete("/deleteUser/:id", requireAdmin, deleteUserHandler);

router.delete("/deleteUser", requireAdmin, deleteUserHandler);

export default router;
