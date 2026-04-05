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
    <section className="py-20 px-6 lg:px-16 section-pastel-lavender border-y border-surface-4">
      <div className="max-w-site mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-1/2 w-full"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-gold" />
              <span className="text-xs font-bold text-gold uppercase tracking-widest">
                Get in touch
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Contact <span className="text-gold-gradient">us</span>
            </h1>
            <p className="text-muted text-base leading-relaxed max-w-md">
              Have a question or feedback? We would love to hear from you. Fill
              in the form and we will get back to you as soon as possible.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {[
                { icon: RiMailLine, label: "Email response within 24 hours" },
                { icon: RiMessage2Line, label: "We read every message" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-gold/10 border border-gold/20">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <span className="text-sm text-muted">{label}</span>
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-surface border border-surface-4 rounded-3xl p-8 shadow-card">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(processForm)}
              >
                {/* Name */}
                <div>
                  <label
                    className="block text-xs font-semibold text-white uppercase tracking-wider mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <RiUserLine
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle"
                    />
                    <input
                      id="name"
                      placeholder="Your name"
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-2 border border-surface-4 text-white placeholder:text-subtle text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red text-xs mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-xs font-semibold text-white uppercase tracking-wider mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <RiMailLine
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle"
                    />
                    <input
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-2 border border-surface-4 text-white placeholder:text-subtle text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red text-xs mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-xs font-semibold text-white uppercase tracking-wider mb-2"
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
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-surface-4 text-white placeholder:text-subtle text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all h-32 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red text-xs mt-1.5">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms", {
                      required: "You must agree to the terms",
                    })}
                    className="mt-0.5 w-4 h-4 rounded border-surface-4 accent-gold cursor-pointer"
                  />
                  <label
                    className="text-sm text-muted cursor-pointer"
                    htmlFor="terms"
                  >
                    I agree to the Terms of Service
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red text-xs -mt-3">
                    {errors.terms.message}
                  </p>
                )}

                <button
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gold hover:bg-gold-dim disabled:opacity-60 text-white font-semibold rounded-full shadow-card transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
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
