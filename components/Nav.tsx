"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import SearchInput from "./SearchInput";

import SignUpBtn from "@/shared/SignUpBtn";
import LogInBtn from "@/shared/LogInBtn";
import BingeLogo from "@/icons/BingeLogo";
import { siteConfig } from "@/config/site";
import useUserStore from "@/store/userStore";
import UserAvatar from "@/shared/UserAvatar";
import { useWatchlistStore } from "@/store/useWatchlistStore";

export default function Navbar({
  isUserAuthenticated,
  user,
}: {
  isUserAuthenticated: boolean;
  user: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const loadUserWatchlist = useWatchlistStore(
    (state) => state.loadUserWatchlist
  );
  const checkAuthentication = useWatchlistStore.getState().checkAuthentication;
  const setUser = useUserStore.getState().setUser;

  useEffect(() => {
    // Only update state when the user authentication status actually changes
    if (isUserAuthenticated) {
      setUser(user);
      loadUserWatchlist();
      checkAuthentication();
    } else {
      // Optional: handle the state when not authenticated if needed
      checkAuthentication();
    }
  }, [isUserAuthenticated]);

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <nav className="bg-gray-dark shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around h-16 items-center">
          {/* logo */}
          <div className="flex items-center">
            <Link href="/">
              <BingeLogo />
            </Link>
          </div>
          {/* services */}
          <div className="hidden lg:flex space-x-8 items-center justify-center">
            {siteConfig.navItems.map((item, index) => (
              <motion.a
                key={index}
                className={`relative ${
                  (item.href === "/" && pathname === item.href) ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-yellow hover:text-yellow"
                    : "text-white"
                } hover:text-orange-yellow`}
                href={item.href}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                <motion.div
                  animate={{
                    width:
                      (item.href === "/" && pathname === item.href) ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                        ? "100%"
                        : "0%",
                  }}
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-red-600"
                  initial={{ width: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
          <SearchInput />

          {/* buttons */}
          <div className="hidden lg:flex space-x-4 items-center">
            {isUserAuthenticated ? (
              <UserAvatar />
            ) : (
              <>
                <SignUpBtn />
                <LogInBtn />
              </>
            )}
          </div>

          {/* ====================== MOBILE AREA ================================= */}
          {/* hamburger menu button */}
          <div className="flex items-center lg:hidden">
            <button
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
              type="button"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate="open"
            className="lg:hidden overflow-hidden"
            exit="closed"
            initial="closed"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {siteConfig.navItems.map((item, index) => (
                <motion.a
                  key={index}
                  className={`relative ${
                    pathname === item.href
                      ? "text-yellow hover:text-yellow"
                      : "text-white"
                  } hover:text-orange-yellow block`}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  <motion.div
                    animate={{
                      width: pathname === item.href ? "100%" : "0%",
                    }}
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-red-600"
                    initial={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              <div className="flex flex-col gap-5 w-full justify-center items-center">
                <SignUpBtn />
                <LogInBtn />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
