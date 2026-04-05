"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { RiSearchLine } from "react-icons/ri";

import BingeLogo from "@/icons/BingeLogo";
import SearchInput from "@/components/SearchInput";
import ThemeSwitch from "@/components/ThemeSwitch";
import LogInBtn from "@/shared/LogInBtn";
import SignUpBtn from "@/shared/SignUpBtn";
import UserAvatar from "@/shared/UserAvatar";
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
    <div className="flex items-center justify-between py-2 gap-6">
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
              className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
              href={item.href}
              style={{
                color: isActive ? "#E8756A" : "#374151",
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  layoutId="nav-active-pill"
                  style={{ background: "rgba(232,117,106,0.10)", border: "1px solid rgba(232,117,106,0.25)" }}
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
            className="p-2 rounded-full transition-all duration-200 cursor-pointer"
            style={{ color: "#6B7280" }}
            onClick={onSearchToggle}
          >
            <RiSearchLine size={18} />
          </button>
        </div>

        <div className="w-px h-5" style={{ background: "#E5E7EB" }} />

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
