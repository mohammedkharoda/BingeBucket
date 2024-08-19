"use client";
import { siteConfig } from "@/config/site";
import BingeLogo from "@/icons/BingeLogo";
import LogInBtn from "@/shared/LogInBtn";
import SignUpBtn from "@/shared/SignUpBtn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
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
                href={item.href}
                className={`relative ${
                  (item.href === "/" && pathname === item.href) ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-yellow hover:text-yellow"
                    : "text-white"
                } hover:text-orange-yellow`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                <motion.div
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-red-600"
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      (item.href === "/" && pathname === item.href) ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                        ? "100%"
                        : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* buttons */}
          <div className="hidden lg:flex space-x-4 items-center">
            <SignUpBtn />
            <LogInBtn />
          </div>
          {/* ====================== MOBILE AREA ================================= */}
          {/* hamburger menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {siteConfig.navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className={`relative ${
                    pathname === item.href
                      ? "text-yellow hover:text-yellow"
                      : "text-white"
                  } hover:text-orange-yellow block`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-red-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: pathname === item.href ? "100%" : "0%",
                    }}
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
