'use client';

import { SignUp } from '@clerk/nextjs';
import CinemaBackground from '@/components/CinemaBackground';

export default function SignUpPage() {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 overflow-hidden bg-[#0a0618]">
      <CinemaBackground />
      <div className="relative z-10">
        <SignUp routing="hash" />
      </div>
    </div>
  );
}
