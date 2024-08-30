import React from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

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
        type="text"
        placeholder="Search Next Big Hit..."
        className="w-full outline-none bg-gray-dark pl-4 text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
        onClick={handleClickSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
