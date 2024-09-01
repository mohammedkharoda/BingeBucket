"use client";
import { useParams } from "next/navigation";

import ImageShowcase from "@/components/movieComponents/ImageShowCase";
import MovieDetailCard from "@/components/movieComponents/MovieDetailCard";
import RecommandedMovies from "@/components/movieComponents/RecommandedMovies";
import TopBillingCast from "@/components/movieComponents/TopBillingCast";

const MoviesDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <MovieDetailCard id={id} />
      <TopBillingCast id={id} />
      <ImageShowcase id={id} />
      <RecommandedMovies id={id} />
    </div>
  );
};

export default MoviesDetails;
