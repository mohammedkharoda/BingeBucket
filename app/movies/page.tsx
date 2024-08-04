import MovieShowcase from "@/components/MovieShowcase";
import SortedMovie from "@/components/SortedMovies";
import TrendingMoviesBanner from "@/components/TrendingMoviesBanner";
export default function Movies() {
  return (
    <div className="lg:px-[64px] lg:py-[112px] px-[20px] py-[64px]">
      <MovieShowcase />
      <TrendingMoviesBanner />
      <SortedMovie />
    </div>
  );
}
