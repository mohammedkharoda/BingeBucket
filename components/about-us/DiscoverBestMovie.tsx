import BingeLogo from "@/icons/BingeLogo";

const DiscoverBestMovie = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-between items-center p-10 gap-5 md:gap-0">
      <div className="lg:w-1/2 w-full md:text-left text-center flex flex-col gap-4">
        <h1 className="text-[40px] font-bold leading-[120%] text-white capitalize">
          The Best Movies and Series on our Refined and Enhanced Platform
        </h1>
        <p className="text-[18px] font-normal leading-[150%] text-white">
          Welcome to our website, where you can explore a vast collection of
          movies and series. Our mission is to provide you with a refined and
          enchanced experience.
        </p>
      </div>
      <div className="lg:w-1/2 w-full mt-6 lg:mt-0 flex flex-col md:items-end items-center">
        <BingeLogo width={600} height={800} />
      </div>
    </div>
  );
};

export default DiscoverBestMovie;
