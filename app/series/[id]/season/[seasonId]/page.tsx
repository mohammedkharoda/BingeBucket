"use client";
import SeasonDetailCard from "@/components/SeasonDetailCard";
import { useParams } from "next/navigation";
import React from "react";

const SeasonDetails = () => {
  const { id, seasonId } = useParams();
  return (
    <>
      <SeasonDetailCard id={id} seasonId={seasonId} />
    </>
  );
};

export default SeasonDetails;
