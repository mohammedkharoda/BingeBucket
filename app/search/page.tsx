import React, { Suspense } from "react";

import SearchResults from "@/components/SearchResults";

const Search = () => {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
};

export default Search;
