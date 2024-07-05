import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";

const SignUpBtn = () => {
  return (
    <Button className="w-full bg-yellow-dark">
      <SignUpButton>
        <p className="text-white hover:text-gray-dark ">Sign Up</p>
      </SignUpButton>
    </Button>
  );
};

export default SignUpBtn;
