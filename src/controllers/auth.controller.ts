import { Request, Response } from "express";

import { getUserByEmail } from "../services/user.service";
import { authentication, random } from "../services/auth.service";
import { getAdminByEmail } from "../services/admin.service";

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Rellene ambos campos");
    }

    const user = await getUserByEmail(email).select("+salt +password");

    if (!user) {
      return res.status(401).send("Email o contraseña incorrectos");
    }

    const expectedHash = authentication(user.salt, password);

    if (user.password != expectedHash) {
      return res.status(403);
    }
    const salt = random();
    user.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie("AUTH", user.sessionToken, { maxAge: 3.154e10 });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400);
  }
};

export const logoutUserHandler = async (req: Request, res: Response) => {
  res.cookie("AUTH", "", {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).send("User logged out");
};

export const loginAdminHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Rellene ambos campos");
    }

    const user = await getAdminByEmail(email).select("+salt +password");

    if (!user) {
      return res.status(401).send("Email o contraseña incorrectos");
    }

    const expectedHash = authentication(user.salt, password);

    if (user.password != expectedHash) {
      return res.status(403);
    }

    const salt = random();
    user.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie("ADMIN", user.sessionToken, { maxAge: 3.154e10 });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400);
  }
};

export const logoutAdminHandler = async (req: Request, res: Response) => {
  res.cookie("ADMIN", "", {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).send("Admin logged out");
};
