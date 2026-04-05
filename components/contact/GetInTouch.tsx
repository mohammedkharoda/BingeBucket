import React from "react";
import Link from "next/link";
import { RiMailLine } from "react-icons/ri";

const GetInTouch = () => {
  return (
    <div className="py-16 px-6 text-center flex flex-col items-center justify-center gap-5">
      <div className="p-4 rounded-full bg-gold/10 border border-gold/20">
        <RiMailLine size={28} className="text-gold" />
      </div>
      <div>
        <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">
          Discover
        </p>
        <h1 className="text-3xl font-extrabold text-white mb-3">Get in Touch</h1>
        <p className="text-muted text-base max-w-sm mx-auto">
          We would love to hear from you. Contact us for any inquiries or
          feedback.
        </p>
      </div>
      <Link
        href="/contact-us"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dim text-white text-sm font-semibold rounded-full shadow-card transition-all duration-200"
      >
        Contact
      </Link>
    </div>
  );
};

export default GetInTouch;
