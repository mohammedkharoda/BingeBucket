"use client";
import React, { useState } from "react";
import { useMoodSuggestion } from "@/hooks/useMoodSuggestion";

const moods = [
  { name: "Happy", emoji: "😊" },
  { name: "Sad", emoji: "😢" },
  { name: "Excited", emoji: "🤩" },
  { name: "Relaxed", emoji: "😌" },
  { name: "Adventurous", emoji: "🧗" },
];

const MoodSuggestion = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const {
    data: suggestion,
    error,
    isLoading,
    refetch,
  } = useMoodSuggestion(selectedMood);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    refetch(); // Refetch the data whenever a mood is selected
  };

  console.log(suggestion);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>What's Your Mood Today?</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => handleMoodSelect(mood.name)}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: selectedMood === mood.name ? "#FFC107" : "#000",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {mood.emoji} {mood.name}
          </button>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {suggestion && (
        <div style={{ marginTop: "40px" }}>
          <h2>Here&apos;s Something for Your Mood</h2>
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`}
              alt={suggestion.title}
              style={{ width: "200px", borderRadius: "10px" }}
            />
            <h3>{suggestion.title}</h3>
            <p>{suggestion.overview}</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#FFC107",
                color: "#000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Watch Now
            </button>
            <button
              onClick={() => refetch()}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                backgroundColor: "#607D8B",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Show Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSuggestion;
