"use client";
import { useMoodSuggestion } from "@/hooks/useMoodSuggestion";
import Loading from "@/shared/Loading";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

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
              onPress={() => handleMoodSelect(mood.name)}
              style={{
                backgroundColor:
                  selectedMood === mood.name ? "#FFC107" : "#333",
                color: selectedMood === mood.name ? "#000" : "#fff",
              }}
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
            src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`}
            alt={suggestion.title || suggestion.name}
            style={{ borderRadius: "10px" }}
            className="w-fit h-auto"
            loading="lazy"
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
                color="danger"
                className="text-white"
                variant="solid"
                onPress={handleWatchNow} // Redirect to the movie/series page
              >
                Know More
              </Button>
              <Button
                className="text-white"
                variant="bordered"
                color="warning"
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
