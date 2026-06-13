"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  RiMailLine,
  RiUserLine,
  RiMessage2Line,
  RiSendPlaneLine,
} from "react-icons/ri";

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
    <section className="py-20 px-6 lg:px-16 bg-bg-2 border-y border-border">
      <div className="max-w-site mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          {/* Left — copy */}
          <motion.div
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="eyebrow mb-4">Get in touch</div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-text leading-tight mb-4">
              Contact <span className="text-gradient">us</span>
            </h1>
            <p className="text-text-2 text-base leading-relaxed max-w-md">
              Have a question or feedback? We would love to hear from you. Fill
              in the form and we will get back to you as soon as possible.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {[
                { icon: RiMailLine, label: "Email response within 24 hours" },
                { icon: RiMessage2Line, label: "We read every message" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-accent/10 border border-accent/20">
                    <Icon className="text-accent" size={16} />
                  </div>
                  <span className="text-sm text-text-2">{label}</span>
                </div>
              ))}
            </div>

            <div className="hidden lg:block mt-12">
              <img
                alt="Contact Illustration"
                className="w-3/4"
                src="/happy-retro-robot.gif"
              />
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="card rounded-3xl p-8">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(processForm)}
              >
                {/* Name */}
                <div>
                  <label
                    className="block text-xs font-semibold text-text uppercase tracking-wider mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <RiUserLine
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-3 z-10"
                      size={16}
                    />
                    <input
                      id="name"
                      placeholder="Your name"
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="input pl-10"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-danger text-xs mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-xs font-semibold text-text uppercase tracking-wider mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <RiMailLine
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-3 z-10"
                      size={16}
                    />
                    <input
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="input pl-10"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-danger text-xs mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-xs font-semibold text-text uppercase tracking-wider mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us what's on your mind..."
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="input h-32 resize-none"
                  />
                  {errors.message && (
                    <p className="text-danger text-xs mt-1.5">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    {...register("terms", {
                      required: "You must agree to the terms",
                    })}
                    className="mt-0.5 w-4 h-4 rounded border-border accent-accent cursor-pointer"
                  />
                  <label
                    className="text-sm text-text-2 cursor-pointer"
                    htmlFor="terms"
                  >
                    I agree to the Terms of Service
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-danger text-xs -mt-3">
                    {errors.terms.message}
                  </p>
                )}

                <button
                  className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <RiSendPlaneLine size={16} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
