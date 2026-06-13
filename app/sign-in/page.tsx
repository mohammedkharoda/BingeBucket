"use client";

import { SignIn } from "@clerk/nextjs";

import CinemaBackground from "@/components/common/CinemaBackground";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-bg px-4 py-12">
      <CinemaBackground />
      <div className="relative z-10">
        <SignIn routing="hash" />
      </div>
    </div>
  );
}
