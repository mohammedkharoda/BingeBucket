import React from "react";
import Link from "next/link";
import { RiMailLine } from "react-icons/ri";

const GetInTouch = () => {
  return (
    <div className="py-16 px-6 text-center flex flex-col items-center justify-center gap-5">
      <div className="p-4 rounded-full bg-accent/10 border border-accent/20">
        <RiMailLine className="text-accent" size={28} />
      </div>
      <div>
        <span className="eyebrow mb-2">Discover</span>
        <h1 className="text-3xl font-extrabold text-text mb-3">Get in Touch</h1>
        <p className="text-text-2 text-base max-w-sm mx-auto">
          We would love to hear from you. Contact us for any inquiries or
          feedback.
        </p>
      </div>
      <Link className="btn-primary" href="/contact-us">
        Contact
      </Link>
    </div>
  );
};

export default GetInTouch;
