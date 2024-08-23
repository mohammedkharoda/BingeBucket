import {
  Movie,
  MovieDetails,
  NowPlaying,
  PopularMovie,
  SeriesDetails,
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
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?language=en-US`,
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

  // Filter out movies without a valid vote_average
  const filteredMovies = data.results.filter(
    (movie: any) =>
      typeof movie.vote_average === "number" && !isNaN(movie.vote_average)
  );

  // Sort the filtered movies by vote_average in descending order
  const sortedMovies = filteredMovies
    .sort(
      (a: { vote_average: number }, b: { vote_average: number }) =>
        b.vote_average - a.vote_average
    )
    .slice(0, 3); // Take only the top 6 movies

  return sortedMovies;
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

export const fetchMoviesTrailer = async (id: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?language=en-US&page=1`,
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
// ============================== details apis ==============================

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
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
  return data;
};

export const fetchMovieCast = async (id: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?language=en-US`,
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
  return data;
};

export const fetchMovieImages = async (id: number) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/images`, {
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
  return data;
};

// ============================== recommanded apis ==============================
export const fetchRecommandedMovies = async (id: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?language=en-US&page=1`,
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

// ============================== series apis ==============================
export const fetchSeriesShowcase = async () => {
  const response = await fetch(`${BASE_URL}/trending/tv/week?language=en-IN`, {
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

export const fetchTrendingSeriesOfDay = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?language=en-US&with_original_language=en&sort_by=popularity.desc&page=1&air_date.gte=2024-01-01`,
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

  // Filter out series without a valid vote_average
  const filteredSeries = data.results.filter(
    (series: any) =>
      typeof series.vote_average === "number" && !isNaN(series.vote_average)
  );

  // Sort the filtered series by vote_average in descending order
  const sortedSeries = filteredSeries
    .sort(
      (a: { vote_average: number }, b: { vote_average: number }) =>
        b.vote_average - a.vote_average
    )
    .slice(0, 3); // Take only the top 3 series

  return sortedSeries;
};

export const fetchTopRatedSeries = async () => {
  const response = await fetch(
    `${BASE_URL}/tv/top_rated?language=en-US&page=1`,
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

export const fetchUpcomingSeries = async () => {
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
    `${BASE_URL}/discover/tv?language=en-US&sort_by=popularity.desc&with_original_language=en|hi&first_air_date.gte=${formattedStartDate}&first_air_date.lte=${formattedEndDate}`,
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

  // Sort series by release date (earliest to latest)
  const sortedSeries = data.results.sort((a: any, b: any) => {
    const dateA = new Date(a.first_air_date);
    const dateB = new Date(b.first_air_date);
    return dateB.getTime() - dateA.getTime(); // Sorting in descending order
  });

  // Add a sequential number to each series
  const numberedSeries = sortedSeries.map((series: any, index: number) => ({
    ...series,
    number: index + 1,
  }));

  return numberedSeries;
};

export const fetchOnAirTodaySeries = async () => {
  const response = await fetch(
    `${BASE_URL}/tv/on_the_air?language=en-US&with_original_language=en|hi`,
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

  // Add a sequential number to each series
  const numberedSeries = data.results.map((series: any, index: number) => ({
    ...series,
    number: index + 1,
  }));

  return numberedSeries;
};

// ============================== series details apis ==============================
export const fetchSeriesDetails = async (
  id: number
): Promise<SeriesDetails> => {
  const response = await fetch(`${BASE_URL}/tv/${id}?language=en-US`, {
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
  return data;
};

export const fetchSeriesCast = async (id: number) => {
  const response = await fetch(`${BASE_URL}/tv/${id}/credits?language=en-US`, {
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
  return data;
};

export const fetchSeriesVideos = async (id: number) => {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/videos?language=en-US&page=1`,
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

// ============================== season details apis ==============================
export const fetchSeasonDetails = async (
  id: number,
  seasonNumber: number
): Promise<any> => {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/season/${seasonNumber}?language=en-US`,
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
  return data; // Ensure this matches SeasonDetails structure
};

// ============================== surprise-me apis ==============================
export const fetchMoodSuggestion = async (mood: string): Promise<any> => {
  const moodGenreMap: { [key: string]: number } = {
    Happy: 35, // Comedy
    Sad: 18, // Drama
    Excited: 28, // Action
    Relaxed: 10749, // Romance
    Adventurous: 12, // Adventure
  };

  const genreId = moodGenreMap[mood];

  if (!genreId) {
    throw new Error("Invalid mood");
  }

  const movieResponse = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  const tvResponse = await fetch(
    `${BASE_URL}/discover/tv?with_genres=${genreId}&sort_by=popularity.desc`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!movieResponse.ok || !tvResponse.ok) {
    throw new Error("Failed to fetch the data");
  }

  const movieData = await movieResponse.json();
  const tvData = await tvResponse.json();

  const combinedResults = [...movieData.results, ...tvData.results];

  if (combinedResults.length === 0) {
    throw new Error("No results found");
  }

  const randomSuggestion =
    combinedResults[Math.floor(Math.random() * combinedResults.length)];

  return randomSuggestion;
};
