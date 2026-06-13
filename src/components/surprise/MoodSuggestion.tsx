"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiRefreshLine,
  RiArrowRightLine,
  RiSparklingFill,
  RiRobot2Line,
  RiMovie2Line,
  RiTv2Line,
} from "react-icons/ri";

import { useMoodSuggestion } from "@/hooks/useMoodSuggestion";

const moods = [
  { name: "Happy", emoji: "😊", desc: "Light, fun, uplifting" },
  { name: "Sad", emoji: "😢", desc: "Emotional, healing stories" },
  { name: "Excited", emoji: "🤩", desc: "Fast and thrilling" },
  { name: "Relaxed", emoji: "😌", desc: "Calm, cozy vibes" },
  { name: "Adventurous", emoji: "🧗", desc: "Epic journeys" },
  { name: "Curious", emoji: "🧠", desc: "Mystery and sci-fi" },
  { name: "Nostalgic", emoji: "📼", desc: "Warm throwback energy" },
];

type ContentType = "both" | "movie" | "tv";

type RecommendationItem = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  aiReason?: string;
  aiSource?: "gemini" | "fallback" | "gemini-idea";
  isIdeaOnly?: boolean;
};

const MoodSuggestion = () => {
  const [selectedMood, setSelectedMood] = useState<string>("Happy");
  const [preferences, setPreferences] = useState("");
  const [contentType, setContentType] = useState<ContentType>("both");

  const { data, error, isLoading, refetch } = useMoodSuggestion(
    selectedMood,
    preferences,
    contentType
  );

  const suggestion: RecommendationItem | null = data?.recommendation ?? null;
  const router = useRouter();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    refetch();
  };

  const handleWatchNow = () => {
    if (suggestion) {
      if (!suggestion.id || suggestion.isIdeaOnly) return;
      const isMovie = suggestion.media_type === "movie" || "title" in suggestion;
      const route = isMovie ? `/movies/${suggestion.id}` : `/series/${suggestion.id}`;

      router.push(route);
    }
  };

  return (
    <div
      className="relative overflow-hidden bg-bg"
      style={{
        backgroundImage:
          "radial-gradient(circle at 9% 0%, rgba(124,92,255,0.18) 0%, rgba(124,92,255,0) 34%), radial-gradient(circle at 92% 12%, rgba(34,211,238,0.16) 0%, rgba(34,211,238,0) 38%)",
      }}
    >
      <div className="pointer-events-none absolute -left-14 top-12 h-48 w-48 rounded-full blur-3xl bg-accent/20" />
      <div className="pointer-events-none absolute -right-20 top-36 h-60 w-60 rounded-full blur-3xl bg-accent-2/20" />

      <div className="max-w-site mx-auto px-6 lg:px-16 py-16 flex flex-col gap-10">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          alt=""
          aria-hidden
          className="mx-auto mb-2 h-28 w-28 object-contain sm:h-32 sm:w-32"
          loading="lazy"
          src="/happy-retro-robot.gif"
        />
        <div className="glass kicker mb-4 rounded-full px-4 py-2">
          <RiSparklingFill className="animate-pulse" size={12} />
          AI Mood Engine
        </div>
        <h1 className="text-3xl lg:text-5xl font-extrabold text-text leading-tight mb-3">
          Tell Us Your Mood,
          <span className="text-gradient"> We Pick Your Next Obsession</span>
        </h1>
        <p className="text-text-2 text-base max-w-2xl mx-auto">
          Powered by Gemini + TMDB. Describe your vibe and get a precise recommendation with an explanation.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 relative z-10">
        <div className="glass rounded-3xl p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-3 mb-3">Mood</p>
          <div className="flex gap-2.5 items-center justify-start flex-wrap">
            {moods.map((mood, idx) => (
              <motion.button
                key={mood.name}
                animate={{ opacity: 1, scale: 1 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedMood === mood.name
                    ? "bg-accent/15 border-accent/30 text-text shadow-card"
                    : "bg-surface border-border text-text-2 hover:bg-surface-2"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                title={mood.desc}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                onClick={() => handleMoodSelect(mood.name)}
              >
                <span>{mood.emoji}</span>
                {mood.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-3 mb-3">Extra Preferences</p>
          <textarea
            className="input min-h-[96px] rounded-2xl"
            placeholder="Example: no horror, strong female lead, under 2 hours, plot twists"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
          <div className="mt-3 flex items-center gap-2">
            {["both", "movie", "tv"].map((type) => (
              <button
                key={type}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                  contentType === type
                    ? "bg-accent/15 border-accent/30 text-text"
                    : "bg-surface-2 border-border text-text-2 hover:bg-surface-3"
                }`}
                onClick={() => setContentType(type as ContentType)}
              >
                {type === "movie" && <RiMovie2Line size={13} />}
                {type === "tv" && <RiTv2Line size={13} />}
                {type === "both" && <RiSparklingFill size={13} />}
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
          <button className="btn-ghost" onClick={() => refetch()}>
          <RiRefreshLine size={15} />
          Re-roll Recommendation
        </button>
      </div>

      {error && <p className="text-center text-danger text-sm">{error.message}</p>}

      <AnimatePresence mode="wait">
        {suggestion && suggestion.poster_path && (
          <motion.div
            key={`${suggestion.media_type}-${suggestion.id}-${suggestion.title || suggestion.name}`}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="max-w-4xl mx-auto w-full relative z-10"
            exit={{ opacity: 0, y: -24, scale: 0.97 }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="card rounded-3xl shadow-card-hover flex flex-col md:flex-row">
              <div className="md:w-64 flex-shrink-0">
                <img
                  alt={suggestion.title || suggestion.name}
                  className="w-full h-full object-cover md:aspect-auto aspect-[2/3]"
                  loading="lazy"
                  src={
                    suggestion.poster_path
                      ? `https://image.tmdb.org/t/p/w500${suggestion.poster_path}`
                      : "/image/forbidden.png"
                  }
                />
              </div>

              <div className="flex flex-col gap-5 p-6 flex-1 justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="pill text-[10px] font-bold uppercase tracking-widest">
                      <RiRobot2Line size={12} />
                      {suggestion.aiSource === "gemini"
                        ? "AI Match"
                        : suggestion.aiSource === "gemini-idea"
                          ? "AI Idea"
                          : "Smart Fallback"}
                    </span>
                    <span className="pill text-[10px] font-bold uppercase tracking-widest">
                      {suggestion.media_type === "movie" ? "Movie" : "Series"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-text mb-2">
                    {suggestion.title || suggestion.name}
                  </h3>

                  {suggestion.aiReason && (
                    <p className="text-sm text-text-2 leading-relaxed mb-3">
                      {suggestion.aiReason}
                    </p>
                  )}

                  <p className="text-sm text-text-2 leading-relaxed line-clamp-4">
                    {suggestion.overview || "No overview available for this recommendation."}
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  {!suggestion.isIdeaOnly ? (
                    <button className="btn-primary" onClick={handleWatchNow}>
                      Open Details <RiArrowRightLine size={15} />
                    </button>
                  ) : (
                    <span className="pill px-5 py-2.5 text-sm font-semibold">
                      Idea Mode (No TMDB match)
                    </span>
                  )}
                  <button className="btn-ghost" onClick={() => refetch()}>
                    <RiRefreshLine size={15} /> Pick Another
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(!suggestion || !suggestion.poster_path) && !isLoading && !error && (
        <p className="text-center text-text-2 text-sm">Choose your mood and hit re-roll to get a recommendation.</p>
      )}

      {isLoading && (
        <div className="mx-auto h-10 w-10 rounded-full border-4 border-border border-t-accent animate-spin" />
      )}
      </div>
    </div>
  );
};

export default MoodSuggestion;
