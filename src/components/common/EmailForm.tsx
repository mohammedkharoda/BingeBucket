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
        <div className="flex-1 text-left">
          <input
            placeholder="your@email.com"
            {...register("email")}
            className="input"
          />
          {errors.email?.message && (
            <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
          )}
        </div>
        <button
          className="btn-primary whitespace-nowrap disabled:opacity-50"
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
