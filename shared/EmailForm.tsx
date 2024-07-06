"use client";
import React, { useState } from "react";
import { set, SubmitHandler, useForm } from "react-hook-form";

type EmailFormProps = {
  email: string;
};

const EmailForm = () => {
  const [data, setData] = useState<EmailFormProps>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailFormProps>({ defaultValues: { email: "" } });
  const processForm: SubmitHandler<EmailFormProps> = (data) => setData(data);
  return (
    <form onSubmit={handleSubmit(processForm)}>
      <input
        type="email"
        placeholder="Enter your email"
        {...register("email", { required: "Email is being Required! ✉️" })}
        className="p-2 rounded-lg text-center bg-white w-full border-none outline-none mb-5"
      />
      <div className="flex flex-col gap-5 items-center justify-center">
        {errors.email && (
          <p className="text-[16px] text-crimson-red">{errors.email.message}</p>
        )}
        <button
          type="submit"
          className="px-3 py-2 w-[50%]  bg-orange-yellow text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
