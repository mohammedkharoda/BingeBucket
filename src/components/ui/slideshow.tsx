"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, Star } from "lucide-react";

import { cn } from "@/lib/utils";

export type SlideshowSlide = {
  img: string;
  text: string[];
  href?: string;
  description?: string;
  rating?: number;
  date?: string;
  tag?: string;
};

const DEFAULT_SLIDES: SlideshowSlide[] = [
  {
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1800&q=80",
    text: ["BETWEEN SHADOW", "AND LIGHT"],
    description: "A visual meditation on atmosphere, texture, and cinematic stillness.",
    tag: "Now Showing",
  },
  {
    img: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?auto=format&fit=crop&w=1800&q=80",
    text: ["SILENCE SPEAKS", "THROUGH FORM"],
    description: "Minimalist storytelling framed with deliberate motion and contrast.",
    tag: "Now Showing",
  },
  {
    img: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1800&q=80",
    text: ["ESSENCE BEYOND", "PERCEPTION"],
    description: "An immersive sequence of layered worlds and emotional beats.",
    tag: "Now Showing",
  },
  {
    img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1800&q=80",
    text: ["TRUTH IN", "EMPTINESS"],
    description: "A refined palette, rich gradients, and elegant scene composition.",
    tag: "Now Showing",
  },
  {
    img: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=1800&q=80",
    text: ["SURRENDER TO", "THE VOID"],
    description: "A gallery-like carousel experience inspired by film posters.",
    tag: "Now Showing",
  },
];

type SlideshowProps = {
  slides?: SlideshowSlide[];
  className?: string;
};

export default function Component({ slides = DEFAULT_SLIDES, className }: SlideshowProps) {
  const normalizedSlides = useMemo(
    () =>
      slides.length > 0
        ? slides
        : DEFAULT_SLIDES,
    [slides],
  );

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightBySlide, setIsLightBySlide] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isPaused || normalizedSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % normalizedSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, normalizedSlides.length]);

  useEffect(() => {
    normalizedSlides.forEach((slide, index) => {
      const img = new window.Image();

      img.crossOrigin = "anonymous";
      img.src = slide.img;

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const sampleWidth = 32;
          const sampleHeight = 18;

          canvas.width = sampleWidth;
          canvas.height = sampleHeight;

          const ctx = canvas.getContext("2d");

          if (!ctx) return;

          // Sample mostly from the left-middle region where text sits.
          ctx.drawImage(
            img,
            0,
            img.height * 0.22,
            img.width * 0.58,
            img.height * 0.62,
            0,
            0,
            sampleWidth,
            sampleHeight,
          );

          const pixels = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
          let luminance = 0;

          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i] / 255;
            const g = pixels[i + 1] / 255;
            const b = pixels[i + 2] / 255;

            luminance += 0.2126 * r + 0.7152 * g + 0.0722 * b;
          }

          const avgLuma = luminance / (pixels.length / 4);

          setIsLightBySlide((prev) => ({ ...prev, [index]: avgLuma > 0.52 }));
        } catch {
          setIsLightBySlide((prev) => ({ ...prev, [index]: false }));
        }
      };

      img.onerror = () => {
        setIsLightBySlide((prev) => ({ ...prev, [index]: false }));
      };
    });
  }, [normalizedSlides]);

  const activeSlide = normalizedSlides[current];
  const isLightActive = isLightBySlide[current] ?? false;

  const overlayRight = isLightActive
    ? "linear-gradient(to right, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.74) 50%, rgba(0,0,0,0.34) 100%)"
    : "linear-gradient(to right, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.58) 50%, rgba(0,0,0,0.2) 100%)";

  const overlayBottom = isLightActive
    ? "linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.44) 58%, rgba(0,0,0,0.14) 100%)"
    : "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.32) 58%, rgba(0,0,0,0.10) 100%)";

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative h-[360px] overflow-hidden rounded-[2rem] border border-border sm:h-[420px] lg:h-[470px]"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {normalizedSlides.map((slide, i) => {
          const isActive = i === current;

          return (
            <div
              key={`${slide.img}-${i}`}
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-all duration-700",
                isActive ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[1.02]",
              )}
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0" style={{ background: overlayRight }} />
              <div className="absolute inset-0" style={{ background: overlayBottom }} />
            </div>
          );
        })}

        <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 lg:p-10">
          <span
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              borderColor: "rgba(124,92,255,0.55)",
              background: "rgba(7,7,11,0.62)",
              color: "#ffffff",
              boxShadow: "0 4px 18px rgba(0,0,0,0.3)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {activeSlide.tag || "Now Showing"}
          </span>

          <h3
            className="max-w-3xl text-3xl font-black leading-[1.02] tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: "#ffffff", textShadow: "0 6px 24px rgba(0,0,0,0.48)" }}
          >
            {activeSlide.text.map((t, i) => (
              <span key={`${t}-${i}`} className="block">
                {t}
              </span>
            ))}
          </h3>

          {activeSlide.description && (
            <p
              className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base"
              style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 2px 14px rgba(0,0,0,0.42)" }}
            >
              {activeSlide.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-4" style={{ color: "rgba(255,255,255,0.95)" }}>
            {typeof activeSlide.rating === "number" && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <Star className="h-4 w-4 fill-gold text-gold" />
                {activeSlide.rating.toFixed(1)}
              </span>
            )}

            {activeSlide.date && (
              <span className="inline-flex items-center gap-1.5 text-sm text-white/75">
                <CalendarDays className="h-4 w-4" />
                {activeSlide.date}
              </span>
            )}
          </div>
        </div>

        <div
          className="absolute bottom-4 right-4 z-20 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.15em]"
          style={{
            borderColor: "rgba(255,255,255,0.85)",
            background: "rgba(7,7,11,0.56)",
            color: "#ffffff",
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(normalizedSlides.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
