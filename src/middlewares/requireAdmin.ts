import { Request, Response, NextFunction } from "express";
import { getAdminBySessionToken } from "../services/admin.service";
import { merge } from "lodash";

const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["ADMIN"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingAdmin = await getAdminBySessionToken(sessionToken);

    if (!existingAdmin) {
      return res.sendStatus(405);
    }

    merge(req, { identity: existingAdmin });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export default requireAdmin;
