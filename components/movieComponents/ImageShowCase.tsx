import React from "react";

import { useMovieImageShowcase } from "@/hooks/useMovieImageShowcase";

const ImageShowcase = (id: { id: string | string[] }) => {
  // Assuming useMovieImageShowcase returns an object with data, loading, and error
  const { data, isLoading, error } = useMovieImageShowcase(Number(id.id));
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  // Handle loading state
  if (isLoading) return <p>Loading images...</p>;

  // Handle error state
  if (error) return <p>Error loading images: {error.message}</p>;

  // Accessing backdrops array from data
  const images: { file_path: string }[] = (data?.backdrops ?? []).map(
    (file_path) => ({ file_path })
  );

  // Handle no images case
  if (images.length === 0) {
    return <p>No images available for this movie.</p>;
  }

  return (
    <div className="bg-yellow-700 py-10 text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Image Showcase</h2>
      <p className="text-lg mb-8">
        Explore the captivating images and videos of the movie.
      </p>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        {/* Main Image */}
        <div className="md:col-span-2 row-span-2">
          <img
            // @ts-ignore
            alt="Main"
            className="w-full h-full object-cover rounded-md shadow-lg"
            src={`${IMAGE_BASE_URL}${images[0]?.file_path}`} // Constructing the main image URL
          />
        </div>

        {/* Side Images */}
        {images.slice(1, 6).map((image, index) => (
          <div key={index} className="col-span-1">
            <img
              // @ts-ignore
              alt={`Side ${index + 1}`}
              className="w-full h-full object-cover rounded-md shadow-lg"
              src={`${IMAGE_BASE_URL}${image?.file_path}`} // Correctly accessing file_path
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowcase;
