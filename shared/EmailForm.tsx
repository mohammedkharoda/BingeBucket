"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendEmail } from "@/app/_actions";

type EmailFormProps = {
  email: string;
};

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormProps>({ defaultValues: { email: "" } });

  const processForm: SubmitHandler<EmailFormProps> = async (data) => {
    const result = await sendEmail(data);

    if (result?.success) {
      toast.success("Subscribed! Welcome to BingeBucket.");
      reset();

      return;
    }
    toast.error("Please enter a valid email address.");
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            placeholder="your@email.com"
            {...register("email")}
            className="w-full px-4 py-2.5 bg-surface-2 border border-white/10 rounded-lg text-sm text-white placeholder:text-subtle focus:outline-none focus:border-gold/30 transition-all duration-200"
          />
          {errors.email?.message && (
            <p className="mt-1 text-xs text-red">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          className="px-5 py-2.5 bg-gold hover:bg-gold-dim text-black text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap disabled:opacity-50 cursor-pointer"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "..." : "Subscribe"}
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
