import Link from "next/link";

import CircularProgress from "@/components/ui/CircularProgress";
import { useRecommandedMovie } from "@/hooks/useRecommandedMovie";
import { MovieDetails } from "@/types";

const RecommandedMovies = (id: { id: string | string[] }) => {
  const recommandedMovie = useRecommandedMovie(Number(id.id));
  const recommandedMovieData: any = recommandedMovie.data;

  return (
    <section className="max-w-site mx-auto px-6 lg:px-16 py-16">
      <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-off-white lg:text-4xl">
        You might also like
      </h2>

      {recommandedMovieData && recommandedMovieData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {recommandedMovieData?.map((movie: MovieDetails) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="group card-hover overflow-hidden rounded-2xl border border-surface-4 bg-surface/80 backdrop-blur-md transition-all duration-300 hover:border-gold/30 hover:shadow-card">
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
                    <span className="text-sm text-subtle">No Image</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3 border-t border-surface-4 p-4">
                  <h4 className="flex-1 truncate text-sm font-semibold text-off-white">
                    {movie.title}
                  </h4>
                  <CircularProgress
                    classNames={{
                      svg: "w-[40px] h-[40px]",
                      indicator: `${
                        Math.round((movie?.vote_average ?? 0) * 10) > 70
                          ? "stroke-dark-green"
                          : Math.round((movie?.vote_average ?? 0) * 10) >= 40
                            ? "stroke-off-orange"
                            : "stroke-dark-red"
                      }`,
                              value: "text-[11px] font-semibold text-off-white",
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
          <p className="text-subtle text-base">No recommendations found.</p>
        </div>
      )}
    </section>
  );
};

export default RecommandedMovies;
