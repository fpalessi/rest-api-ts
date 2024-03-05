import express from "express";
import requireAdmin from "../middlewares/requireAdmin";
import requireUser from "../middlewares/requireUser";
import {
  createOrderHandler,
  getOrdersHandler,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/", requireUser, createOrderHandler);
router.get("/", requireAdmin, getOrdersHandler);

export default router;
