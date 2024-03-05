import { Request, Response } from "express";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUsers,
} from "../services/user.service";
import { authentication, random } from "../services/auth.service";

export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400).send("Correo ya registrado");
    }

    const salt = random();
    const user = await createUser({
      email,
      name,
      salt,
      password: authentication(salt, password),
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).send("mal");
  }
};
