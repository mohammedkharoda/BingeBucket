import React from "react";

const UncoverWorldSeries = () => {
  return (
    <div className="p-10 text-left">
      <div className="flex items-center flex-col lg:flex-row">
        <div className="mb-8 w-full">
          <h2 className="text-white text-lg font-semibold md:text-left text-center">
            Discover
          </h2>
          <h1 className="text-white text-[48px] font-bold leading-tight md:text-left text-center">
            Uncover the World of Movies and Series
          </h1>
        </div>
        <div className="md:p-6 p-3 rounded-lg text-white mx-auto lg:w-1/2 w-full mb-12 text-center md:text-left">
          <p className="text-[18px] font-normal leading-relaxed">
            CHECK OUT OUR AWESOME COLLECTION OF MOVIES AND SERIES, ENJOYED BY
            MILLIONS OF USERS! TAKE A LOOK AT OUR CAREFULLY CHOSEN SELECTION AND
            DISCOVER YOUR NEW FAVORITE SHOW.
          </p>
        </div>
      </div>
      <div className="flex justify-around text-left max-w-4xl mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
        <div className="px-4 border-l-4 ">
          <h2 className="text-[48px] font-bold">75%</h2>
          <p className="text-[18px] font-normal">Movies Available</p>
        </div>
        <div className="px-4 border-l-4 ">
          <h2 className="text-[48px] font-bold">50%</h2>
          <p className="text-[18px] font-normal">Series Available</p>
        </div>
        <div className="px-4 border-l-4 ">
          <h2 className="text-[48px] font-bold">90%</h2>
          <p className="text-[18px] font-normal">User Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
};

export default UncoverWorldSeries;
