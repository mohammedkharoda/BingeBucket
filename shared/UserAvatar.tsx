import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Menu,
} from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const UserAvatar = () => {
  const { user } = useKindeAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  console.log(user);
  const handleLogout = async () => {
    <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>;
    router.push("/");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={user?.picture || "/images/face.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-sm font-medium">
            {user?.given_name || "User"}
          </span>
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => router.push("/watchlist")}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Watchlist
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserAvatar;
