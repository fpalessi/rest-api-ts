import { Request, Response } from "express";
import { authentication, random } from "../services/auth.service";
import { createAdmin, getAdminByEmail } from "../services/admin.service";

export const registerAdminHandler = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.sendStatus(400);
    }

    const existingAdmin = await getAdminByEmail(email);

    if (existingAdmin) {
      return res.sendStatus(400).send("Correo ya registrado");
    }

    const salt = random();
    const user = await createAdmin({
      email,
      name,
      salt,
      password: authentication(salt, password),
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400);
  }
};
