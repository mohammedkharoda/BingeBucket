"use client";
import MovieDetailCard from "@/components/MovieDetailCard";
import TopBillingCast from "@/components/TopBillingCast";
import { useParams } from "next/navigation";

const MoviesDetails = () => {
  const { id } = useParams();
  return (
    <div className="">
      <MovieDetailCard id={id} />
      <TopBillingCast id={id} />
    </div>
  );
};

export default MoviesDetails;
