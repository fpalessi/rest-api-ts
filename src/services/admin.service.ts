import AdminModel from "../models/admin.model";

export const createAdmin = (values: Record<string, any>) =>
  new AdminModel(values).save().then((admin) => admin.toObject());

export const getAdminByEmail = (email: string) => AdminModel.findOne({ email });

export const getAdminBySessionToken = (sessionToken: string) =>
  AdminModel.findOne({ sessionToken: sessionToken });
