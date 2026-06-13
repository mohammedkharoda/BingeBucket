"use client";
import { useParams } from "next/navigation";
import React from "react";

import SeasonDetailCard from "@/components/series/SeasonDetailCard";
import LoadingWrapper from "@/components/common/LoadingWrapper";

const SeasonDetails = () => {
  const { id, seasonId } = useParams() as { id: string; seasonId: string };

  return (
    <LoadingWrapper>
      <main className="relative">
        <SeasonDetailCard id={id} seasonId={seasonId} />
      </main>
    </LoadingWrapper>
  );
};

export default SeasonDetails;
