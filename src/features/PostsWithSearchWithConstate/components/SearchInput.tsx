import React from "react";

import { SearchInput } from "../../../components/Search";
import { searchWithPostsConstateCreator } from "../hooks/hookCreator";

export function SearchInputWithSearch() {
  const { useSearchContext } = searchWithPostsConstateCreator;
  const { onSearch, search } = useSearchContext();

  return <SearchInput onSearch={onSearch} value={search} />;
}
