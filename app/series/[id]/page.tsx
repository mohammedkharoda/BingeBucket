"use client";
import SeriesDetailsCard from "@/components/SeriesDetailsCard";
import TopBillingSeriesCast from "@/components/TopBillingSeriesCast";
import VideosShowCase from "@/components/VideosShowCase";
import { useParams } from "next/navigation";

const SeriesDetails = () => {
  const { id } = useParams();
  return (
    <>
      <SeriesDetailsCard id={id} />
      <TopBillingSeriesCast id={id} />
      <VideosShowCase id={id} />
    </>
  );
};

export default SeriesDetails;
