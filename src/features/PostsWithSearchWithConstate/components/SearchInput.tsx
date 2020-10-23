import React from "react";

import { SearchInput } from "../../../components/Search";
import { SearchContext } from "../hooks/hookCreator";

export function SearchInputWithSearch() {
  const [, useSearchContext] = SearchContext;
  const { onSearch, search } = useSearchContext();

  return <SearchInput onSearch={onSearch} value={search} />;
}
