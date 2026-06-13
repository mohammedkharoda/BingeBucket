"use client";
import { useParams } from "next/navigation";

import ImageShowcase from "@/components/movies/ImageShowcase";
import MovieDetailCard from "@/components/movies/MovieDetailCard";
import RecommendedMovies from "@/components/movies/RecommendedMovies";
import TopBillingCast from "@/components/movies/TopBillingCast";

const MoviesDetails = () => {
  const { id } = useParams() as { id: string };

  return (
    <>
      <MovieDetailCard id={id} />
      <TopBillingCast id={id} />
      <ImageShowcase id={id} />
      <RecommendedMovies id={id} />
    </>
  );
};

export default MoviesDetails;
