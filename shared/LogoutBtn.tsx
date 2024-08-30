import { MenuItem } from "@headlessui/react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { IoLogOutSharp } from "react-icons/io5";

const LogoutBtn = () => {
  return (
    <LogoutLink>
      <MenuItem>
        {({ focus }) => (
          <button
            className={`${
              focus ? "bg-crimson-red rounded-md" : ""
            } w-full text-left px-4 py-2 text-sm text-gray-700 flex gap-5 items-center`}
          >
            <IoLogOutSharp size={16} />
            Logout
          </button>
        )}
      </MenuItem>
    </LogoutLink>
  );
};

export default LogoutBtn;
