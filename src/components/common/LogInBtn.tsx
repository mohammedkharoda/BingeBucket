import { SignInButton } from "@clerk/nextjs";

const LogInBtn = () => {
  return (
    <SignInButton>
      <button className="btn-ghost">Sign In</button>
    </SignInButton>
  );
};

export default LogInBtn;
