import { TypeOf, object, string } from "zod";

export const createAdminSchema = object({
  body: object({
    name: string({
      required_error: "Nombre es obligatorio",
    }),
    password: string({
      required_error: "Contraseña es obligatoria",
    }).min(6, "Contraseña demasiado corta - mínimo 6 caracteres"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    email: string({
      required_error: "Email es obligatorio",
    }).email("Email introducido no válido"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  }),
});

export type CreateAdminInput = TypeOf<typeof createAdminSchema>;
