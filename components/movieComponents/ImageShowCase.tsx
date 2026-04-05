/* eslint-disable import/order */
import { useMovieImageShowcase } from "@/hooks/useMovieImageShowcase";
import React from "react";
import { motion } from "framer-motion";
import { RiImageLine } from "react-icons/ri";

const ImageShowcase = (id: { id: string | string[] }) => {
  const { data, isLoading, error } = useMovieImageShowcase(Number(id.id));
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  if (isLoading)
    return (
      <div className="py-12 text-center text-muted text-sm">Loading images...</div>
    );

  if (error)
    return (
      <div className="py-12 text-center text-red text-sm">
        Error loading images: {error.message}
      </div>
    );

  const images: any[] = data?.backdrops ?? [];

  if (images.length === 0) return null;

  return (
    <section className="py-16 px-6 lg:px-16 section-pastel-peach border-y border-surface-4">
      <div className="max-w-site mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-5 rounded-full bg-gold" />
          <h2 className="text-2xl lg:text-3xl font-extrabold text-off-white flex items-center gap-3">
            Image Showcase
            <RiImageLine className="text-gold" size={24} />
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Main Image */}
          <motion.div
            className="md:col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-card"
            initial={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <img
              alt="Main backdrop"
              className="w-full h-full object-cover"
              src={`${IMAGE_BASE_URL}${images[0]?.file_path}`}
            />
          </motion.div>

          {/* Side Images */}
          {images.slice(1, 3).map((image, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-card col-span-1"
              initial={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <img
                alt={`Backdrop ${index + 2}`}
                className="w-full h-full object-cover"
                src={`${IMAGE_BASE_URL}${image?.file_path}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageShowcase;
