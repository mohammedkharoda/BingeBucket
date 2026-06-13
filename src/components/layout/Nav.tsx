"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { RiMenu3Line } from "react-icons/ri";

import useUserStore from "@/store/userStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";

import BingeLogo from "./BingeLogo";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

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
        className={`glass-nav sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-card" : ""
        }`}
      >
        <div className="container-site">
          {/* Desktop navbar — hidden on mobile to avoid double logo */}
          <div className="hidden lg:block">
            <NavDesktop
              isSignedIn={isSignedIn}
              searchOpen={searchOpen}
              onSearchToggle={() => setSearchOpen((prev) => !prev)}
            />
          </div>

          {/* Mobile top bar (logo + hamburger) */}
          <div className="flex items-center justify-between py-3 lg:hidden">
            <a className="flex-shrink-0" href="/">
              <BingeLogo />
            </a>
            <button
              aria-label="Open menu"
              className="rounded-full p-2 text-text-2 transition-colors duration-200 hover:bg-surface-2 hover:text-text"
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
