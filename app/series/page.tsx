import SeriesShowcase from "@/components/seriesComponents/SeriesShowcase";
import SortedSeries from "@/components/seriesComponents/SortedSeries";
import TrendingSeriesBanner from "@/components/seriesComponents/TrendingSeriesBanner";

export default function Series() {
  return (
    <div className="lg:px-[64px] lg:py-[112px] px-[20px] py-[64px]">
      <SeriesShowcase />
      <TrendingSeriesBanner />
      <SortedSeries />
    </div>
  );
}
