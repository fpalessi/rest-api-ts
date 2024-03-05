import OrderModel from "../models/order.model";

export const getOrders = () => OrderModel.find();
