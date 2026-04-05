import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import { Metadata } from "next";


import { siteConfig } from "@/config/site";
import { poppins, inter, signika, assistant, robotoSlab } from "@/config/fonts";
import Footer from "@/components/Footer";
import NavbarWrapper from "@/shared/NavbarWrapper";

import { Providers } from "./providers";


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
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <head />
        <body
          suppressHydrationWarning
          className={clsx(
            "min-h-dvh bg-background font-inter antialiased",
            poppins.variable,
            inter.variable,
            signika.variable,
            assistant.variable,
            robotoSlab.variable
          )}
        >
          <Providers
            themeProps={{
              attribute: "class",
              defaultTheme: "light",
            }}
          >
              <div className="relative flex flex-col min-h-dvh">
                <NavbarWrapper />
                <main className="flex-grow bg-background">{children}</main>
                <Footer />
              </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
