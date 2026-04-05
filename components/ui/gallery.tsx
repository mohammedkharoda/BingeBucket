"use client";

import { Ref, forwardRef, useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useMotionValue, type Variants } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type GalleryMovie = {
  id: number;
  src: string;
  title: string;
};

export const PhotoGallery = ({
  animationDelay = 0.3,
  movies = [],
}: {
  animationDelay?: number;
  movies?: GalleryMovie[];
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => setIsVisible(true), animationDelay * 1000);
    const animationTimer = setTimeout(() => setIsLoaded(true), (animationDelay + 0.35) * 1000);
    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const photoVariants: Variants = {
    hidden: () => ({ x: 0, y: 0, scale: 1 }),
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 65,
        damping: 13,
        mass: 1,
        delay: custom.order * 0.12,
      },
    }),
  };

  // 5 positions spread horizontally — portrait ratio cards
  const POSITIONS = [
    { order: 0, x: "-360px", y: "10px",  zIndex: 34, direction: "left"  as Direction },
    { order: 1, x: "-180px", y: "22px",  zIndex: 28, direction: "left"  as Direction },
    { order: 2, x: "0px",    y: "8px",   zIndex: 22, direction: "right" as Direction },
    { order: 3, x: "180px",  y: "20px",  zIndex: 16, direction: "right" as Direction },
    { order: 4, x: "360px",  y: "28px",  zIndex: 10, direction: "left"  as Direction },
  ];

  const photos = POSITIONS.map((pos, i) => ({
    ...pos,
    id: i + 1,
    src: movies[i]?.src  ?? "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop",
    movieId: movies[i]?.id,
    title: movies[i]?.title ?? "",
  }));

  return (
    <div className="relative overflow-hidden py-10 sm:py-12">
      {/* Grid background */}
      <div className="absolute inset-0 max-md:hidden top-[160px] -z-10 h-[320px] w-full bg-transparent bg-[linear-gradient(to_right,#3f3f46_1px,transparent_1px),linear-gradient(to_bottom,#3f3f46_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-15 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Label */}
      <p className="my-2 text-center text-xs font-semibold uppercase tracking-[3px]" style={{ color: "#E8756A" }}>
        Trending Today
      </p>

      {/* Heading */}
      <h3 className="mx-auto max-w-xl py-2 text-center font-display font-black"
        style={{ fontSize: "clamp(26px, 4vw, 48px)", color: "var(--color-white)", lineHeight: 1.15 }}>
        What Everyone&apos;s{" "}
        <span style={{ background: "linear-gradient(135deg, #E8756A 0%, #F5C842 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Watching
        </span>
      </h3>

      {/* Fan of posters */}
      <div className="relative mb-5 mt-2 h-[350px] w-full items-center justify-center lg:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Pivot element — poster size 160×240 */}
            <div className="relative" style={{ width: 160, height: 240 }}>
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{ x: photo.x, y: photo.y, order: photo.order }}
                >
                  <PosterPhoto
                    src={photo.src}
                    alt={photo.title}
                    direction={photo.direction}
                    movieId={photo.movieId}
                    isFeatured={photo.order === 2}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="flex w-full justify-center">
        <Link
          href="/movies#movies-filter"
          className="inline-flex items-center gap-2 rounded-badge border border-surface-4 bg-white/80 px-7 py-3 text-sm font-semibold text-[var(--color-muted)] transition-all duration-200 hover:scale-105 hover:bg-black hover:text-[#6BB5D6] active:scale-95"
          style={{
            boxShadow: "0 6px 20px rgba(24,22,16,0.12)",
          }}
        >
          View All Trending
        </Link>
      </div>
    </div>
  );
};

// ── Helpers ──────────────────────────────────────────────────────

function getRandomNumberInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const MotionImage = motion(
  forwardRef(function MotionImage(props: ImageProps, ref: Ref<HTMLImageElement>) {
    return <Image ref={ref} {...props} />;
  })
);

type Direction = "left" | "right";

export const PosterPhoto = ({
  src,
  alt,
  direction,
  movieId,
  isFeatured = false,
}: {
  src: string;
  alt: string;
  direction?: Direction;
  movieId?: number;
  isFeatured?: boolean;
}) => {
  const [rotation, setRotation] = useState(0);
  const x = useMotionValue(80);
  const y = useMotionValue(120);

  useEffect(() => {
    const r = getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
    setRotation(r);
  }, [direction]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const card = (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.1, zIndex: 40 }}
      whileHover={{ scale: 1.06, rotateZ: 2 * (direction === "left" ? -1 : 1), zIndex: 40 }}
      whileDrag={{ scale: 1.08, zIndex: 40 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width: 160,
        height: 240,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className="relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(80); y.set(120); }}
      draggable={false}
      tabIndex={0}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: "14px",
          boxShadow: isFeatured
            ? "0 24px 48px rgba(0,0,0,0.7), 0 0 0 2px rgba(232,117,106,0.55)"
            : "0 16px 36px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <MotionImage
          className={cn("object-cover")}
          fill
          src={src}
          alt={alt}
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop";
          }}
        />
        {/* Bottom title gradient */}
        <div
          className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-8"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
        >
          <p className="text-[11px] font-bold text-white leading-tight truncate" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
            {alt}
          </p>
        </div>
        {isFeatured && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ background: "rgba(232,117,106,0.9)", backdropFilter: "blur(6px)" }}>
            <span className="text-[9px] font-black text-white uppercase tracking-wide">Trending</span>
          </div>
        )}
      </div>
    </motion.div>
  );

  return movieId ? (
    <Link href={`/movies/${movieId}`} style={{ display: "block" }}>
      {card}
    </Link>
  ) : card;
};
