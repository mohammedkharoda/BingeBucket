"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import EmailForm from "@/shared/EmailForm";
import { RiMailSendLine } from "react-icons/ri";

/* ── Inline SVG doodles ─────────────────────────────── */
const DoodleStar = ({ size = 24, color = "currentColor", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 2 L13.2 9.2 L20 8 L14.8 13 L17.6 20 L12 16.2 L6.4 20 L9.2 13 L4 8 L10.8 9.2 Z"
      stroke={color} strokeWidth="1.4" strokeLinejoin="round" fill="none"
    />
  </svg>
);

const DoodleCircle = ({ size = 40, color = "currentColor", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
    <path
      d="M20 4 C28 3 36 10 37 19 C38 29 31 37 21 37 C11 38 3 30 3 20 C2 10 10 3 20 4"
      stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
    />
  </svg>
);

const DoodleWave = ({ style = {} }: { style?: React.CSSProperties }) => (
  <svg width="80" height="20" viewBox="0 0 80 20" fill="none" style={style}>
    <path
      d="M2 10 C8 4 14 16 20 10 C26 4 32 16 38 10 C44 4 50 16 56 10 C62 4 68 16 74 10 L78 10"
      stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"
    />
  </svg>
);

/* ── Component ──────────────────────────────────────── */
const EmailSubscriptionBanner = () => {
  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-y border-surface-4 px-6 py-14 lg:px-16 lg:py-16"
      style={{
        background:
          "radial-gradient(circle at 15% 14%, rgba(245,200,66,0.2) 0%, rgba(245,200,66,0) 40%), radial-gradient(circle at 80% 20%, rgba(107,181,214,0.16) 0%, rgba(107,181,214,0) 42%), linear-gradient(180deg, #fbf8f2 0%, #f7efe2 100%)",
      }}
    >
      {/* ── Background noise texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "120px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute rounded-full blur-[110px]"
        style={{
          width: "560px",
          height: "340px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(245,200,66,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Popcorn accents */}
      <div className="pointer-events-none absolute left-8 top-6 hidden lg:block opacity-70">
        <Image src="/popcron-tub.png" alt="" width={138} height={138} className="rotate-[-12deg]" />
      </div>
      <div className="pointer-events-none absolute bottom-6 right-10 hidden lg:block opacity-65">
        <Image src="/popcron-tub.png" alt="" width={122} height={122} className="rotate-[14deg]" />
      </div>

      {/* ── Main content — centered poster-board layout ── */}
      <div className="relative z-10 mx-auto max-w-[920px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: "rgba(245,200,66,0.14)",
            border: "1.5px solid rgba(245,200,66,0.45)",
            boxShadow: "0 0 28px rgba(245,200,66,0.2)",
          }}
        >
          <RiMailSendLine size={20} style={{ color: "var(--color-gold)" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[1.6rem] border px-6 py-6 text-center sm:px-10 sm:py-7"
          style={{
            borderColor: "rgba(245,200,66,0.35)",
            background: "rgba(255,255,255,0.78)",
            boxShadow: "0 22px 45px rgba(40,28,8,0.13)",
          }}
        >
          <div className="mx-auto inline-flex w-fit items-center justify-center gap-1.5 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(245,200,66,0.16)",
              border: "1px solid rgba(245,200,66,0.35)",
            }}
          >
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(90,72,24,0.6)" }}>
              Weekly Newsletter
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(30px, 4.2vw, 48px)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-white)",
              marginTop: "10px",
            }}
          >
            Your Watchlist,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F0CB5A 50%, #B8942E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Curated Weekly
            </span>
          </h2>

          <p style={{ fontSize: "14px", color: "var(--color-muted)", lineHeight: 1.65, maxWidth: "540px", margin: "8px auto 0" }}>
            Fresh picks, new releases, and hidden gems delivered straight to your inbox every Friday morning.
          </p>

          <div className="mx-auto mt-6 w-full max-w-[640px] rounded-2xl border p-4 sm:p-5"
            style={{
              borderColor: "rgba(245,200,66,0.32)",
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 14px 34px rgba(32,24,8,0.14)",
            }}
          >
            <EmailForm />

            <div
              className="mt-4 rounded-xl border px-3 py-2.5"
              style={{
                borderColor: "rgba(245,200,66,0.24)",
                background: "rgba(255,255,255,0.76)",
              }}
            >
              <div className="text-left">
                <p style={{ fontSize: "11px", color: "var(--color-muted)", lineHeight: 1.4 }}>
                  "Actually useful picks every week."
                </p>
                <p style={{ fontSize: "10px", color: "var(--color-subtle)", marginTop: 2 }}>
                  Join <span style={{ color: "var(--color-gold)", fontWeight: 700 }}>2,000+</span> movie lovers · Unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 flex items-center justify-center gap-3" style={{ color: "rgba(107,114,128,0.7)" }}>
          <DoodleWave style={{ width: "64px", height: "12px" }} />
          <p style={{ fontSize: "12px", letterSpacing: "0.3px" }}>
            Delivered every Friday morning
          </p>
          <DoodleCircle size={18} color="rgba(245,200,66,0.55)" />
        </div>
      </div>
    </section>
  );
};

export default EmailSubscriptionBanner;
