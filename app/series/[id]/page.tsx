"use client";
import { useParams } from "next/navigation";

import SeriesDetailsCard from "@/components/series/SeriesDetailsCard";
import SeriesSeason from "@/components/series/SeriesSeason";
import TopBillingSeriesCast from "@/components/series/TopBillingSeriesCast";
import VideosShowCase from "@/components/series/VideosShowCase";
import LoadingWrapper from "@/components/common/LoadingWrapper";


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
