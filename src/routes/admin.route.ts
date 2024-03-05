import express from "express";
import { registerAdminHandler } from "../controllers/admin.controller";
import validateResource from "../middlewares/validateResource";
import { createAdminSchema } from "../schemas/admin.schema";

const router = express.Router();

router.post(
  "/register",
  validateResource(createAdminSchema),
  registerAdminHandler
);

export default router;
