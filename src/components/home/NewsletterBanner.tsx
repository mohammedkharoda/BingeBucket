"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { RiMailSendLine } from "react-icons/ri";

import EmailForm from "@/components/common/EmailForm";

const NewsletterBanner = () => {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-bg-2 py-16 lg:py-20"
      id="newsletter"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

      {/* Popcorn motif accents */}
      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-6 bottom-2 hidden w-28 -rotate-12 opacity-70 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] lg:block xl:w-36"
        height={150}
        loading="lazy"
        src="/popcron-tub.png"
        width={150}
      />
      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-6 top-4 hidden w-24 rotate-12 opacity-60 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] lg:block xl:w-32"
        height={130}
        loading="lazy"
        src="/popcron-tub.png"
        width={130}
      />

      <div className="container-site relative z-10 max-w-[820px]">
        <motion.div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 shadow-glow-accent"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <RiMailSendLine className="text-accent" size={20} />
        </motion.div>

        <motion.div
          className="card px-6 py-8 text-center sm:px-10"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="pill-accent mx-auto text-[10px] font-bold uppercase tracking-[2px]">
            Weekly newsletter
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-text sm:text-4xl">
            Your watchlist,
            <br />
            <span className="text-gradient">curated weekly</span>
          </h2>

          <p className="mx-auto mt-3 max-w-[540px] text-sm leading-relaxed text-text-2">
            Fresh picks, new releases, and hidden gems delivered straight to your
            inbox every Friday morning.
          </p>

          <div className="mx-auto mt-6 w-full max-w-[640px] rounded-2xl border border-border bg-surface-2 p-4 sm:p-5">
            <EmailForm />

            <div className="mt-4 rounded-xl border border-border bg-surface px-3 py-2.5 text-left">
              <p className="text-[11px] leading-snug text-text-2">
                &ldquo;Actually useful picks every week.&rdquo;
              </p>
              <p className="mt-0.5 text-[10px] text-text-3">
                Join <span className="font-bold text-accent">2,000+</span> movie
                lovers · Unsubscribe anytime
              </p>
            </div>
          </div>
        </motion.div>

        <p className="mt-4 text-center text-xs text-text-3">
          Delivered every Friday morning
        </p>
      </div>
    </section>
  );
};

export default NewsletterBanner;
