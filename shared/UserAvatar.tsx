"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { FaSwatchbook } from "react-icons/fa";

import LogoutBtn from "./LogoutBtn";

import useUserStore from "@/store/userStore";

const UserAvatar = () => {
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center">
        <MenuButton
          className="flex items-center gap-4 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            alt="User Avatar"
            className="rounded-full w-10 h-10 object-cover"
            src={user?.picture || "/image/user.png"}
            width={40}
            height={40}
          />
          <span className="text-sm font-medium truncate">
            {user?.given_name || "User"}
          </span>
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={isOpen}
      >
        <MenuItems className="lg:absolute lg:bottom-4 relative right-0 mt-2 w-full max-w-[200px] bg-black shadow-lg rounded-md z-20">
          <div className="p-1">
            <MenuItem>
              {({ focus }) => (
                <button
                  className={`${
                    focus ? "bg-gray-700" : ""
                  } w-full text-left px-4 py-2 text-sm flex items-center gap-5 rounded-md`}
                  onClick={() => router.push("/watchlist")}
                >
                  <FaSwatchbook size={16} />
                  Watchlist
                </button>
              )}
            </MenuItem>
            <LogoutBtn />
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserAvatar;
