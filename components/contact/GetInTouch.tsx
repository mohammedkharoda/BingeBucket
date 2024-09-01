import { Button } from "@nextui-org/button";
import React from "react";

const GetInTouch = () => {
  return (
    <div className="p-10 text-center flex flex-col items-center justify-center h-[300px]">
      <div className="mb-4">
        <h2 className="text-white text-lg font-semibold">Discover</h2>
        <h1 className="text-white text-[36px] font-bold">Get in Touch</h1>
      </div>
      <p className="text-white text-[18px] mb-6">
        We&apos;d love to hear from you. Contact us for any inquiries or
        feedback.
      </p>
      <Button className="bg-orange-yellow text-black font-semibold px-[24px] py-[12px] rounded hover:bg-brown-dark hover:text-white text-[16px] ">
        Contact
      </Button>
    </div>
  );
};

export default GetInTouch;
