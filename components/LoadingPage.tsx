"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #f9f4ec 0%, #f8f2e8 52%, #f9f6f1 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-12 w-12 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: "#F5C842",
            borderRightColor: "rgba(245, 200, 66, 0.35)",
            borderBottomColor: "rgba(245, 200, 66, 0.2)",
            borderLeftColor: "rgba(245, 200, 66, 0.65)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <p className="text-sm font-semibold tracking-[0.14em] uppercase text-muted">
          Loading
        </p>
      </div>
    </div>
  );
}
