import { Movie, PopularMovie, TrendingMovie } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.results;
};

export const fetchPopularMovie = async (): Promise<PopularMovie[]> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.results;
};

export const fetchTrendingOfDay = async (): Promise<TrendingMovie[]> => {
  const response = await fetch(`${BASE_URL}/trending/all/day?language=en-US`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.results;
};
