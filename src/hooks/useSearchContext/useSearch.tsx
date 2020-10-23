import React from "react";

export type Props<T> = {
  items: T[];
  itemKey: keyof T;
};
export type ReturnType<T> = {
  filteredItems: T[];
  onSearch: (value: string) => void;
  search: string;
};
export const initialState = {
  filteredItems: [],
  onSearch: () => {
    throw new Error("Implement onSearch");
  },
  search: "",
};
export default function useSearch<T>({
  items,
  itemKey,
}: Props<T>): ReturnType<T> {
  const [search, setSearch] = React.useState(initialState.search);
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
