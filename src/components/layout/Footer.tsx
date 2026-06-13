import React from "react";
import Link from "next/link";
import { RiTwitterXLine, RiInstagramLine, RiThreadsLine, RiHeartFill } from "react-icons/ri";

import { siteConfig } from "@/config/site";
import BingeLogo from "@/components/layout/BingeLogo";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-site mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <BingeLogo />
            <p className="text-text-3 text-sm leading-relaxed max-w-xs">
              Your ultimate destination for movies &amp; series discovery. Find
              your next binge-worthy obsession.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                aria-label="X (Twitter)"
                className="p-2 rounded-full text-text-3 hover:text-accent hover:bg-accent/10 border border-border hover:border-accent/30 transition-all duration-200"
                href="https://x.com/MOHAMMEDKHAROD"
                rel="noopener noreferrer"
                target="_blank"
              >
                <RiTwitterXLine size={15} />
              </a>
              <a
                aria-label="Threads"
                className="p-2 rounded-full text-text-3 hover:text-accent hover:bg-accent/10 border border-border hover:border-accent/30 transition-all duration-200"
                href="https://www.threads.com/@_._mohammed__"
                rel="noopener noreferrer"
                target="_blank"
              >
                <RiThreadsLine size={15} />
              </a>
              <a
                aria-label="Instagram"
                className="p-2 rounded-full text-text-3 hover:text-accent hover:bg-accent/10 border border-border hover:border-accent/30 transition-all duration-200"
                href="https://www.instagram.com/_._mohammed__/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <RiInstagramLine size={15} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-text uppercase tracking-widest mb-1">
              Explore
            </h4>
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                className="text-sm text-text-2 hover:text-accent transition-colors duration-200 w-fit"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Newsletter teaser */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-text uppercase tracking-widest mb-1">
              Stay Updated
            </h4>
            <p className="text-text-3 text-sm leading-relaxed">
              Get weekly curated picks delivered to your inbox.
            </p>
            <Link
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 text-sm font-medium rounded-full transition-all duration-200 w-fit"
              href="/#newsletter"
            >
              Subscribe free
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-3 text-xs flex items-center gap-1">
            &copy; {new Date().getFullYear()} BingeBucket. Made with{" "}
            <RiHeartFill className="text-danger" size={11} /> by Mohammed
          </p>
          <p className="text-text-3 text-xs">
            Powered by <span className="text-accent font-medium">TMDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
