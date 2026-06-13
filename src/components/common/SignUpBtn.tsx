"use client";
import { SignUpButton } from "@clerk/nextjs";

const SignUpBtn = () => {
  return (
    <SignUpButton>
      <button className="btn-primary">Get Started</button>
    </SignUpButton>
  );
};

export default SignUpBtn;
