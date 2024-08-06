import React from "react";

// Define the props interface
interface ImageShowcaseProps {
  images: string[]; // An array of image URLs
}

const ImageShowcase: React.FC<ImageShowcaseProps> = ({ images }) => {
  return (
    <div className="bg-yellow-700 py-10 text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Image Showcase</h2>
      <p className="text-lg mb-8">
        Explore the captivating images and videos of the movie or series.
      </p>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        {/* Main Image */}
        <div className="md:col-span-2 row-span-2">
          <img
            src={images[0]}
            alt="Main"
            className="w-full h-full object-cover rounded-md shadow-lg"
          />
        </div>

        {/* Side Images */}
        {images.slice(1, 5).map((src, index) => (
          <div key={index} className="col-span-1">
            <img
              src={src}
              alt={`Side ${index + 1}`}
              className="w-full h-full object-cover rounded-md shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowcase;
