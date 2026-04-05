"use server";

import React from "react";
import { Resend } from "resend";
import { z } from "zod";

import ContactFormSubmissionEmail from "@/emails/contact-form-email";
import NewsLetterForm from "@/emails/newsletter-form-email";
import { ContactFormSchema, NewsLetterFormSchema } from "@/types/schema";

type NewsLetterFormInputs = z.infer<typeof NewsLetterFormSchema>;
type ContactFormInputs = z.infer<typeof ContactFormSchema>;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: NewsLetterFormInputs) {
  const result = NewsLetterFormSchema.safeParse(data);

  if (result.success) {
    const { email } = result.data;

    try {
      const data = await resend.emails.send({
        from: "BingeBucket <bingebucket@resend.dev>",
        to: [email],
        subject: "Contact form submission",
        text: `\nEmail: ${email}`,
        react: NewsLetterForm({ email }) as React.ReactElement,
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
        from: "BingeBucket <bingebucket@resend.dev>",
        to: [email],
        subject: "New Contact Form Submission",
        text: `\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        react: ContactFormSubmissionEmail({ name, email, message }) as React.ReactElement,
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
