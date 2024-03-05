import { object, string } from "zod";

export const orderSchema = object({
  body: object({
    email: string({
      required_error: "El email es obligatorio",
    }),
    password: string({
      required_error: "El password es obligatorio",
    }),
  }),
});
