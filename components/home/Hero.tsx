"use client";
import { HeroText } from "@/config/data";
import { useUpcomingMovies } from "@/hooks/useUpcomingMovie";
import ContentGrid from "@/shared/ContentGrid";
import GlobalButton from "@/shared/GlobalButton";
import SkeletonGrid from "@/shared/SkeletonGrid";

const Hero = () => {
  const { isFetching } = useUpcomingMovies();

  return (
    <div className="lg:px-[64px] px-[20px] mt-5 lg:mt-0">
      <div className="flex items-center justify-between lg:flex-row gap-8 flex-col">
        {/* flex-1 */}
        <div className="my-[64px] lg:my-0">
          <div className="flex flex-col gap-8">
            {/* text */}
            {HeroText.map((text, index) => (
              <div key={index}>
                <h1 className="text-4xl font-bold text-white">{text.title}</h1>
                <p className="text-white lg:max-w-[425px] w-full">
                  {text.description}
                </p>
              </div>
            ))}
            {HeroText[0].buttons.map((buttonGroup, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row w-full gap-8"
              >
                <GlobalButton
                  className={`text-gray-dark bg-orange-yellow px-[24px] py-[10px] rounded-md cursor-pointer drop-shadow-md hover:text-white hover:bg-brown`}
                >
                  {buttonGroup.primary.text}
                </GlobalButton>
                <GlobalButton
                  className={`border-white  border px-[24px] py-[10px] rounded-md text-white cursor-pointer hover:font-bold drop-shadow-md`}
                >
                  {buttonGroup.secondary.text}
                </GlobalButton>
              </div>
            ))}
          </div>
        </div>
        {/* flex-2 */}
        {isFetching ? (
          <div>
            <SkeletonGrid />
          </div>
        ) : (
          <div className="md:py-4">
            <ContentGrid />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
