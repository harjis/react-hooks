import React from "react";

import { searchWithPostsContextCreator } from "../hooks/hookCreator";
import { SearchInput } from "../../../components/Search";

export function SearchInputWithSearch() {
  const { useSearchContext } = searchWithPostsContextCreator;
  const { onSearch, search } = useSearchContext();

  return <SearchInput onSearch={onSearch} value={search} />;
}
