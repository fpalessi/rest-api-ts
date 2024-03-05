import express from "express";
import validateResource from "../middlewares/validateResource";
import { createProductSchema } from "../schemas/product.schema";
import requireUser from "../middlewares/requireUser";
import {
  createProductHandler,
  getProductsHandler,
} from "../controllers/product.controller";
import requireAdmin from "../middlewares/requireUser";

const router = express.Router();

router.post(
  "/",
  [requireUser, requireAdmin, validateResource(createProductSchema)],
  createProductHandler
);

router.get("/", getProductsHandler);

export default router;
