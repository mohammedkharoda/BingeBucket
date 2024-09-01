import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { roboto } from "@/config/fonts";
import Footer from "@/components/Footer";
import NavbarWrapper from "@/shared/NavbarWrapper";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          roboto.className
        )}
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            {/* Async Server Component */}
            <NavbarWrapper />
            <main className="container mx-auto max-w-full flex-grow bg-yellow-dark">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
