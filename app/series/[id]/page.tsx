"use client";
import { useParams } from "next/navigation";

import SeriesDetailsCard from "@/components/seriesComponents/SeriesDetailsCard";
import SeriesSeason from "@/components/seriesComponents/SeriesSeason";
import TopBillingSeriesCast from "@/components/seriesComponents/TopBillingSeriesCast";
import VideosShowCase from "@/components/seriesComponents/VideosShowCase";
import LoadingWrapper from "@/components/LoadingWrapper";


const SeriesDetails = () => {
  const { id } = useParams() as { id: string };

  return (
    <LoadingWrapper>
      <main className="relative">
        <SeriesDetailsCard id={id} />
        <TopBillingSeriesCast id={id} />
        <VideosShowCase id={id} />
        <SeriesSeason />
      </main>
    </LoadingWrapper>
  );
};

export default SeriesDetails;
