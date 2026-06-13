"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          className="h-12 w-12 rounded-full border-4 border-border"
          style={{ borderTopColor: "var(--accent)" }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <p className="text-sm font-semibold tracking-[0.14em] uppercase text-text-2">
          Loading
        </p>
      </div>
    </div>
  );
}
