import React from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useMultiSearch } from "@/hooks/useMultiSearch";

const SearchInput = () => {
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 500); // Debounce with a 500ms delay
  const { data, error, isLoading } = useMultiSearch(debouncedValue);

  const handleSearch = () => {
    if (debouncedValue.trim() === "") {
      alert("Search box is empty! Please enter a search term.");
      return;
    }

    // Filter only TV and series results
    const filteredData = data?.filter(
      (item: { media_type: string }) => item.media_type === "tv"
    );

    if (filteredData.length === 0) {
      alert("No TV shows or series found with the current search term.");
      return;
    }

    console.log(filteredData);
    // Add more logic if needed (e.g., redirect to search results page)
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-transparent flex px-1 py-[2px] rounded-full border border-blue-500 overflow-hidden font-[sans-serif]">
      <input
        type="text"
        placeholder="Search Next Big Hit..."
        className="w-full outline-none bg-gray-dark pl-4 text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger search on Enter key press
      />
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
