import EmailForm from "@/shared/EmailForm";
import React from "react";

const EmailSubscriptionBanner = () => {
  return (
    <div className="flex items-center justify-between flex-col lg:flex-row lg:py-[112px] lg:px-[64px] py-[64px] px-[20px]">
      <div>
        <h1 className="text-white text-[48px] font-bold text-center lg:text-left">
          Discover the best movies online
        </h1>
      </div>
      <div className="flex flex-col gap-[24px]">
        <p className="text-white mt-2 text-wrap w-full text-[18px] font-medium text-center">
          Unlock a world of movies and series with our exclusive membership.
          Sign up now to explore more!
        </p>
        <div>
          <EmailForm />
        </div>
        <p className="text-[12px] text-white font-normal text-center">
          By clicking Sign Up, you agree to our Terms and Conditions*.
        </p>
      </div>
    </div>
  );
};

export default EmailSubscriptionBanner;
