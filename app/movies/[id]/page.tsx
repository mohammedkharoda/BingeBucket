"use client";
import ImageShowcase from "@/components/ImageShowCase";
import MovieDetailCard from "@/components/MovieDetailCard";
import RecommandedMovies from "@/components/RecommandedMovies";
import TopBillingCast from "@/components/TopBillingCast";
import { useParams } from "next/navigation";

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
