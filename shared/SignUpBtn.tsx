"use client";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@nextui-org/button";

const SignUpBtn = () => {
  return (
    <Button className="w-full bg-yellow-dark">
      <div className="text-white hover:text-gray-dark">
        <RegisterLink postLoginRedirectURL="/"> Sign Up </RegisterLink>
      </div>
    </Button>
  );
};

export default SignUpBtn;
