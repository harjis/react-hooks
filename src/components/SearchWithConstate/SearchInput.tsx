import React from "react";
import { SearchContext } from "../../hooks/useSearch";

type Props = {
  onSearch: (search: string) => void;
  value: string;
};
export const SearchInput: React.FC<Props> = (props) => (
  <input
    type="text"
    onChange={(event) => {
      const value = event.currentTarget.value;
      props.onSearch(value);
    }}
    value={props.value}
  />
);

export function SearchInputWithSearch() {
  const [, useSearchContext] = SearchContext;
  const { onSearch, search } = useSearchContext();

  return <SearchInput onSearch={onSearch} value={search} />;
}
