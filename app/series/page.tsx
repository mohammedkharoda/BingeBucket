import SeriesShowcase from "@/components/SeriesShowcase";
import SortedSeries from "@/components/SortedSeries";
import TrendingSeriesBanner from "@/components/TrendingSeriesBanner";

export default function Series() {
  return (
    <div className="lg:px-[64px] lg:py-[112px] px-[20px] py-[64px]">
      <SeriesShowcase />
      <TrendingSeriesBanner />
      <SortedSeries />
    </div>
  );
}
