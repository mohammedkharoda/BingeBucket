import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "@nextui-org/button";

const LogInBtn = () => {
  const { login } = useKindeAuth();
  return (
    <Button
      className="w-full hover:border-yellow-dark border-white"
      variant="bordered"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => login()}
    >
      <div className="text-white bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-md">
        Log In
      </div>
    </Button>
  );
};

export default LogInBtn;
