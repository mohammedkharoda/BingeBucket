"use server";

import ContactFormSubmissionEmail from "@/emails/contact-form-email";
import NewsLetterForm from "@/emails/newsletter-form-email";
import { ContactFormSchema, NewsLetterFormSchema } from "@/types/schema";
import { Resend } from "resend";
import { z } from "zod";

type ContactFormInputs = z.infer<typeof NewsLetterFormSchema>;
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(data: ContactFormInputs) {
  const result = NewsLetterFormSchema.safeParse(data);

  if (result.success) {
    const { email } = result.data;
    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "Contact form submission",
        text: `\nEmail: ${email}`,
        react: NewsLetterForm({ email }),
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

export async function sendContactEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.success) {
    const { name, email, message } = result.data;
    try {
      const emailData = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "New Contact Form Submission",
        text: `\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        react: ContactFormSubmissionEmail({ name, email, message }), // Assuming you have a React email template component
      });
      return { success: true, data: emailData };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
