import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { poppins, inter } from "@/config/fonts";
import Footer from "@/components/layout/Footer";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

import { Providers } from "./providers";

// This app is personalized (Clerk auth in the nav) and entirely TMDB-backed at
// request time, so there is nothing meaningful to statically prerender. Forcing
// dynamic rendering also lets `next build` succeed without secrets present.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
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
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <head />
        <body
          suppressHydrationWarning
          className={clsx(
            "min-h-dvh bg-bg text-text-2 font-inter antialiased",
            poppins.variable,
            inter.variable
          )}
        >
          <Providers
            themeProps={{
              attribute: "class",
              defaultTheme: "dark",
              enableSystem: false,
            }}
          >
            <div className="relative flex min-h-dvh flex-col">
              <NavbarWrapper />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
