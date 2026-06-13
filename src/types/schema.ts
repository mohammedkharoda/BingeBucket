import { z } from "zod";
export const FormDataSchema = z.object({
  email: z.string().min(1, { message: "Name is required." }),
});

export const NewsLetterFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid email."),
});

export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email("Invalid email."),
  message: z.string().min(1, { message: "Message is required." }),
  terms: z
    .boolean()
    .refine((value) => value, { message: "Checkbox is required" }),
});
