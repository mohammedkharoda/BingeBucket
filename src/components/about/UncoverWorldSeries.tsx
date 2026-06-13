import React from "react";

const UncoverWorldSeries = () => {
  return (
    <div className="p-10 text-left">
      <div className="flex items-center flex-col lg:flex-row">
        <div className="mb-8 w-full">
          <span className="eyebrow mb-2">Discover</span>
          <h1 className="text-text text-[48px] font-bold leading-tight md:text-left text-center">
            Uncover the World of Movies and Series
          </h1>
        </div>
        <div className="md:p-6 p-3 rounded-lg text-text-2 mx-auto lg:w-1/2 w-full mb-12 text-center md:text-left">
          <p className="text-[18px] font-normal leading-relaxed">
            CHECK OUT OUR AWESOME COLLECTION OF MOVIES AND SERIES, ENJOYED BY
            MILLIONS OF USERS! TAKE A LOOK AT OUR CAREFULLY CHOSEN SELECTION AND
            DISCOVER YOUR NEW FAVORITE SHOW.
          </p>
        </div>
      </div>
      <div className="flex justify-around text-left max-w-4xl mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
        <div className="px-4 border-l-4 border-accent">
          <h2 className="text-[48px] font-bold text-gradient">75%</h2>
          <p className="text-[18px] font-normal text-text-2">Movies Available</p>
        </div>
        <div className="px-4 border-l-4 border-accent">
          <h2 className="text-[48px] font-bold text-gradient">50%</h2>
          <p className="text-[18px] font-normal text-text-2">Series Available</p>
        </div>
        <div className="px-4 border-l-4 border-accent">
          <h2 className="text-[48px] font-bold text-gradient">90%</h2>
          <p className="text-[18px] font-normal text-text-2">User Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
};

export default UncoverWorldSeries;
