import { useRecommandedMovie } from "@/hooks/useRecommandedMovie";
import { MovieDetails } from "@/types";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";

const RecommandedMovies = (id: { id: string | string[] }) => {
  const recommandedMovie = useRecommandedMovie(Number(id.id));
  const recommandedMovieData: any = recommandedMovie.data;
  return (
    <>
      {recommandedMovieData && recommandedMovieData.length > 0 ? (
        <div className="lg:py-[112px] lg:px-[64] py-[64px] px-[20px] flex flex-col justify-center items-center gap-10">
          <h1 className="text-white text-[40px] font-bold uppercase underline underline-offset-8">
            Similar Movies that might <br />
            interested to look
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommandedMovieData?.map((movie: MovieDetails) => (
              <div
                key={movie.id}
                className="bg-brown-dark p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/movies/${movie.id}`}>
                  <div className="pb-0 pt-2 px-4 flex flex-col items-center gap-1">
                    <h4 className="font-bold text-large break-words max-w-full">
                      {movie.title}
                    </h4>
                    <div className="flex gap-4 items-center">
                      <p className="font-medium text-white text-[16px]">
                        Matched Ratio
                      </p>
                      <CircularProgress
                        classNames={{
                          svg: "w-[50px] h-[50px] drop-shadow-md",
                          indicator: `${
                            Math.round((movie?.vote_average ?? 0) * 10) > 70
                              ? "stroke-dark-green"
                              : Math.round((movie?.vote_average ?? 0) * 10) >=
                                  40
                                ? "stroke-off-orange"
                                : "stroke-dark-red"
                          }`,
                          value: "text-[14px] font-semibold text-white",
                        }}
                        value={Math.round((movie?.vote_average ?? 0) * 10)}
                        strokeWidth={2}
                        showValueLabel={true}
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden py-2">
                    {movie.poster_path ? (
                      <img
                        alt="Card background"
                        className="w-full h-auto object-cover rounded-lg"
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        width={270}
                      />
                    ) : (
                      <div className="w-full h-[500px] flex items-center justify-center bg-gray-700 rounded-lg">
                        <span className="text-white text-lg">
                          No Image Available
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-[20px] px-[64px] lg:py-[112px] lg:px-[64px]">
          <h1 className="text-white text-[40px] font-bold uppercase pb-10 underline underline-offset-8">
            Similar Movies that might <br />
            interested to look
          </h1>
          <h1 className="font-bold text-[25px] text-brown-dark">
            No Recommandation Found!
          </h1>
        </div>
      )}
    </>
  );
};

export default RecommandedMovies;
