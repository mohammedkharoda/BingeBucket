import Link from "next/link";

import CircularProgress from "@/components/ui/CircularProgress";
import { useRecommendedMovie } from "@/hooks/useRecommendedMovie";
import { MovieDetails } from "@/types";

const RecommendedMovies = (id: { id: string | string[] }) => {
  const recommendedMovie = useRecommendedMovie(Number(id.id));
  const recommendedMovieData: any = recommendedMovie.data;

  return (
    <section className="max-w-site mx-auto px-6 lg:px-16 py-16">
      <div className="eyebrow mb-3">More Like This</div>
      <h2 className="section-title mb-10">
        You might also like
      </h2>

      {recommendedMovieData && recommendedMovieData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {recommendedMovieData?.map((movie: MovieDetails) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="poster-card group h-full border border-border bg-surface hover:border-accent/30">
                {movie.poster_path ? (
                  <div className="overflow-hidden">
                    <img
                      alt={movie.title}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      width={270}
                    />
                  </div>
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-surface-2">
                    <span className="text-sm text-text-3">No Image</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3 border-t border-border p-4">
                  <h4 className="flex-1 truncate text-sm font-semibold text-text">
                    {movie.title}
                  </h4>
                  <CircularProgress
                    classNames={{
                      svg: "w-[40px] h-[40px]",
                      indicator: `${
                        Math.round((movie?.vote_average ?? 0) * 10) > 70
                          ? "stroke-success"
                          : Math.round((movie?.vote_average ?? 0) * 10) >= 40
                            ? "stroke-warning"
                            : "stroke-danger"
                      }`,
                              value: "text-[11px] font-semibold text-text",
                    }}
                    showValueLabel={true}
                    strokeWidth={3}
                    value={Math.round((movie?.vote_average ?? 0) * 10)}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-text-3 text-base">No recommendations found.</p>
        </div>
      )}
    </section>
  );
};

export default RecommendedMovies;
