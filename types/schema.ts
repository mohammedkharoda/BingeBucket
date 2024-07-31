import { z } from "zod";
export const FormDataSchema = z.object({
  email: z.string().min(1, { message: "Name is required." }),
});

export const ContactFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid email."),
});
