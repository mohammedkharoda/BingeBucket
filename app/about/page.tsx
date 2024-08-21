import React from "react";
import AboutLayout from "./layout";
import DiscoverAboutUs from "@/components/about-us/DiscoverAboutUs";
import DiscoverBestMovie from "@/components/about-us/DiscoverBestMovie";
import UncoverWorldSeries from "@/components/about-us/UncoverWorldSeries";

const About = () => {
  return (
    <div className="lg:my-[80px] lg:mx-[64px] my-[64px] mx-[20px]">
      <DiscoverAboutUs />
      <DiscoverBestMovie />
      <UncoverWorldSeries />
    </div>
  );
};

export default About;
