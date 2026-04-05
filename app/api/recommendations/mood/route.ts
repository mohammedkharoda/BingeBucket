import { NextRequest, NextResponse } from "next/server";

type ContentType = "both" | "movie" | "tv";

type Candidate = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
};

type GeminiPick = {
  id: number;
  media_type: "movie" | "tv";
  reason: string;
  fitScore: number;
};

type GeminiIdea = {
  media_type: "movie" | "tv";
  title: string;
  overview: string;
  reason: string;
};

const TMDB_BEARER =
  process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_BEARER_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const moodGenreMap: Record<string, number[]> = {
  Happy: [35, 10751],
  Sad: [18, 10749],
  Excited: [28, 53],
  Relaxed: [99, 16],
  Adventurous: [12, 14],
  Nostalgic: [10751, 36],
  Curious: [9648, 878],
};

const safeJsonFromText = <T>(text: string): T | null => {
  try {
    return JSON.parse(text) as T;
  } catch {
    const fenced = text.match(/```json\s*([\s\S]*?)```/i);

    if (fenced?.[1]) {
      try {
        return JSON.parse(fenced[1]) as T;
      } catch {
        return null;
      }
    }

    return null;
  }
};

const normalizeCandidates = (items: any[], mediaType: "movie" | "tv"): Candidate[] => {
  return items
    .filter((item) => item && item.id && (item.title || item.name) && item.poster_path)
    .map((item) => ({
      id: item.id,
      media_type: mediaType,
      title: item.title,
      name: item.name,
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      vote_average: item.vote_average,
      popularity: item.popularity,
      release_date: item.release_date,
      first_air_date: item.first_air_date,
    }));
};

const fallbackPick = (candidates: Candidate[], mood: string): { pick: Candidate; reason: string } => {
  const moodBias: Record<string, number> = {
    Happy: 0.6,
    Sad: 0.45,
    Excited: 0.7,
    Relaxed: 0.4,
    Adventurous: 0.65,
    Nostalgic: 0.45,
    Curious: 0.55,
  };

  const bias = moodBias[mood] ?? 0.5;
  const scored = candidates
    .map((c) => {
      const rating = (c.vote_average ?? 0) / 10;
      const pop = Math.min((c.popularity ?? 0) / 120, 1);
      const freshness = c.media_type === "movie" ? 0.05 : 0.08;
      const random = Math.random() * 0.12;
      const score = rating * 0.5 + pop * 0.35 + freshness + bias * 0.1 + random;

      return { candidate: c, score };
    })
    .sort((a, b) => b.score - a.score);

  const pick = scored[0]?.candidate ?? candidates[0];

  return {
    pick,
    reason:
      "Picked from top mood-matched titles based on audience score, popularity, and content fit.",
  };
};

const fetchTmdbCandidates = async (mood: string, contentType: ContentType) => {
  if (!TMDB_BEARER) {
    return [];
  }

  try {
    const genres = moodGenreMap[mood] ?? [35, 18];
    const genreFilter = genres.join(",");
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_BEARER}`,
    };

    const movieUrl = `${TMDB_BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=200&with_genres=${genreFilter}&page=1`;
    const tvUrl = `${TMDB_BASE_URL}/discover/tv?language=en-US&sort_by=popularity.desc&vote_count.gte=120&with_genres=${genreFilter}&page=1`;

    const [movieRes, tvRes] = await Promise.all([
      contentType === "tv" ? Promise.resolve(null) : fetch(movieUrl, { headers, cache: "no-store" }),
      contentType === "movie" ? Promise.resolve(null) : fetch(tvUrl, { headers, cache: "no-store" }),
    ]);

    const movieJson = movieRes && movieRes.ok ? await movieRes.json() : { results: [] };
    const tvJson = tvRes && tvRes.ok ? await tvRes.json() : { results: [] };

    const movieItems = normalizeCandidates(movieJson.results ?? [], "movie");
    const tvItems = normalizeCandidates(tvJson.results ?? [], "tv");

    return [...movieItems, ...tvItems].slice(0, 24);
  } catch {
    return [];
  }
};

const getGeminiPick = async (
  geminiKey: string,
  mood: string,
  preferences: string,
  candidates: Candidate[]
): Promise<GeminiPick | null> => {
  try {
    const prompt = [
      "You are an expert film and TV critic helping users find their perfect watch.",
      `User's current mood: ${mood}`,
      preferences ? `User's extra preferences: ${preferences}` : "",
      "From the candidates below, pick the single BEST match for this mood and preferences.",
      "Consider: genre fit, tone, pacing, themes, and overall quality.",
      "Return ONLY valid JSON with no markdown, no explanation, no extra text:",
      '{"id":number,"media_type":"movie|tv","reason":"1-2 sentence explanation why this fits the mood perfectly","fitScore":number}',
      "fitScore: 0-100 representing how well this matches the mood.",
      `Candidates:\n${JSON.stringify(
        candidates.map((c) => ({
          id: c.id,
          media_type: c.media_type,
          title: c.title || c.name,
          overview: c.overview?.slice(0, 200),
          vote_average: c.vote_average,
          popularity: c.popularity,
        }))
      )}`,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 256 },
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) return null;
    const json = await response.json();
    const text =
      json?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("\n") || "";

    const parsed = safeJsonFromText<GeminiPick>(text);

    if (!parsed || !parsed.id || !parsed.media_type) return null;

    return parsed;
  } catch {
    return null;
  }
};

const getGeminiIdea = async (
  geminiKey: string,
  mood: string,
  preferences: string,
  contentType: ContentType
): Promise<GeminiIdea | null> => {
  try {
    const mediaLabel = contentType === "both" ? "movie or TV series" : contentType === "movie" ? "movie" : "TV series";
    const prompt = [
      "You are an expert film and TV critic.",
      `Suggest one real, well-known ${mediaLabel} for someone feeling: ${mood}.`,
      preferences ? `Their preferences: ${preferences}` : "",
      "Pick a real title that actually exists and is well-regarded.",
      "Return ONLY valid JSON with no markdown, no explanation, no extra text:",
      '{"media_type":"movie|tv","title":"string","overview":"string","reason":"string"}',
      "overview: plot summary in 2 sentences. reason: why it fits the mood in 1-2 sentences.",
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 300 },
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) return null;
    const json = await response.json();
    const text =
      json?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("\n") || "";

    const parsed = safeJsonFromText<GeminiIdea>(text);

    if (!parsed || !parsed.title || !parsed.overview || !parsed.reason) return null;

    return parsed;
  } catch {
    return null;
  }
};

const localIdeaFallback = (mood: string, contentType: ContentType) => {
  const media = contentType === "both" ? "movie" : contentType;

  return {
    media_type: media as "movie" | "tv",
    title: `${mood} Night Pick`,
    overview:
      "A character-driven story that balances emotion, momentum, and a memorable payoff tailored to your current mood.",
    reason:
      "Generated from mood profile when live recommendation services were unavailable.",
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mood = String(body?.mood || "Happy");
    const preferences = String(body?.preferences || "").slice(0, 300);
    const contentType = (body?.contentType || "both") as ContentType;

    const geminiKey = process.env.GEMINI_API_KEY;
    const candidates = await fetchTmdbCandidates(mood, contentType);
    let pick: Candidate | null = null;
    let reason = "";
    let source: "gemini" | "fallback" | "gemini-idea" = "fallback";

    if (geminiKey && candidates.length) {
      const geminiPick = await getGeminiPick(geminiKey, mood, preferences, candidates);

      if (geminiPick) {
        pick =
          candidates.find(
            (c) => c.id === geminiPick.id && c.media_type === geminiPick.media_type
          ) || null;
        if (pick) {
          reason = geminiPick.reason;
          source = "gemini";
        }
      }
    }

    if (!pick && candidates.length) {
      const fallback = fallbackPick(candidates, mood);

      pick = fallback.pick;
      reason = fallback.reason;
      source = "fallback";
    }

    if (!pick && geminiKey) {
      const idea = await getGeminiIdea(geminiKey, mood, preferences, contentType);

      if (idea) {
        return NextResponse.json({
          recommendation: {
            id: 0,
            media_type: idea.media_type,
            title: idea.title,
            overview: idea.overview,
            aiReason: idea.reason,
            aiSource: "gemini-idea",
            isIdeaOnly: true,
          },
          alternates: [],
        });
      }
    }

    if (!pick) {
      const idea = localIdeaFallback(mood, contentType);

      return NextResponse.json({
        recommendation: {
          id: 0,
          media_type: idea.media_type,
          title: idea.title,
          overview: idea.overview,
          aiReason: idea.reason,
          aiSource: "fallback",
          isIdeaOnly: true,
        },
        alternates: [],
      });
    }

    const alternates = candidates
      .filter((c) => !(c.id === pick!.id && c.media_type === pick!.media_type))
      .slice(0, 4)
      .map((c) => ({
        id: c.id,
        media_type: c.media_type,
        title: c.title || c.name,
      }));

    return NextResponse.json({
      recommendation: {
        ...pick,
        aiReason: reason,
        aiSource: source,
      },
      alternates,
    });
  } catch (error) {
    console.error("[mood-recommendation-error]", error);

    return NextResponse.json(
      { error: "Failed to generate recommendation. Try again." },
      { status: 500 }
    );
  }
}
