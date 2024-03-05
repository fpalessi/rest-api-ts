import { Request, Response } from "express";
import OrderModel from "../models/order.model";
import { getOrders } from "../services/order.service";

export const createOrderHandler = async (req: Request, res: Response) => {
  const order = new OrderModel(req.body);
  try {
    const newOrder = await order.save();
    res.json(newOrder);
  } catch (error) {
    return res.status(400);
  }
};

export const getOrdersHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400);
  }
};
