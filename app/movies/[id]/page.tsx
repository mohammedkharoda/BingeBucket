"use client";
import ImageShowcase from "@/components/ImageShowCase";
import MovieDetailCard from "@/components/MovieDetailCard";
import TopBillingCast from "@/components/TopBillingCast";
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
  return (
    <div className="">
      <MovieDetailCard id={id} />
      <TopBillingCast id={id} />
      <ImageShowcase images={imageUrls} />
    </div>
  );
};

export default MoviesDetails;
