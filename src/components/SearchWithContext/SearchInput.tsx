import React, { useContext } from "react";
import { store } from "../../hooks/useSearchContext";

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
  const { onSearch, search } = useContext(store);

  return <SearchInput onSearch={onSearch} value={search} />;
}
