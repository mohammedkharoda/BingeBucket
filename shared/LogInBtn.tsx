import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@nextui-org/button";

const LogInBtn = () => {
  return (
    <Button
      className="w-full hover:border-yellow-dark border-white"
      variant="bordered"
    >
      <div className="text-white bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-md">
        <LoginLink postLoginRedirectURL="/">Log In</LoginLink>
      </div>
    </Button>
  );
};

export default LogInBtn;
