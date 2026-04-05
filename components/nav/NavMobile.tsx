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

import SearchInput from "@/components/SearchInput";
import ThemeSwitch from "@/components/ThemeSwitch";
import LogInBtn from "@/shared/LogInBtn";
import SignUpBtn from "@/shared/SignUpBtn";
import UserAvatar from "@/shared/UserAvatar";
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-[300px] bg-surface border-l border-surface-4 flex flex-col lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-surface-4">
              <span className="font-display font-bold text-white text-lg">Menu</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-full text-muted hover:text-white hover:bg-surface-2 transition-all duration-200 cursor-pointer"
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
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-accent bg-accent/10 border border-accent/20"
                        : "text-muted hover:text-white hover:bg-surface-2"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-accent" : "text-subtle"} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search */}
            <div className="px-4 pb-3 border-t border-surface-4 pt-4">
              <SearchInput />
            </div>

            {/* Footer: theme + auth */}
            <div className="px-4 py-4 border-t border-surface-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-subtle">
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
