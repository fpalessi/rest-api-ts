import mongoose, { mongo } from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Couldnt establish connection");
    process.exit(1);
  }
};

export default connect;
