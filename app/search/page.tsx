"use client";
import { useMultiSearch } from "@/hooks/useMultiSearch";
import Loading from "@/shared/Loading";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data, error, isLoading } = useMultiSearch(query);

  if (isLoading) return <Loading />;
  if (error)
    return toast.error(
      "An error occurred while fetching data. Please try again later."
    );

  const filteredData = data?.filter(
    (item: { media_type: string; poster_path: string | null }) =>
      (item.media_type === "tv" || item.media_type === "movie") &&
      item.poster_path !== null // Ensure there's a poster path
  );

  return (
    <div className="px-[20px] py-[64px] lg:px-[64px] lg:py-[80px]">
      <h1 className="text-[45px] text-center font-bold mb-4 capitalize">
        Search Results for {query}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredData?.map((item: any) => (
          <div key={item.id}>
            <Link
              href={`/${item.media_type === "movie" ? "movies" : "series"}/${item.id}`}
            >
              <Card isPressable isHoverable>
                <CardBody className="p-4">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    className="w-full h-[600px] object-cover rounded-md"
                    alt={item.title || item.name}
                    loading="lazy"
                    isZoomed
                  />
                </CardBody>
                <CardFooter className="flex items-center justify-center">
                  <p className="text-center text-[18px]">
                    {item.title || item.name}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
