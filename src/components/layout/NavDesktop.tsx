"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { RiSearchLine } from "react-icons/ri";

import BingeLogo from "@/components/layout/BingeLogo";
import SearchInput from "@/components/search/SearchInput";
import ThemeSwitch from "@/components/layout/ThemeSwitch";
import LogInBtn from "@/components/common/LogInBtn";
import SignUpBtn from "@/components/common/SignUpBtn";
import UserAvatar from "@/components/common/UserAvatar";
import { siteConfig } from "@/config/site";

interface NavDesktopProps {
  isSignedIn: boolean | null | undefined;
  searchOpen: boolean;
  onSearchToggle: () => void;
}

export default function NavDesktop({
  isSignedIn,
  searchOpen,
  onSearchToggle,
}: NavDesktopProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between gap-6 py-3">
      {/* Logo */}
      <Link className="flex-shrink-0" href="/">
        <BingeLogo />
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {siteConfig.navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                isActive
                  ? "font-semibold text-accent"
                  : "font-medium text-text-2 hover:text-text"
              }`}
              href={item.href}
            >
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-accent/10 ring-1 ring-inset ring-accent/25"
                  layoutId="nav-active-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right side: search + theme + auth */}
      <div className="flex items-center gap-2">
        {/* Inline search toggle */}
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {searchOpen && (
              <motion.div
                key="search-box"
                animate={{ opacity: 1, width: 220 }}
                className="overflow-hidden"
                exit={{ opacity: 0, width: 0 }}
                initial={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <SearchInput />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            aria-label="Toggle search"
            className="rounded-full p-2 text-text-3 transition-colors duration-200 hover:bg-surface-2 hover:text-text"
            onClick={onSearchToggle}
          >
            <RiSearchLine size={18} />
          </button>
        </div>

        <div className="h-5 w-px bg-border" />

        <ThemeSwitch />

        {isSignedIn ? (
          <UserAvatar />
        ) : (
          <div className="flex items-center gap-2 ml-1">
            <LogInBtn />
            <SignUpBtn />
          </div>
        )}
      </div>
    </div>
  );
}
