import React, { Suspense } from "react";

import SearchResults from "@/components/SearchResults";

const Search = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default Search;
