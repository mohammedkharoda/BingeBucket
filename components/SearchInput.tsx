import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useDebounce } from "@/hooks/useDebounce";

const SearchInput: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const debouncedValue = useDebounce(value, 500);
  const router = useRouter();

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim() === "") {
      toast.error("Search box is empty! Please enter a search term.");

      return;
    }

    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(value); // Use the current value directly here
    }
  };

  const handleClickSearch = () => {
    handleSearch(debouncedValue); // Use the debounced value when clicking the button
  };

  return (
    <div className="bg-transparent flex px-1 py-[2px] rounded-full border border-blue-500 overflow-hidden font-[sans-serif]">
      <input
        className="w-full outline-none bg-gray-dark pl-4 text-sm"
        placeholder="Search Next Big Hit..."
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
        type="button"
        onClick={handleClickSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
