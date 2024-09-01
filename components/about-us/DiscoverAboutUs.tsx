import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";

const DiscoverAboutUs = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-between items-center p-10">
      <div className="mb-8 w-full">
        <h2 className="text-white text-lg font-semibold md:text-left text-center">
          Discover
        </h2>
        <h1 className="text-white text-[48px] font-bold leading-tight md:text-left text-center">
          Unleash the Magic
        </h1>
      </div>
      <div className="lg:w-1/2 w-full mt-6 lg:mt-0 flex flex-col items-center md:items-start">
        <div className="text-[18px] md:text-left text-center font-normal leading-[150%] text-white bg-yellow-600 py-6 ">
          Welcome to our website, where you can explore a world of captivating
          movies and series. Our mission is to provide you with a refined and
          enhanced experience, just like IMDB but better. With a vast collection
          of films and shows, we aim to bring you the best entertainment
          available.
        </div>
        <Button
          className="mt-4 bg-brown-dark border-none text-white font-bold hover:bg-orange-yellow hover:text-black p-6"
          variant="flat"
        >
          <Link href="/">BINGE NOW</Link>
        </Button>
      </div>
    </div>
  );
};

export default DiscoverAboutUs;
