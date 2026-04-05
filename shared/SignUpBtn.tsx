"use client";
import { SignUpButton } from "@clerk/nextjs";

const SignUpBtn = () => {
  return (
    <SignUpButton>
      <button
        className="px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
        style={{
          background: "#E8756A",
          color: "#FFFFFF",
          boxShadow: "0 4px 14px rgba(232,117,106,0.35)",
        }}
      >
        Get Started
      </button>
    </SignUpButton>
  );
};

export default SignUpBtn;
