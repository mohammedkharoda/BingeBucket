import { FooterText } from "@/config/data";
import BingeLogo from "@/icons/BingeLogo";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-brown flex flex-col items-center lg:py-[112px] lg:px-[64px] py-[64px] px-[20px] gap-[20px]">
      <div>
        <BingeLogo />
      </div>
      <div>
        {FooterText.map((text, index) => (
          <div key={index} className="flex gap-[20px]">
            {text.links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white hover:text-orange-yellow"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p className="text-white text-[14px]">
          &copy; {new Date().getFullYear()} BingeBucket. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
