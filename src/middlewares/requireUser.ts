import { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "../services/user.service";
import { merge } from "lodash";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies["AUTH"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(405);
    }

    merge(req, { identity: existingUser });

    console.log(existingUser);

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export default requireUser;
