import React from "react";
import constate from "constate";

type Props<T> = {
  items: T[];
  itemKey: keyof T;
};
type ReturnType<T> = {
  filteredItems: T[];
  onSearch: (value: string) => void;
  search: string;
};
export default function useSearch<T extends Record<string, unknown>>({
  items,
  itemKey,
}: Props<T>): ReturnType<T> {
  const [search, setSearch] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(items);
  React.useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const resetSearch = (): void => {
    setFilteredItems(items);
    setSearch("");
  };

  const doSearch = (value: string): T[] => {
    return items.reduce<T[]>((acc, filteredItem) => {
      const filteredItemValue = filteredItem[itemKey];
      if (
        typeof filteredItemValue === "string" &&
        filteredItemValue.toLocaleLowerCase().includes(value.toLowerCase())
      ) {
        return [...acc, filteredItem];
      } else {
        return acc;
      }
    }, []);
  };

  const onSearch = (value: string): void => {
    if (value === "") return resetSearch();
    setFilteredItems(doSearch(value));
    setSearch(value);
  };

  return { search, filteredItems, onSearch };
}

function createContexts<T extends Record<string, unknown>>() {
  return constate<Props<T>, ReturnType<T>, []>(useSearch);
}
const SearchContext = createContexts();
export { SearchContext };
