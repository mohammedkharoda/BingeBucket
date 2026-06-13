import DiscoverAboutUs from "@/components/about/DiscoverAboutUs";
import DiscoverBestMovie from "@/components/about/DiscoverBestMovie";
import UncoverWorldSeries from "@/components/about/UncoverWorldSeries";

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
