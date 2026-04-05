"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { RiMenu3Line } from "react-icons/ri";

import useUserStore from "@/store/userStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";

import NavDesktop from "./nav/NavDesktop";
import NavMobile from "./nav/NavMobile";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const loadUserWatchlist = useWatchlistStore((state) => state.loadUserWatchlist);
  const checkAuthentication = useWatchlistStore.getState().checkAuthentication;
  const setUser = useUserStore.getState().setUser;
  const clearUser = useUserStore.getState().clearUser;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isSignedIn && user) {
      setUser({
        id: userId!,
        username: user.username || undefined,
        picture: user.imageUrl,
        given_name: user.firstName || undefined,
      });
      loadUserWatchlist();
      checkAuthentication();
    } else if (isSignedIn === false) {
      clearUser();
      checkAuthentication();
    }
  }, [isSignedIn, user]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #F0EDE8",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/* Desktop navbar — hidden on mobile to avoid double logo */}
          <div className="hidden lg:block">
            <NavDesktop
              isSignedIn={isSignedIn}
              searchOpen={searchOpen}
              onSearchToggle={() => setSearchOpen((prev) => !prev)}
            />
          </div>

          {/* Mobile top bar (logo + hamburger) */}
          <div className="flex lg:hidden items-center justify-between py-3">
            <a className="flex-shrink-0" href="/">
              <span className="font-display font-black text-xl tracking-tight" style={{ color: "#1A1A1A" }}>
                Binge<span style={{ color: "#E8756A" }}>Bucket</span>
              </span>
            </a>
            <button
              aria-label="Open menu"
              className="p-2 rounded-full transition-all duration-200 cursor-pointer"
              style={{ color: "#6B7280" }}
              onClick={() => setIsOpen(true)}
            >
              <RiMenu3Line size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — rendered outside <header> so it can be fixed full-screen */}
      <NavMobile
        isOpen={isOpen}
        isSignedIn={isSignedIn}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
