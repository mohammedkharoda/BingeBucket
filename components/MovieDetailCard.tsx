import { useMovieDetails } from "@/hooks/useMovieDetails";
import { Image } from "@nextui-org/react";

const MovieDetailCard = (id: { id: string | string[] }) => {
  const moviesInfo = useMovieDetails(Number(id.id));
  const moviesDetails = moviesInfo.data;
  console.log(moviesDetails);
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-[20px] items-start flex-grow">
        <p className="font-roboto text-[56px] font-bold leading-[67px] text-white">
          {moviesDetails?.title}
        </p>
        <p
          className={`font-roboto ${moviesDetails?.overview ? "text-left w-[70%]" : ""} text-[18px] font-normal leading-[27px]`}
        >
          {moviesDetails?.tagline
            ? moviesDetails.tagline
            : moviesDetails?.overview}
        </p>
        <ul className="flex gap-[8px]">
          {moviesDetails?.genres.map((genre) => (
            <li
              key={genre.id}
              className="bg-brown px-[8px] py-[4px] rounded-lg text-[14px] font-semibold uppercase"
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Image
          width={450}
          loading="lazy"
          src={`https://image.tmdb.org/t/p/original/${moviesDetails?.poster_path}`}
          alt="muzzle-image"
          radius="lg"
        />
      </div>
    </div>
  );
};

export default MovieDetailCard;
