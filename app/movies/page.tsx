"use client";
import { Suspense } from "react";

import MovieShowcase from "@/components/movieComponents/MovieShowcase";
import TrendingMoviesBanner from "@/components/movieComponents/TrendingMoviesBanner";
import SortedMovieComponent from "@/components/movieComponents/SortedMovies";
export default function Movies() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="lg:px-[64px] lg:py-[112px] px-[20px] py-[64px]">
        <MovieShowcase />
        <TrendingMoviesBanner />
        <SortedMovieComponent />
      </div>
    </Suspense>
  );
}
