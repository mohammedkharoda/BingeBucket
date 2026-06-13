"use client";
import { useClerk } from "@clerk/nextjs";
import { MenuItem } from "@headlessui/react";
import { RiLogoutCircleRLine } from "react-icons/ri";

const LogoutBtn = () => {
  const { signOut } = useClerk();

  return (
    <MenuItem>
      {({ focus }) => (
        <button
          className={`${
            focus ? "bg-danger/10 text-danger" : "text-text-2"
          } w-full text-left px-3 py-2 text-sm flex items-center gap-3 rounded-lg transition-colors duration-150 cursor-pointer`}
          onClick={() => signOut({ redirectUrl: "/" })}
        >
          <RiLogoutCircleRLine size={15} />
          Sign Out
        </button>
      )}
    </MenuItem>
  );
};

export default LogoutBtn;
