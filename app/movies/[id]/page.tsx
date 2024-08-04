"use client";
import MovieDetailCard from "@/components/MovieDetailCard";
import { useParams } from "next/navigation";

const MoviesDetails = () => {
  const { id } = useParams();
  return (
    <div className="lg:px-[64px] lg:py-[112px] px-[20px] py-[64px]">
      <MovieDetailCard id={id} />
    </div>
  );
};

export default MoviesDetails;
