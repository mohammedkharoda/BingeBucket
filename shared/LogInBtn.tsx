import { SignInButton } from "@clerk/nextjs";

const LogInBtn = () => {
  return (
    <SignInButton>
      <button
        className="px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
        style={{
          color: "#374151",
          border: "1.5px solid #D1D5DB",
          background: "transparent",
        }}
      >
        Sign In
      </button>
    </SignInButton>
  );
};

export default LogInBtn;
