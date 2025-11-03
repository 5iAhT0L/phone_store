import z from "zod";
import { ResponseError } from "../errors/responseError.js";

export const createUserSchema = z.object({
  fullname: z.string().min(3, "Fullname minimum is 3 characters"),
  username: z.string().min(3, "Username minimum is 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password minimum is 6 characters"),
  role: z.enum(
    ["admin", "user"],
    "Role must be either 'admin' or 'user'"
  ),
});

export default function validate(schema, request) {
  const result = schema.safeParse(request);

  if (!result.success) {
    const messages = result.error.errors.map((e) => e.message).join(", ");
    throw new ResponseError(`Validation Error: ${messages}`, 400);
  }

  return result.data;
}

export const updateUserSchema = z.object({
  fullname: z.string().min(3, "Fullname minimum is 3 characters").optional(),
  username: z.string().min(3, "Username minimum is 3 characters").optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password minimum is 6 characters").optional(),
    role: z
    .enum(
      ["admin", "user"],
        "Role must be either 'admin' or 'user'"
    ).optional(),
});