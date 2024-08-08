"use client";
import ImageShowcase from "@/components/ImageShowCase";
import MovieDetailCard from "@/components/MovieDetailCard";
import RecommandedMovies from "@/components/RecommandedMovies";
import TopBillingCast from "@/components/TopBillingCast";
import { useMovieImageShowcase } from "@/hooks/useMovieImageShowcase";
import { useParams } from "next/navigation";

const MoviesDetails = () => {
  const imageUrls = [
    "https://image.tmdb.org/t/p/original/2B12ReNGLhDDVrdsIu1O2PnH6RU.jpg",
    "https://image.tmdb.org/t/p/original/dsGwCEO8tda4FlgHKvL95f0oQbH.jpg",
    "https://image.tmdb.org/t/p/original/jqYL6YQaImXQJrU2RJVlEjW3xxg.jpg",
    "https://image.tmdb.org/t/p/original/jqYL6YQaImXQJrU2RJVlEjW3xxg.jpg",
    "https://image.tmdb.org/t/p/original/jqYL6YQaImXQJrU2RJVlEjW3xxg.jpg",
  ];
  const { id } = useParams();
  const Images = useMovieImageShowcase(Number(id));

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
