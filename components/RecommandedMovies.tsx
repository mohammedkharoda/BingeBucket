import { useRecommandedMovie } from "@/hooks/useRecommandedMovie";
import { MovieDetails } from "@/types";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const RecommandedMovies = (id: { id: string | string[] }) => {
  const recommandedMovie = useRecommandedMovie(Number(id.id));
  const recommandedMovieData: any = recommandedMovie.data;
  return (
    <div className="lg:py-[112px] lg:px-[64] py-[64px] px-[20px] flex flex-col justify-center items-center gap-10">
      <h1 className="text-white text-[40px] font-bold uppercase underline underline-offset-8">
        Similar Movies that might <br />
        interested to look
      </h1>
      <div className="flex flex-wrap justify-between items-center gap-9">
        {/* Recommanded Movies */}
        {recommandedMovieData?.map((movie: MovieDetails) => (
          <Card key={movie.id} className="py-4" isHoverable isPressable>
            <Link href={`/movies/${movie.id}`}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center gap-1">
                <h4 className="font-bold text-large break-words max-w-[calc(100%-60px)]">
                  {movie.title}
                </h4>
                <div className="flex gap-4 items-center">
                  <p className="font-medium text-white text-[16px]">
                    Matched Ratio
                  </p>
                  <CircularProgress
                    classNames={{
                      svg: "w-[40px] h-[40px] drop-shadow-md",
                      indicator: `${Math.round((movie?.vote_average ?? 0) * 10) > 70 ? "stroke-green-pastel" : Math.round((movie?.vote_average ?? 0) * 10) >= 40 ? "stroke-yellow-dark" : "stroke-crimson-red"}`,
                      value: "text-[12px] font-semibold text-white",
                    }}
                    value={Math.round((movie?.vote_average ?? 0) * 10)}
                    strokeWidth={2}
                    showValueLabel={true}
                  />
                </div>
              </CardHeader>
              <CardBody className="overflow-hidden py-2">
                <Image
                  isZoomed
                  alt="Card background"
                  className="object-cover w-full h-auto rounded-xl"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  width={270}
                />
              </CardBody>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommandedMovies;
