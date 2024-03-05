import express from "express";
import cors from "cors";
import config from "config";
import userRoute from "../routes/user.route";
import adminRoute from "../routes/admin.route";
import productRoute from "../routes/product.route";
import orderRoute from "../routes/order.route";
import authRoute from "../routes/auth.route";
import cookieParser from "cookie-parser";

const createServer = () => {
  const app = express();

  const server = config.get<string>("server");

  app.use(
    cors({
      credentials: true,
      origin: server,
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  app.use("/api/users", userRoute);
  app.use("/api/admin", adminRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/products", productRoute);
  app.use("/api/orders", orderRoute);

  return app;
};

export default createServer;
