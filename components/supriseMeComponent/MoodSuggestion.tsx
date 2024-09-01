"use client";
import { Button, Card, CardHeader, Image, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

import Loading from "@/shared/Loading";
import { useMoodSuggestion } from "@/hooks/useMoodSuggestion";

const moods = [
  { name: "Happy", emoji: "😊" },
  { name: "Sad", emoji: "😢" },
  { name: "Excited", emoji: "🤩" },
  { name: "Relaxed", emoji: "😌" },
  { name: "Adventurous", emoji: "🧗" },
];

const MoodSuggestion = () => {
  const [selectedMood, setSelectedMood] = useState<string>("Happy");
  const {
    data: suggestion,
    error,
    isLoading,
    refetch,
  } = useMoodSuggestion(selectedMood);

  const router = useRouter(); // Initialize useRouter for navigation

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    refetch(); // Refetch the data whenever a mood is selected
  };
  const handleWatchNow = () => {
    if (suggestion) {
      // Determine whether the suggestion is a movie or series by checking if `title` or `name` is present
      const isMovie = suggestion.hasOwnProperty("title");
      const route = isMovie
        ? `/movies/${suggestion.id}`
        : `/series/${suggestion.id}`;

      router.push(route); // Redirect to the appropriate page
    }
  };

  return (
    <div className="p-6 flex flex-col gap-3">
      <h2 className="text-center text-[45px] font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-wiggle">
        &#128578; How Are You Feeling Today ?
      </h2>
      <Spacer y={1} />
      <div className="flex gap-4 items-center justify-center md:flex-row flex-col">
        {moods.map((mood) => (
          <div key={mood.name}>
            <Button
              size="lg"
              style={{
                backgroundColor:
                  selectedMood === mood.name ? "#FFC107" : "#333",
                color: selectedMood === mood.name ? "#000" : "#fff",
              }}
              onPress={() => handleMoodSelect(mood.name)}
            >
              {mood.emoji} {mood.name}
            </Button>
          </div>
        ))}
      </div>

      <Spacer y={2} />

      {isLoading && <Loading />}
      {error && error.message}

      {suggestion && (
        <Card className="max-w-4xl mx-auto flex flex-col md:flex-row items-center bg-brown-dark p-5">
          <Image
            alt={suggestion.title || suggestion.name}
            className="w-fit h-auto"
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`}
            style={{ borderRadius: "10px" }}
          />
          <div className="flex flex-col gap-10 items-center justify-between w-full pl-5 text-center">
            <CardHeader className="flex items-center justify-center">
              <h3 className="font-bold text-white text-[28px] text-center">
                {suggestion.title || suggestion.name}
              </h3>
            </CardHeader>
            <p className="text-white">{suggestion.overview}</p>
            <div className="flex gap-4">
              <Button
                className="text-white"
                color="danger"
                variant="solid"
                onPress={handleWatchNow} // Redirect to the movie/series page
              >
                Know More
              </Button>
              <Button
                className="text-white"
                color="warning"
                variant="bordered"
                onPress={() => refetch()}
              >
                Show Another
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MoodSuggestion;
