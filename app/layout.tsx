import "@/styles/globals.css";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { roboto } from "@/config/fonts";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import NavbarWrapper from "@/shared/NavbarWrapper";
import { Suspense } from "react";

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
            <Suspense fallback={<div>Loading...</div>}>
              <NavbarWrapper />
            </Suspense>
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
