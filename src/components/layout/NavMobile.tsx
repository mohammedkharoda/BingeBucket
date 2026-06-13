"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiHome5Line,
  RiFilmLine,
  RiTv2Line,
  RiShuffleLine,
  RiInformationLine,
  RiMailLine,
  RiCloseLine,
} from "react-icons/ri";

import BingeLogo from "@/components/layout/BingeLogo";
import SearchInput from "@/components/search/SearchInput";
import ThemeSwitch from "@/components/layout/ThemeSwitch";
import LogInBtn from "@/components/common/LogInBtn";
import SignUpBtn from "@/components/common/SignUpBtn";
import UserAvatar from "@/components/common/UserAvatar";
import { siteConfig } from "@/config/site";

const NAV_ICONS = [
  RiHome5Line,
  RiFilmLine,
  RiTv2Line,
  RiShuffleLine,
  RiInformationLine,
  RiMailLine,
];

interface NavMobileProps {
  isOpen: boolean;
  onClose: () => void;
  isSignedIn: boolean | null | undefined;
}

export default function NavMobile({ isOpen, onClose, isSignedIn }: NavMobileProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="mobile-drawer"
            animate={{ x: 0 }}
            className="fixed top-0 right-0 z-50 h-full w-[300px] bg-surface border-l border-border flex flex-col lg:hidden"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <BingeLogo />
              <button
                aria-label="Close menu"
                className="rounded-full p-2 text-text-2 transition-colors duration-200 hover:bg-surface-2 hover:text-text"
                onClick={onClose}
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {siteConfig.navItems.map((item, i) => {
                const Icon = NAV_ICONS[i];
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-accent bg-accent/10 border border-accent/20"
                        : "text-text-2 hover:text-text hover:bg-surface-2"
                    }`}
                    href={item.href}
                    onClick={onClose}
                  >
                    <Icon className={isActive ? "text-accent" : "text-text-3"} size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search */}
            <div className="px-4 pb-3 border-t border-border pt-4">
              <SearchInput />
            </div>

            {/* Footer: theme + auth */}
            <div className="px-4 py-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-text-3">
                  Theme
                </span>
                <ThemeSwitch />
              </div>

              {isSignedIn ? (
                <div className="px-1">
                  <UserAvatar />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <LogInBtn />
                  <SignUpBtn />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
