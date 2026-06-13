"use client";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine, RiClapperboardLine, RiFireLine, RiMovie2Line } from "react-icons/ri";

import MovieShowcase from "@/components/movies/MovieShowcase";
import TrendingMoviesBanner from "@/components/movies/TrendingMoviesBanner";
import SortedMovieComponent from "@/components/movies/SortedMovies";

export default function Movies() {
  return (
      <main className="relative overflow-hidden bg-bg">
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-56 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl" />

        <section className="container-site relative pt-10 lg:pt-12">
          <div className="card px-6 py-6 sm:px-8 lg:px-9">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="eyebrow mb-3">
                  <RiClapperboardLine size={13} />
                  Movies Hub
                </div>
                <h1 className="section-title max-w-[720px] leading-[1.04] text-3xl sm:text-4xl lg:text-5xl">
                  Discover What To
                  <span className="text-gradient"> Watch Next</span>
                </h1>
                <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-text-2 sm:text-[15px]">
                  Explore trending picks, fresh releases, and top-rated films in one curated stream.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Image
                  alt=""
                  aria-hidden
                  className="hidden h-24 w-24 shrink-0 object-contain opacity-90 lg:block xl:h-28 xl:w-28"
                  height={112}
                  loading="lazy"
                  src="/image/movie-clap.gif"
                  unoptimized
                  width={112}
                />
                <Link
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-2 transition hover:bg-surface-3 hover:text-accent-2"
                  href="#movies-filter"
                >
                  Browse Picks
                  <RiArrowRightUpLine size={13} />
                </Link>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm font-semibold text-text-2">
                <div className="inline-flex items-center gap-2">
                  <RiFireLine className="text-accent" size={13} />
                  Daily Trending
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm font-semibold text-text-2">
                <div className="inline-flex items-center gap-2">
                  <RiMovie2Line className="text-accent" size={13} />
                  Curated Collections
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm font-semibold text-text-2">
                <div className="inline-flex items-center gap-2">
                  <RiClapperboardLine className="text-accent" size={13} />
                  Fresh Releases
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pt-6">
          <MovieShowcase />
        </section>

        <section className="relative">
          <TrendingMoviesBanner />
        </section>

        <section className="relative pb-16" id="movies-filter">
          <SortedMovieComponent />
        </section>
      </main>
  );
}
