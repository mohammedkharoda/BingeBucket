"use server";

import ContactFormEmail from "@/emails/contact-form-email";
import { ContactFormSchema } from "@/types/schema";
import { Resend } from "resend";
import { z } from "zod";

type ContactFormInputs = z.infer<typeof ContactFormSchema>;
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.success) {
    const { email } = result.data;
    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "Contact form submission",
        text: `\nEmail: ${email}`,
        react: ContactFormEmail({ email }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
