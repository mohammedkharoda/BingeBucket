"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RiSearchLine } from "react-icons/ri";

import { useDebounce } from "@/hooks/useDebounce";

const SearchInput: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const debouncedValue = useDebounce(value, 500);
  const router = useRouter();

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch(value);
  };

  const handleClickSearch = () => {
    handleSearch(debouncedValue);
  };

  return (
    <div className="relative flex items-center w-full">
      <RiSearchLine
        size={14}
        className="absolute left-3 text-subtle pointer-events-none"
      />
      <input
        className="w-full pl-9 pr-16 py-2 bg-surface-2 border border-white/10 rounded-lg text-sm text-white placeholder:text-subtle focus:outline-none focus:border-gold/30 focus:bg-surface-3 transition-all duration-200"
        placeholder="Search movies & series..."
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="absolute right-1.5 px-2.5 py-1 bg-gold hover:bg-gold-dim text-black text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer"
        type="button"
        onClick={handleClickSearch}
      >
        Go
      </button>
    </div>
  );
};

export default SearchInput;
