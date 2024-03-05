import ProductModel from "../models/product.model";
import UserModel from "../models/user.model";

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const getUsers = () => UserModel.find();

export const getProducts = () => ProductModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ sessionToken: sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
