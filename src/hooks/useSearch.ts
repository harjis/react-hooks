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
  const [search, setSearch] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(items);

  const doSearch = React.useCallback(
    (value: string): T[] => {
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
    },
    [items, itemKey]
  );

  React.useEffect(() => {
    setFilteredItems(doSearch(search));
  }, [items, search, doSearch]);

  const resetSearch = (): void => {
    // setFilteredItems(items);
    setSearch("");
  };

  const onSearch = (value: string): void => {
    if (value === "") return resetSearch();
    // We are not setting filteredItems here on purpose. Setting only search string ends up in the effect
    // few lines above.
    // If hook receives new items we want to maintain the search and do it for the new items. This is
    // why we have the effect and why it's not necessary the filter items in this function or in resetSearch
    // setFilteredItems(doSearch(value));
    setSearch(value);
  };

  return { search, filteredItems, onSearch };
}
