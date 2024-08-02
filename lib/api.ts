import {
  Movie,
  NowPlaying,
  PopularMovie,
  TopRating,
  TrendingMovie,
} from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const currentDate = new Date();

  // Function to format date as 'YYYY-MM-DD'
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const endDate = new Date(currentDate);
  endDate.setMonth(currentDate.getMonth() + 2);

  // Format the dates
  const formattedStartDate = formatDate(currentDate);
  const formattedEndDate = formatDate(endDate);

  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?include_adult=true&include_video=false&language=en-IN&page=1&primary_release_date.gte=${formattedStartDate}&primary_release_date.lte=${formattedEndDate}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch upcoming movies");
    }

    const data = await response.json();

    // Check if the API response contains a 'results' array
    if (!data.results) {
      console.error("No results found in the response.");
      return [];
    }

    // Sort movies by release date (earliest to latest)
    const sortedMovies = data.results.sort((a: any, b: any) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateA.getTime() - dateB.getTime(); // Sorting in ascending order
    });

    // Add a sequential number to each movie
    const numberedMovies = sortedMovies.map((movie: any, index: number) => ({
      ...movie,
      number: index + 1,
    }));

    return numberedMovies;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

export const fetchPopularMovie = async (): Promise<PopularMovie[]> => {
  const currentDate = new Date();

  // Function to format date as 'YYYY-MM-DD'
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const endDate = new Date(currentDate);
  endDate.setMonth(currentDate.getMonth() + 2);

  // Format the dates
  const formattedStartDate = formatDate(currentDate);
  const formattedEndDate = formatDate(endDate);
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=1&primary_release_date.gte=${formattedStartDate}&primary_release_date.lte=${formattedEndDate}`,
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
  if (!data.results) {
    console.error("No results found in the response.");
    return [];
  }

  // Sort movies by release date (earliest to latest)
  const sortedMovies = data.results.sort((a: any, b: any) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB.getTime() - dateA.getTime(); // Sorting in descending order
  });

  // Add a sequential number to each movie
  const numberedMovies = sortedMovies.map((movie: any, index: number) => ({
    ...movie,
    number: index + 1,
  }));

  return numberedMovies;
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

export const fetchTopRatedMovies = async (): Promise<TopRating[]> => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?language=en-US&page=1`,
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

export const fetchNowPlayingMovies = async (): Promise<NowPlaying[]> => {
  const currentDate = new Date();

  // Function to format date as 'YYYY-MM-DD'
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const endDate = new Date(currentDate);
  endDate.setMonth(currentDate.getMonth() + 2);

  // Format the dates
  const formattedStartDate = formatDate(currentDate);
  const formattedEndDate = formatDate(endDate);
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?language=en-US&page=1&primary_release_date.gte=${formattedStartDate}&primary_release_date.lte=${formattedEndDate}`,
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
  if (!data.results) {
    console.error("No results found in the response.");
    return [];
  }

  // Sort movies by release date (earliest to latest)
  const sortedMovies = data.results.sort((a: any, b: any) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB.getTime() - dateA.getTime(); // Sorting in descending order
  });

  // Add a sequential number to each movie
  const numberedMovies = sortedMovies.map((movie: any, index: number) => ({
    ...movie,
    number: index + 1,
  }));

  return numberedMovies;
};
