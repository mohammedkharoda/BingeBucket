"use client";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

const WatchlistPage = () => {
  const watchlist = useWatchlistStore((state) => state.watchlist);

  if (watchlist.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Your watchlist is empty.
      </p>
    );
  }

  console.log(watchlist);

  return (
    <div className="px-4 py-6">
      <div className="text-3xl font-bold text-center mb-6">Your Watchlist</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlist.map((item) => (
          <div
            key={item.id}
            className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              href={`/${item.media_type === "movie" ? "movies" : "series"}/${
                item.id
              }`}
            >
              <Card>
                <CardBody>
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">
                      {item.title || item.name}
                    </h2>
                    <p className="text-sm text-yellow-500">
                      Rating: {item.vote_average.toFixed(1)}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
