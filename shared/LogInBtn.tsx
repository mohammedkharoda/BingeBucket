import { SignInButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";

const LogInBtn = () => {
  return (
    <Button
      className="w-full hover:border-yellow-dark border-white"
      variant="bordered"
    >
      <SignInButton>
        <p className="text-white bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-md">
          Log In
        </p>
      </SignInButton>
    </Button>
  );
};

export default LogInBtn;
