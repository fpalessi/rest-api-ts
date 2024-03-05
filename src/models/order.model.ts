import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface OrderInput {
  user: UserDocument["_id"];
  total: number;
  quantity: number;
}

export interface OrderDocument extends OrderInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    total: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default OrderModel;
