import React from 'react';

type ReturnType<T> = { filteredItems: T[]; onSearch: (value: string) => void };
export default function useSearch<T extends {}>(items: T[], key: keyof T): ReturnType<T> {
  const [filteredItems, setFilteredItems] = React.useState(items);
  const initialItems = React.useRef(items);
  React.useEffect(() => {
    setFilteredItems(items);
    initialItems.current = items;
  }, [items]);

  const resetSearch = (): void => setFilteredItems(initialItems.current);

  const doSearch = (value: string): T[] =>
    initialItems.current.reduce<T[]>((acc, filteredItem) => {
      const filteredItemValue = filteredItem[key];
      if (
        typeof filteredItemValue === 'string' &&
        filteredItemValue.toLocaleLowerCase().includes(value.toLowerCase())
      ) {
        return [...acc, filteredItem];
      } else {
        return acc;
      }
    }, []);

  const onSearch = (value: string): void => {
    if (value === '') return resetSearch();
    setFilteredItems(doSearch(value));
  };

  return { filteredItems, onSearch };
}
