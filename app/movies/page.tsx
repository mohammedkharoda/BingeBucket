"use client";
import Link from "next/link";
import { RiArrowRightUpLine, RiClapperboardLine, RiFireLine, RiMovie2Line } from "react-icons/ri";

import MovieShowcase from "@/components/movieComponents/MovieShowcase";
import TrendingMoviesBanner from "@/components/movieComponents/TrendingMoviesBanner";
import SortedMovieComponent from "@/components/movieComponents/SortedMovies";

export default function Movies() {
  return (
      <main
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 12% 0%, rgba(232,117,106,0.14) 0%, rgba(232,117,106,0) 38%), radial-gradient(circle at 88% 8%, rgba(245,200,66,0.2) 0%, rgba(245,200,66,0) 36%), linear-gradient(180deg, #f9f4ec 0%, #f8f2e8 32%, #f9f6f1 100%)",
        }}
      >
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full blur-3xl" style={{ background: "rgba(107,181,214,0.16)" }} />
        <div className="pointer-events-none absolute -right-24 top-56 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(232,117,106,0.14)" }} />

        <section className="relative mx-auto max-w-site px-6 pt-10 lg:px-16 lg:pt-12">
          <div className="rounded-[1.65rem] border border-surface-4 px-6 py-6 sm:px-8 lg:px-9"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.68) 100%)",
              boxShadow: "0 16px 36px rgba(24,22,16,0.08)",
            }}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-surface-4 px-3 py-1">
                  <RiClapperboardLine className="text-gold" size={13} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Movies Hub</span>
                </div>
                <h1 className="max-w-[720px] text-3xl font-black leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Discover What To
                  <span className="text-gold-gradient"> Watch Next</span>
                </h1>
                <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
                  Explore trending picks, fresh releases, and top-rated films in one curated stream.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="#movies-filter"
                  className="inline-flex items-center gap-2 rounded-full border border-surface-4 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)] transition hover:bg-black hover:text-[#6BB5D6]"
                >
                  Browse Picks
                  <RiArrowRightUpLine size={13} />
                </Link>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-surface-4 bg-white/60 px-4 py-3 text-sm font-semibold text-muted">
                <div className="inline-flex items-center gap-2">
                  <RiFireLine size={13} className="text-gold" />
                  Daily Trending
                </div>
              </div>
              <div className="rounded-xl border border-surface-4 bg-white/60 px-4 py-3 text-sm font-semibold text-muted">
                <div className="inline-flex items-center gap-2">
                  <RiMovie2Line size={13} className="text-gold" />
                  Curated Collections
                </div>
              </div>
              <div className="rounded-xl border border-surface-4 bg-white/60 px-4 py-3 text-sm font-semibold text-muted">
                <div className="inline-flex items-center gap-2">
                  <RiClapperboardLine size={13} className="text-gold" />
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

        <section id="movies-filter" className="relative pb-16">
          <SortedMovieComponent />
        </section>
      </main>
  );
}
