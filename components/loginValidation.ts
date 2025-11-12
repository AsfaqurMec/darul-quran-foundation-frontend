import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string({ required_error: "Identifier is required" })
    .min(1, "Identifier is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

