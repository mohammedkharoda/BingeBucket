"use client";
import { sendEmail } from "@/app/_actions";
import React, { useState } from "react";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
type EmailFormProps = {
  email: string;
};

const EmailForm = () => {
  const [data, setData] = useState<EmailFormProps>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormProps>({ defaultValues: { email: "" } });
  const processForm: SubmitHandler<EmailFormProps> = async (data) => {
    const result = await sendEmail(data);

    if (result?.success) {
      console.log({ data: result.data });
      toast.success("YAY!🥳 You have Subscribe to our NewsLetter");
      reset();
      return;
    }

    // toast error
    console.log(result?.error);
    toast.error("Email Field can't be empty");
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="flex justify-between gap-5 lg:flex-row flex-col">
        <div className="flex-grow mr-4">
          {" "}
          {/* Added flex-grow and margin-right */}
          <input
            placeholder="Enter your Email"
            {...register("email")}
            className="w-full rounded-lg p-2 bg-white text-black"
          />
          {errors.email?.message && (
            <p className="ml-1 mt-1 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex items-center">
          {" "}
          {/* Centering the button vertically */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="px-3 py-2 w-full sm:w-auto bg-orange-yellow text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            {isSubmitting ? "Sending..." : "SignUp"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmailForm;
