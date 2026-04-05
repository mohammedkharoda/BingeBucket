"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { RiBookmarkLine, RiArrowDownSLine } from "react-icons/ri";

import LogoutBtn from "./LogoutBtn";

const UserAvatar = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full hover:bg-surface-2 border border-transparent hover:border-surface-4 transition-all duration-200 focus:outline-none cursor-pointer">
        <Image
          alt={user?.firstName || "User"}
          className="rounded-full object-cover ring-2 ring-surface-4"
          src={user?.imageUrl || "/image/user.png"}
          width={30}
          height={30}
        />
        <span className="text-sm font-medium text-white hidden sm:block">
          {user?.firstName || "User"}
        </span>
        <RiArrowDownSLine size={14} className="text-subtle" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95 translate-y-1"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 translate-y-1"
      >
        <MenuItems className="absolute right-0 top-full mt-2 w-52 bg-surface border border-surface-4 rounded-2xl shadow-card z-50 py-2 focus:outline-none">
          {/* User info header */}
          <div className="px-3 py-2.5 border-b border-surface-4 mb-1">
            <p className="text-xs text-subtle">Signed in as</p>
            <p className="text-sm font-semibold text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
          </div>

          {/* Watchlist */}
          <MenuItem>
            {({ focus }) => (
              <button
                className={`${
                  focus ? "bg-surface-2 text-white" : "text-muted"
                } w-full text-left px-3 py-2 text-sm flex items-center gap-3 rounded-xl mx-auto transition-colors duration-150 cursor-pointer`}
                style={{ width: "calc(100% - 8px)", marginLeft: "4px" }}
                onClick={() => router.push("/watchlist")}
              >
                <RiBookmarkLine size={15} />
                Watchlist
              </button>
            )}
          </MenuItem>

          {/* Logout */}
          <LogoutBtn />
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserAvatar;
