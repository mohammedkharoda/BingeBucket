"use client";
import SeriesDetailsCard from "@/components/SeriesDetailsCard";
import { useParams } from "next/navigation";

const SeriesDetails = () => {
  const { id } = useParams();
  return (
    <>
      <SeriesDetailsCard id={id} />
    </>
  );
};

export default SeriesDetails;
