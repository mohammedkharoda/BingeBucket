"use client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "@nextui-org/button";

const SignUpBtn = () => {
  const { register } = useKindeAuth();
  return (
    <Button
      className="w-full bg-yellow-dark"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => register()}
    >
      <div className="text-white hover:text-gray-dark">Sign Up</div>
    </Button>
  );
};

export default SignUpBtn;
