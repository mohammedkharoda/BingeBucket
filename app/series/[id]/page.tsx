"use client";
import SeriesDetailsCard from "@/components/seriesComponents/SeriesDetailsCard";
import SeriesSeason from "@/components/seriesComponents/SeriesSeason";
import TopBillingSeriesCast from "@/components/seriesComponents/TopBillingSeriesCast";
import VideosShowCase from "@/components/seriesComponents/VideosShowCase";
import { useParams } from "next/navigation";

const SeriesDetails = () => {
  const { id } = useParams();
  return (
    <>
      <SeriesDetailsCard id={id} />
      <TopBillingSeriesCast id={id} />
      <VideosShowCase id={id} />
      <SeriesSeason />
    </>
  );
};

export default SeriesDetails;
