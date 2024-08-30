"use client";

import useUserStore from "@/store/userStore";
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

const UserAvatar = () => {
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="flex items-center gap-4 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={user?.picture || "/image/face.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-[16px] font-medium">
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
        <MenuItems className="absolute right-0 mt-2 w-full bg-black shadow-lg rounded-md z-20">
          <div className="p-1">
            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={() => router.push("/watchlist")}
                  className={`${
                    focus ? "bg-brown-dark rounded-md" : ""
                  } w-full text-left px-4 py-2 text-sm rounded-md flex items-center gap-5`}
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
