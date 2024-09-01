"use client";
import { Checkbox } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendContactEmail } from "@/app/_actions";

type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
  terms: boolean;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    defaultValues: { name: "", email: "", message: "", terms: false },
  });

  const processForm: SubmitHandler<ContactFormInputs> = async (data) => {
    const result = await sendContactEmail(data);

    if (result?.success) {
      toast.success("Your message has been sent successfully!");
      reset();

      return;
    }

    toast.error("Failed to send your message. Please try again.");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-10 bg-yellow-700">
      <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
        <div className="flex flex-col items-start">
          <h2 className="text-white text-lg font-semibold mb-2">
            Get in touch
          </h2>
          <h1 className="text-white text-[36px] font-bold mb-6">Contact us</h1>
          <p className="text-white text-[18px] mb-8">
            Have a question or feedback? We&apos;d love to hear from you.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(processForm)}>
          <div>
            <input
              placeholder="Name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 rounded-lg bg-white text-black"
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 rounded-lg bg-white text-black"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <textarea
              placeholder="Enter your message..."
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 rounded-lg bg-white text-black h-32"
            />
            {errors.message && (
              <p className="text-red-500 mt-1">{errors.message.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <Checkbox
              color="warning"
              type="checkbox"
              {...register("terms", {
                required: "You must agree to the terms",
              })}
              id="terms"
            />
            <label className="text-white" htmlFor="terms">
              I agree to the Terms
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 mt-1">{errors.terms.message}</p>
          )}
          <button
            className="w-full py-3 bg-brown-dark text-white font-semibold rounded-lg hover:bg-orange-yellow transition-colors hover:text-black"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full flex justify-center">
        <img
          alt="Contact Illustration"
          className="lg:w-3/4 w-full rounded-lg hidden lg:block"
          src="/image/face.png"
        />
      </div>
    </div>
  );
};

export default ContactForm;
